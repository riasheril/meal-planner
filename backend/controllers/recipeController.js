const recipeService = require('@services/recipeService');

exports.list = async (req, res) => {
  try {
    const recipes = await recipeService.listRecipes();
    res.json({ recipes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.filter = async (req, res) => {
  try {
    const recipes = await recipeService.filterRecipes(req.query);
    res.json({ recipes });
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