const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// Middleware to check for JWT tokens
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-km6ivy4lzonnfqa2.us.auth0.com/.well-known/jwks.json`
  }),
  audience: 'https:/mealplannerapi.com/api/login',
  issuer: `https://dev-km6ivy4lzonnfqa2.us.auth0.com/`,
  algorithms: ['RS256']
});

module.exports = { checkJwt }; 