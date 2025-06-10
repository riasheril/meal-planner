const { normalizeUnit } = require('./unit');

/**
 * Maps Spoonacular's detailed aisle categories to simplified MealMap categories
 * @param {string} spoonacularAisle - The aisle from Spoonacular API
 * @returns {string} - Normalized aisle category
 */
function normalizeAisle(spoonacularAisle) {
  if (!spoonacularAisle) return 'Miscellaneous';

  const aisleMap = {
    // Bakery
    'Bakery/Bread': 'Bakery',
    'Bread': 'Bakery',
    
    // Dairy
    'Milk, Eggs, Other Dairy': 'Dairy',
    'Cheese': 'Dairy',
    
    // Frozen
    'Frozen': 'Frozen',
    
    // Miscellaneous
    'Health Foods': 'Miscellaneous',
    'Refrigerated': 'Miscellaneous',
    'Ethnic Foods': 'Miscellaneous',
    'Gourmet': 'Miscellaneous',
    'Gluten Free': 'Miscellaneous',
    'Alcoholic Beverages': 'Miscellaneous',
    'Beverages': 'Miscellaneous',
    'Not in Grocery Store/Homemade': 'Miscellaneous',
    'Online': 'Miscellaneous',
    'Grilling Supplies': 'Miscellaneous',
    
    // Pantry
    'Baking': 'Pantry',
    'Spices and Seasonings': 'Pantry',
    'Pasta and Rice': 'Pantry',
    'Canned and Jarred': 'Pantry',
    'Nut butters, Jams, and Honey': 'Pantry',
    'Oil, Vinegar, Salad Dressing': 'Pantry',
    'Condiments': 'Pantry',
    'Savory Snacks': 'Pantry',
    'Tea and Coffee': 'Pantry',
    'Sweet Snacks': 'Pantry',
    'Cereal': 'Pantry',
    'Nuts': 'Pantry',
    'Dried Fruits': 'Pantry',
    
    // Produce
    'Produce': 'Produce',
    
    // Protein
    'Meat': 'Protein',
    'Seafood': 'Protein'
  };

  return aisleMap[spoonacularAisle] || 'Miscellaneous';
}

/**
 * Transforms Spoonacular recipe and ingredientWidget data to internal Recipe schema.
 * @param {Object} spoonacularRecipe - The recipe object from complex search (with instructions, metadata, etc.)
 * @param {Object} ingredientWidget - The ingredient widget object (with detailed US units)
 * @returns {Object} - Recipe object matching internal schema
 */
function transformSpoonacularRecipe(spoonacularRecipe, ingredientWidget) {
  const ingredients = (ingredientWidget.ingredients || []).map(ing => ({
    name: ing.name,
    quantity: ing.amount.us.value,
    unit: normalizeUnit(ing.amount.us.unit),
    aisle: normalizeAisle(ing.aisle)
  }));

  const steps = (spoonacularRecipe.analyzedInstructions && spoonacularRecipe.analyzedInstructions[0] && spoonacularRecipe.analyzedInstructions[0].steps) || [];
  const instructions = steps.map(s => ({
    step: s.number,
    text: s.step
  }));

  // Collect diet tags including boolean flags for easier filtering
  const dietTags = [];
  if (typeof spoonacularRecipe.vegetarian === 'boolean') {
    dietTags.push(spoonacularRecipe.vegetarian ? 'vegetarian' : 'non vegetarian');
  }
  if (spoonacularRecipe.vegan) dietTags.push('vegan');
  if (spoonacularRecipe.glutenFree) dietTags.push('gluten free');

  return {
    apiId: spoonacularRecipe.id,
    title: spoonacularRecipe.title,
    ingredients,
    instructions,
    tags: [
      ...dietTags,
      ...(spoonacularRecipe.diets || []),
      ...(spoonacularRecipe.dishTypes || []),
      ...(spoonacularRecipe.occasions || [])
    ].map(t => t.toLowerCase()), // store lowercase for consistent searching
    cuisine: ((spoonacularRecipe.cuisines && spoonacularRecipe.cuisines[0]) || '').toLowerCase(),
    cookingTime: spoonacularRecipe.readyInMinutes,
    servingSize: spoonacularRecipe.servings,
    nutrition: spoonacularRecipe.nutrition || {},
    image: spoonacularRecipe.image,
    sourceUrl: spoonacularRecipe.sourceUrl
  };
}

module.exports = { transformSpoonacularRecipe, normalizeAisle }; 