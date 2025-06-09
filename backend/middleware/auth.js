const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
require('dotenv').config();

// Pull Auth0 configuration from environment variables so that staging, production
// and local environments can be swapped without code changes.
const authConfig = {
  domain: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE,
};

// In testing or local environments we allow the server to continue running 
// even if Auth0 env vars are not supplied.  In that case we substitute a 
// no-op middleware so routes remain accessible.
const authDisabled = process.env.NODE_ENV === 'test' ? true : (!authConfig.domain || !authConfig.audience);

if (authDisabled) {
  console.warn('Auth0 configuration not found – JWT validation DISABLED');
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