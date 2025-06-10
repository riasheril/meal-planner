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
    let { cuisineTypes, dietaryRestrictions, cookTimeCategory, cookingTime, servingSize } = req.body;
    console.log('[DISCOVER] Incoming request:', req.body);
    // Normalize all to lowercase for case-insensitive matching
    cuisineTypes = (cuisineTypes || []).map(c => c.toLowerCase());
    dietaryRestrictions = (dietaryRestrictions || []).map(d => d.toLowerCase());
    // Treat placeholders like "no-restrictions" or "none" as meaning no restrictions
    if (dietaryRestrictions.length === 1 && ['no-restrictions', 'none', ''].includes(dietaryRestrictions[0])) {
      dietaryRestrictions = [];
    }
    console.log('[DISCOVER] Normalized cuisineTypes:', cuisineTypes);
    console.log('[DISCOVER] Normalized dietaryRestrictions:', dietaryRestrictions);
    // Allow both keys from older clients (apply fallback BEFORE we derive min/max)
    if (!cookTimeCategory && cookingTime) {
      cookTimeCategory = cookingTime;
    }
    // Map cookTimeCategory to min/max
    let minCook = null, maxCook = null;
    if (cookTimeCategory === 'Hangry') {
      maxCook = 20;
    } else if (cookTimeCategory === 'Hungry') {
      // Anything up to 40 minutes (no minimum) counts as Hungry
      maxCook = 40;
    } else if (cookTimeCategory === 'Patient') {
      minCook = 41;
    }
    const Recipe = require('../models/Recipe');
    // Fetch all recipes and filter in JS for case-insensitive match
    let allRecipes = await Recipe.find();
    console.log(`[DISCOVER] Total recipes in DB: ${allRecipes.length}`);
    let recipes = allRecipes.filter(r => {
      // Cuisine match (if any)
      if (cuisineTypes.length && !cuisineTypes.includes((r.cuisine || '').toLowerCase())) return false;
      // Dietary restrictions: allow substring matches (e.g., "lacto ovo vegetarian" should satisfy "vegetarian")
      if (
        dietaryRestrictions.length &&
        !dietaryRestrictions.every(dr => {
          const drLower = dr.toLowerCase();
          const tagsLower = (r.tags || []).map(t => t.toLowerCase());
          return tagsLower.some(tag => tag.includes(drLower));
        })
      )
        return false;
      // Cooking time
      if (minCook !== null && maxCook !== null && !(r.cookingTime >= minCook && r.cookingTime <= maxCook)) return false;
      if (minCook === null && maxCook !== null && !(r.cookingTime <= maxCook)) return false;
      if (minCook !== null && maxCook === null && !(r.cookingTime >= minCook)) return false;
      // Serving size no longer strictly filters; users can scale recipes.
      return true;
    });
    console.log(`[DISCOVER] Recipes after filtering: ${recipes.length}`);
    // If not enough, try to fetch more from Spoonacular
    if (recipes.length < 10) {
      try {
        console.log('[DISCOVER] Not enough recipes, calling Spoonacular...');
        await spoonacularService.searchRecipes({ cuisineTypes, dietaryRestrictions, cookTimeCategory, servingSize });
        allRecipes = await Recipe.find();
        console.log(`[DISCOVER] Total recipes in DB after Spoonacular: ${allRecipes.length}`);
        recipes = allRecipes.filter(r => {
          if (cuisineTypes.length && !cuisineTypes.includes((r.cuisine || '').toLowerCase())) return false;
          if (
            dietaryRestrictions.length &&
            !dietaryRestrictions.every(dr => {
              const drLower = dr.toLowerCase();
              const tagsLower = (r.tags || []).map(t => t.toLowerCase());
              return tagsLower.some(tag => tag.includes(drLower));
            })
          )
            return false;
          if (minCook !== null && maxCook !== null && !(r.cookingTime >= minCook && r.cookingTime <= maxCook)) return false;
          if (minCook === null && maxCook !== null && !(r.cookingTime <= maxCook)) return false;
          if (minCook !== null && maxCook === null && !(r.cookingTime >= minCook)) return false;
          // Skip serving size filtering; allow scaling.
          return true;
        });
        console.log(`[DISCOVER] Recipes after Spoonacular filtering: ${recipes.length}`);
      } catch (spoonacularError) {
        console.error('[DISCOVER] Spoonacular fetch failed:', spoonacularError);
      }
    }
    console.log(`[DISCOVER] Returning ${recipes.length} recipes`);
    // Wrap in an object so the client expects { recipes: [...] }
    res.json({ recipes: Array.isArray(recipes) ? recipes : [] });
  } catch (err) {
    console.error('[DISCOVER] Error:', err);
    res.status(500).json({ error: err.message });
  }
}; 