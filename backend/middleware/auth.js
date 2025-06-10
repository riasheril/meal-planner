const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
require('dotenv').config();

// Pull Auth0 configuration from environment variables
const authConfig = {
  domain: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE,
};

// Only disable auth in test environment
const authDisabled = process.env.NODE_ENV === 'test';

if (authDisabled) {
  console.warn('JWT validation DISABLED - Test environment detected');
} else if (!authConfig.domain || !authConfig.audience) {
  console.error('Auth0 configuration missing - JWT validation will fail');
  console.error('Required environment variables:');
  console.error('- AUTH0_DOMAIN:', authConfig.domain ? '✓' : '✗');
  console.error('- AUTH0_AUDIENCE:', authConfig.audience ? '✓' : '✗');
}

// Middleware to check for JWT tokens
const checkJwt = authDisabled
  ? (req, _res, next) => { 
      console.log('[AUTH] JWT DISABLED'); 
      next(); 
    }
  : jwt({
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
      }),
      audience: authConfig.audience,
      issuer: `https://${authConfig.domain}/`,
      algorithms: ['RS256'],
      requestProperty: 'authRaw',
      getToken: req => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        console.log('[AUTH] Incoming Authorization header:', authHeader);
        return token;
      }
    });

// ------------------------------------------------------------------------------------
// SECOND-STAGE MIDDLEWARE: Map Auth0 payload -> MongoDB User document
// This runs AFTER token validation.  It looks up (or creates) the corresponding
// user in MongoDB and replaces req.user with the full Mongoose document so that
// downstream code can safely use `req.user._id`, `req.user.email`, etc.
// ------------------------------------------------------------------------------------

const mongoose = require('mongoose');
let User; // lazy-require to avoid potential circular deps

const attachUserDoc = async (req, _res, next) => {
  // In test mode we skip because auth is disabled
  if (authDisabled) return next();

  // express-jwt placed payload on req.authRaw
  const payload = req.authRaw;
  if (!payload) return next();

  try {
    // Lazy load to prevent circular deps and handle first-time compilation gracefully
    if (!User) {
      try {
        User = mongoose.model('User');
      } catch (_e) {
        User = require('../models/User');
      }
    }

    const { sub: auth0Id, email } = payload;

    let user = null;
    if (email) {
      user = await User.findOne({ email });
    }

    // Fallback to auth0Id lookup
    if (!user && auth0Id) {
      user = await User.findOne({ auth0Id });
    }

    // Auto-provision (or atomically fetch-or-create) using upsert to avoid race-conditions
    if (!user) {
      const insertDoc = {
        auth0Id,
        email: email || `${auth0Id}@auth0.local`,
        preferences: {
          dietaryRestrictions: [],
          cuisineTypes: [],
          cookingTime: undefined,
          servingSize: undefined
        },
        chosenRecipes: [],
        savedRecipes: [],
        groceryLists: []
      };
      user = await User.findOneAndUpdate(
        { auth0Id },
        { $setOnInsert: insertDoc },
        { new: true, upsert: true }
      );
      console.log(`[AUTH] Provisioned new user: ${user.email || 'no-email'} (${user._id})`);
    }

    // Expose for downstream controllers
    req.user = user;
    next();
  } catch (err) {
    console.error('[AUTH] attachUserDoc error:', err);
    next(err);
  }
};

// Compose both middlewares so a single export can still be used in server.js
const checkJwtComposed = authDisabled
  ? (req, _res, next) => { console.log('[AUTH] JWT DISABLED'); next(); }
  : [checkJwt, attachUserDoc];

module.exports = { checkJwt: checkJwtComposed }; 