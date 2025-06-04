const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// List all recipes
router.get('/', recipeController.list);
// Filter recipes
router.get('/filter', recipeController.filter);
// Get recipe by ID
router.get('/:id', recipeController.getById);
// Create a new recipe
router.post('/', recipeController.create);
// Seed a random recipe
router.post('/seed-random', recipeController.seedRandom);
// Update a recipe
router.put('/:id', recipeController.update);
// Delete a recipe
router.delete('/:id', recipeController.delete);

module.exports = router; 