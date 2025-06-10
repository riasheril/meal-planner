const express = require('express');
const router = express.Router();
const mealPlanController = require('../controllers/mealPlanController');

// Create a new meal plan
router.post('/', mealPlanController.create);

// Get the user's current meal plan
router.get('/', mealPlanController.getCurrent);


module.exports = router; 