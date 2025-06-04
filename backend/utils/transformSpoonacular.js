const { normalizeUnit } = require('./unit');

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
    unit: normalizeUnit(ing.amount.us.unit)
  }));

  const steps = (spoonacularRecipe.analyzedInstructions && spoonacularRecipe.analyzedInstructions[0] && spoonacularRecipe.analyzedInstructions[0].steps) || [];
  const instructions = steps.map(s => ({
    step: s.number,
    text: s.step
  }));

  return {
    apiId: spoonacularRecipe.id,
    title: spoonacularRecipe.title,
    ingredients,
    instructions,
    tags: [
      ...(spoonacularRecipe.diets || []),
      ...(spoonacularRecipe.dishTypes || []),
      ...(spoonacularRecipe.occasions || [])
    ],
    cuisine: (spoonacularRecipe.cuisines && spoonacularRecipe.cuisines[0]) || '',
    cookingTime: spoonacularRecipe.readyInMinutes,
    servingSize: spoonacularRecipe.servings,
    nutrition: spoonacularRecipe.nutrition || {},
    image: spoonacularRecipe.image,
    sourceUrl: spoonacularRecipe.sourceUrl
  };
}

module.exports = { transformSpoonacularRecipe }; 