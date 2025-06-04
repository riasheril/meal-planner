const Recipe = require('@models/Recipe');

// List all recipes
async function listRecipes() {
  return Recipe.find();
}

// Filter recipes by query (e.g., tags, cuisine, etc.)
async function filterRecipes(query) {
  return Recipe.find(query);
}

// Get recipe by ID
async function getRecipeById(id) {
  return Recipe.findById(id);
}

// Create a new recipe
async function createRecipe(data) {
  const recipe = new Recipe(data);
  await recipe.save();
  return recipe;
}

// Update a recipe
async function updateRecipe(id, data) {
  return Recipe.findByIdAndUpdate(id, data, { new: true });
}

// Delete a recipe
async function deleteRecipe(id) {
  return Recipe.findByIdAndDelete(id);
}

// Get recipe by apiId
async function getRecipeByApiId(apiId) {
  return Recipe.findOne({ apiId });
}

module.exports = {
  listRecipes,
  filterRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipeByApiId,
}; 