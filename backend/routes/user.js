const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register
router.post('/register', userController.register);
// Login
router.post('/login', userController.login);
// Get user preferences
router.get('/preferences', userController.getPreferences);
// Update user preferences
router.put('/preferences', userController.updatePreferences);
// Get chosen recipes
router.get('/chosen-recipes', userController.getChosenRecipes);
// Add to chosen recipes
router.post('/chosen-recipes', userController.addChosenRecipe);
// Bulk update chosen recipes
router.put('/chosen-recipes', userController.setChosenRecipes);
// Get saved recipes
router.get('/saved-recipes', userController.getSavedRecipes);
// Add to saved recipes
router.post('/saved-recipes', userController.addSavedRecipe);

module.exports = router; 