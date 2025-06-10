const MealPlan = require('../models/MealPlan');
const User = require('../models/User');

exports.create = async (req, res) => {
  try {
    const { recipeIds } = req.body;
    // The user should be attached to the request by middleware
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'User not found or not authenticated' });
    }

    // Create a new meal plan
    const mealPlan = await MealPlan.create({
      user: user._id,
      recipes: recipeIds,
    });

    res.status(201).json({ message: 'Meal plan created', mealPlan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCurrent = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
          return res.status(401).json({ error: 'User not found or not authenticated' });
        }

        const mealPlan = await MealPlan.findOne({ user: user._id }).sort({ createdAt: -1 }).populate('recipes');
        if (!mealPlan) {
            return res.status(404).json({ error: 'Meal plan not found' });
        }

        res.json({ mealPlan });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}; 