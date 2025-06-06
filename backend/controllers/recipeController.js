const recipeService = require('../services/recipeService');
const spoonacularService = require('../services/spoonacularService');

exports.list = async (req, res) => {
  try {
    const recipes = await recipeService.listRecipes();
    res.json(Array.isArray(recipes) ? recipes : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.filter = async (req, res) => {
  try {
    const recipes = await recipeService.filterRecipes(req.query);
    res.json(Array.isArray(recipes) ? recipes : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json({ recipe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const recipe = await recipeService.createRecipe(req.body);
    res.status(201).json({ message: 'Recipe created', recipe });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const recipe = await recipeService.updateRecipe(req.params.id, req.body);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json({ message: 'Recipe updated', recipe });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const recipe = await recipeService.deleteRecipe(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.seedRandom = async (req, res) => {
  try {
    const recipe = await recipeService.seedRandomRecipe();
    res.status(201).json({ message: 'Random recipe seeded successfully', recipe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Discover recipes based on user preferences
exports.discover = async (req, res) => {
  try {
    const { cuisineTypes, dietaryRestrictions, cookingTime, servingSize } = req.body;
    const query = {};
    if (cuisineTypes && cuisineTypes.length) query.cuisine = { $in: cuisineTypes };
    if (dietaryRestrictions && dietaryRestrictions.length) query.tags = { $all: dietaryRestrictions };
    if (cookingTime) query.cookingTime = { $lte: cookingTime };
    if (servingSize) query.servingSize = servingSize;
    const Recipe = require('../models/Recipe');
    let recipes = await Recipe.find(query);
    if (recipes.length < 10) {
      try {
        await spoonacularService.searchRecipes({ cuisineTypes, dietaryRestrictions, cookingTime, servingSize });
        recipes = await Recipe.find(query);
      } catch (spoonacularError) {
        console.error('Spoonacular fetch failed:', spoonacularError);
      }
    }
    res.json(Array.isArray(recipes) ? recipes : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 