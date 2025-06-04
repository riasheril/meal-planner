const fs = require('fs');
const path = require('path');
const connectDB = require('../config/db');
const { createRecipe, getRecipeByApiId, updateRecipe } = require('../services/recipeService');
const { transformSpoonacularRecipe } = require('../utils/transformSpoonacular');

async function seedRecipesFromMock() {
  await connectDB();

  // 1. Read mock files (fixed paths)
  const complexData = JSON.parse(fs.readFileSync(
    path.join(__dirname, './spoontacular-api-examples/complex-search.json'),
    'utf8'
  ));
  const focusedData = JSON.parse(fs.readFileSync(
    path.join(__dirname, './spoontacular-api-examples/focussed-search.json'),
    'utf8'
  ));

  // 2. Insert high-level recipe (simulate search result, no full ingredients)
  for (const recipe of complexData.results) {
    const exists = await getRecipeByApiId(recipe.id);
    if (!exists) {
      await createRecipe({
        apiId: recipe.id,
        title: recipe.title,
        ingredients: [], // No full details yet
        instructions: (recipe.analyzedInstructions?.[0]?.steps || []).map(s => ({
          step: s.number,
          text: s.step
        })),
        tags: [
          ...(recipe.diets || []),
          ...(recipe.dishTypes || []),
          ...(recipe.occasions || [])
        ],
        cuisine: (recipe.cuisines && recipe.cuisines[0]) || '',
        cookingTime: recipe.readyInMinutes,
        servingSize: recipe.servings,
        nutrition: recipe.nutrition || {},
        image: recipe.image,
        sourceUrl: recipe.sourceUrl
      });
      console.log(`Inserted high-level recipe: ${recipe.title}`);
    } else {
      console.log(`Recipe already exists (high-level): ${recipe.title}`);
    }
  }

  // 3. Insert/update full recipe (simulate user action to get full details)
  // For this example, just use the first recipe and the focused data
  const recipe = complexData.results[0];
  const ingredientWidget = focusedData;
  const transformed = transformSpoonacularRecipe(recipe, ingredientWidget);
  const exists = await getRecipeByApiId(transformed.apiId);
  if (!exists) {
    await createRecipe(transformed);
    console.log(`Inserted full recipe: ${transformed.title}`);
  } else {
    await updateRecipe(exists._id, transformed);
    console.log(`Updated recipe with full details: ${transformed.title}`);
  }

  // 4. Close DB connection if needed (optional, depends on your setup)
  process.exit(0);
}

// Run the script
seedRecipesFromMock();

/*
How this maps to the real app:
- In production, you would NOT read from JSON files, but fetch from the Spoonacular API.
- Step 2 simulates showing search results (recipes with minimal info) to the user.
- Step 3 simulates the user selecting a recipe, triggering a fetch for full details, which are then stored/updated in the DB.
- The transformation utility is used in both dev and production to ensure consistent data shape.
*/ 