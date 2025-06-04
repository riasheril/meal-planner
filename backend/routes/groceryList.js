const express = require('express');
const router = express.Router();
const groceryListController = require('../controllers/groceryListController');

// Generate grocery list
router.post('/generate', groceryListController.generate);
// Get grocery list by user
router.get('/', groceryListController.getByUser);
// Update grocery list (e.g., check off items)
router.put('/:id', groceryListController.update);
// Create a new grocery list (besides generate)
router.post('/', groceryListController.create);
// Get grocery list by ID
router.get('/:id', groceryListController.getById);
// List all grocery lists
router.get('/all', groceryListController.listAll);
// Delete a grocery list
router.delete('/:id', groceryListController.delete);

module.exports = router; 