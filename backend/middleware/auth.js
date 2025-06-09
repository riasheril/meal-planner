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
  ? (req, _res, next) => next()
  : jwt({
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
      }),
      audience: authConfig.audience,
      issuer: `https://${authConfig.domain}/`,
      algorithms: ['RS256']
    });

module.exports = { checkJwt }; 