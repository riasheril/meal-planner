const Recipe = require('../models/Recipe');
const spoonacularService = require('./spoonacularService');

// List all recipes
async function listRecipes() {
  try {
    console.log('Attempting to list all recipes...');
    const recipes = await Recipe.find();
    console.log(`Found ${recipes.length} recipes in the database`);
    return recipes;
  } catch (error) {
    console.error('Error listing recipes:', error);
    throw error;
  }
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

// Seed a random recipe
async function seedRandomRecipe() {
  try {
    console.log('Starting to seed random recipe...');
    const recipe = await spoonacularService.seedRandomRecipe();
    console.log('Recipe received from spoonacularService:', recipe.title);
    
    // Verify the recipe was saved
    const savedRecipe = await Recipe.findOne({ apiId: recipe.apiId });
    if (savedRecipe) {
      console.log('Verified recipe was saved to database:', savedRecipe.title);
    } else {
      console.log('Warning: Recipe was not found in database after saving');
    }
    
    return recipe;
  } catch (error) {
    console.error('Error seeding random recipe:', error);
    throw new Error(`Error seeding random recipe: ${error.message}`);
  }
}

module.exports = {
  listRecipes,
  filterRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipeByApiId,
  seedRandomRecipe
}; 