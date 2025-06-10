const Recipe = require('../models/Recipe');
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
    const { cuisineTypes = [], dietaryRestrictions = [], cookTimeCategory, minServings } = req.body;
    console.log('[DISCOVER] Incoming request:', req.body);

    // Normalize inputs
    const normalizedCuisineTypes = cuisineTypes.map(c => c.toLowerCase());
    const normalizedDietaryRestrictions = dietaryRestrictions.map(d => d.toLowerCase());
    console.log('[DISCOVER] Normalized cuisineTypes:', normalizedCuisineTypes);
    console.log('[DISCOVER] Normalized dietaryRestrictions:', normalizedDietaryRestrictions);

    // Get all recipes from DB
    let allRecipes = await Recipe.find();
    console.log(`[DISCOVER] Total recipes in DB: ${allRecipes.length}`);

    // Cook time mapping
    let maxCook = null;
    if (cookTimeCategory === 'Hangry') {
      maxCook = 20;
    } else if (cookTimeCategory === 'Hungry') {
      maxCook = 40;
    }
    // Patient has no max cook time
    console.log('[DISCOVER] Cook time parameters:', { maxCook });

    let recipes = allRecipes.filter(r => {
      // Log each recipe's filtering process
      console.log(`[DISCOVER] Filtering recipe: ${r.title}`);
      console.log(`[DISCOVER] Recipe details:`, {
        cuisine: r.cuisine,
        tags: r.tags,
        cookingTime: r.cookingTime,
        servingSize: r.servingSize
      });

      // Cuisine match (if any)
      if (normalizedCuisineTypes.length) {
        const cuisineMatch = normalizedCuisineTypes.includes((r.cuisine || '').toLowerCase());
        console.log(`[DISCOVER] Cuisine match: ${cuisineMatch}`);
        if (!cuisineMatch) return false;
      }

      // Dietary restrictions (all must be present in tags, case-insensitive)
      if (normalizedDietaryRestrictions.length) {
        const recipeTags = (r.tags || []).map(t => t.toLowerCase());
        const allRestrictionsMatch = normalizedDietaryRestrictions.every(dr => recipeTags.includes(dr));
        console.log(`[DISCOVER] Dietary restrictions match: ${allRestrictionsMatch}`);
        if (!allRestrictionsMatch) return false;
      }

      // Cooking time (max only)
      if (maxCook !== null) {
        const timeMatch = r.cookingTime <= maxCook;
        console.log(`[DISCOVER] Cook time match (max only): ${timeMatch}`);
        if (!timeMatch) return false;
      }

      // Serving size
      if (minServings) {
        // Allow recipes that can be scaled to the requested serving size
        // Consider recipes with serving sizes up to 4x the requested size
        const maxAllowedServings = minServings * 4;
        const servingMatch = r.servingSize >= minServings && r.servingSize <= maxAllowedServings;
        console.log(`[DISCOVER] Serving size match: ${servingMatch} (recipe: ${r.servingSize}, requested: ${minServings}, max allowed: ${maxAllowedServings})`);
        if (!servingMatch) return false;
      }

      console.log(`[DISCOVER] Recipe passed all filters: ${r.title}`);
      return true;
    });

    console.log(`[DISCOVER] Recipes after filtering: ${recipes.length}`);

    // If not enough, try to fetch more from Spoonacular
    if (recipes.length < 10) {
      try {
        console.log('[DISCOVER] Not enough recipes, calling Spoonacular...');
        await spoonacularService.searchRecipes({ cuisineTypes, dietaryRestrictions, cookTimeCategory, minServings });
        allRecipes = await Recipe.find();
        console.log(`[DISCOVER] Total recipes in DB after Spoonacular: ${allRecipes.length}`);
        
        // Apply the same filtering to the updated recipe set
        recipes = allRecipes.filter(r => {
          // Cuisine match (if any)
          if (normalizedCuisineTypes.length && !normalizedCuisineTypes.includes((r.cuisine || '').toLowerCase())) return false;
          // Dietary restrictions (all must be present in tags, case-insensitive)
          if (normalizedDietaryRestrictions.length && !normalizedDietaryRestrictions.every(dr => (r.tags || []).map(t => t.toLowerCase()).includes(dr))) return false;
          // Cooking time (max only)
          if (maxCook !== null && r.cookingTime > maxCook) return false;
          // Serving size
          if (minServings) {
            const maxAllowedServings = minServings * 4;
            if (!(r.servingSize >= minServings && r.servingSize <= maxAllowedServings)) return false;
          }
          return true;
        });
        console.log(`[DISCOVER] Recipes after Spoonacular filtering: ${recipes.length}`);
      } catch (spoonacularError) {
        console.error('[DISCOVER] Spoonacular fetch failed:', spoonacularError);
      }
    }
    console.log(`[DISCOVER] Returning ${recipes.length} recipes`);
    res.json(Array.isArray(recipes) ? recipes : []);
  } catch (err) {
    console.error('[DISCOVER] Error:', err);
    res.status(500).json({ error: err.message });
  }
}; 