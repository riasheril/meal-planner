const express = require('express');
const { auth } = require('express-openid-connect');

// Export a fully-formed router instead of mutating a global `app` instance.
// This prevents `ReferenceError: app is not defined` when the file is `require()`-d.

const router = express.Router();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET || 'dev-secret',
  baseURL: process.env.BASE_URL || 'http://localhost:8080',
  clientID: process.env.AUTH0_CLIENT_ID || 'local-client',
  issuerBaseURL: process.env.AUTH0_ISSUER || 'https://example.com'
};

// Attach Auth0 helper routes (/login, /logout, /callback)
router.use(auth(config));

// Simple liveness/auth state check
router.get('/', (req, res) => {
  res.send(req.oidc && req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

module.exports = router;
