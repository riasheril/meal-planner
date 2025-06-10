require('dotenv').config();
const axios = require('axios');
const Recipe = require('../models/Recipe');
const GroceryList = require('../models/GroceryList');
const mongoose = require('mongoose');

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

// Debug log to check API key
// console.log('SPOONACULAR_API_KEY:', SPOONACULAR_API_KEY);

// Helper: axios with retry on 429/quota-exceeded
async function axiosWithRetry(config, maxRetries = 5, initialDelay = 1000) {
  let attempt = 0;
  let delay = initialDelay;
  while (true) {
    try {
      // Ensure params are included in the request
      const requestConfig = {
        ...config,
        params: {
          ...config.params,
          apiKey: SPOONACULAR_API_KEY
        }
      };
      return await axios(requestConfig);
    } catch (error) {
      const status = error.response?.status;
      const quotaExceeded = error.response?.data?.message?.toLowerCase().includes('quota') || false;
      if ((status === 429 || quotaExceeded) && attempt < maxRetries) {
        attempt++;
        console.warn(`Spoonacular rate limit/quota hit. Retrying in ${delay}ms (attempt ${attempt}/${maxRetries})...`);
        await new Promise(res => setTimeout(res, delay));
        delay *= 2; // Exponential back-off
      } else {
        throw error;
      }
    }
  }
}

// Function to seed the database with recipes
async function seedRecipes() {
  try {
    // Check if we're connected to MongoDB
    if (mongoose.connection.readyState !== 1) {
      console.log('Waiting for MongoDB connection...');
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      if (mongoose.connection.readyState !== 1) {
        throw new Error('MongoDB not connected');
      }
    }

    let offset = 0;
    const maxBatchSize = 2; // Reduced for testing
    let totalRecipesFetched = 0;
    let totalResults = Infinity; // Will be updated with first API call

    let batchCount = 0;
    const maxBatches = 1; // Only fetch 1 batch for testing

    // NEW: keep track of everything we insert so we can safely return it later
    const insertedRecipes = [];
    // NEW: keep the most recent API response for pagination info
    let lastApiResponse = null;

    while (batchCount < maxBatches) {
      // Calculate how many recipes to request
      const remainingRecipes = totalResults - totalRecipesFetched;
      const batchSize = remainingRecipes < maxBatchSize ? remainingRecipes : maxBatchSize;
      
      // If no more recipes to fetch, break
      if (batchSize <= 0) {
        console.log('No more recipes available to fetch');
        break;
      }

      console.log(`Fetching recipes with offset ${offset}...`);
      const response = await axiosWithRetry({
        method: 'get',
        url: `${SPOONACULAR_BASE_URL}/complexSearch`,
        params: {
          number: batchSize,
          offset: offset,   
          // offset is the number of recipes to skip before starting to fetch and
          // prevents us from fetching the same recipes over and over again
          addRecipeInformation: true,
          fillIngredients: true,
          instructionsRequired: true
        }
      });

      // Update totalResults on first call
      if (totalResults === Infinity) {
        totalResults = response.data.totalResults;
        console.log(`Total recipes available: ${totalResults}`);
      }

      // Check if we got any results
      if (response.data.results.length === 0) {
        console.log('No more recipes available to fetch');
        break;
      }

      const recipes = response.data.results.map(recipe => ({
        apiId: recipe.id,
        title: recipe.title,
        ingredients: recipe.extendedIngredients.map(ing => ({
          name: ing.name,
          quantity: ing.amount,
          unit: ing.unit
        })),
        instructions: recipe.analyzedInstructions[0]?.steps.map(step => ({
          step: step.number,
          text: step.step
        })) || [],
        tags: recipe.dishTypes || [],
        cuisine: recipe.cuisines?.[0] || '',
        cookingTime: recipe.readyInMinutes,
        servingSize: recipe.servings,
        nutrition: recipe.nutrition,
        image: recipe.image,
        sourceUrl: recipe.sourceUrl
      }));

      console.log(`Attempting to insert ${recipes.length} recipes...`);
      const result = await Recipe.insertMany(recipes);
      console.log(`Successfully inserted ${result.length} recipes`);

      // NEW: accumulate for final return
      insertedRecipes.push(...result);

      totalRecipesFetched += recipes.length;
      offset += recipes.length; // Use actual number of recipes received for next offset

      // Save for later pagination calculation
      lastApiResponse = response;

      // Add a small delay to avoid hitting API rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
      batchCount++;
    }

    console.log(`Finished seeding database. Total recipes inserted: ${totalRecipesFetched}`);
    return {
      recipes: insertedRecipes,
      pagination: {
        currentOffset: offset,
        totalFetched: totalRecipesFetched,
        totalAvailable: totalResults,
        hasMore: totalRecipesFetched < totalResults,
        isComplete:
          totalRecipesFetched >= totalResults || (lastApiResponse && lastApiResponse.data.results.length === 0)
      }
    };
  } catch (error) {
    console.error('Error seeding recipes:', error);
    throw error;
  }
}

// Function to fetch detailed info for selected recipes
async function fetchDetailedRecipes(recipeIds) {
  try {
    const response = await axiosWithRetry({
      method: 'get',
      url: `${SPOONACULAR_BASE_URL}/informationBulk`,
      params: {
        ids: recipeIds.join(',')
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching detailed recipes:', error);
    throw error;
  }
}

// Function to fetch and seed a random recipe
async function seedRandomRecipe() {
  try {
    // Check if we're connected to MongoDB
    if (mongoose.connection.readyState !== 1) {
      console.log('Waiting for MongoDB connection...');
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      if (mongoose.connection.readyState !== 1) {
        throw new Error('MongoDB not connected');
      }
    }

    const response = await axiosWithRetry({
      method: 'get',
      url: `${SPOONACULAR_BASE_URL}/random`,
      params: {
        number: 1,
        addRecipeInformation: true,
        fillIngredients: true,
        instructionsRequired: true
      }
    });

    const recipe = response.data.recipes[0];
    const formattedRecipe = {
      apiId: recipe.id,
      title: recipe.title,
      ingredients: recipe.extendedIngredients.map(ing => ({
        name: ing.name,
        quantity: ing.amount,
        unit: ing.unit
      })),
      instructions: recipe.analyzedInstructions[0]?.steps.map(step => ({
        step: step.number,
        text: step.step
      })) || [],
      tags: recipe.dishTypes || [],
      cuisine: recipe.cuisines?.[0] || '',
      cookingTime: recipe.readyInMinutes,
      servingSize: recipe.servings,
      nutrition: recipe.nutrition,
      image: recipe.image,
      sourceUrl: recipe.sourceUrl
    };

    console.log('Attempting to insert random recipe...');
    const result = await Recipe.create(formattedRecipe);
    console.log('Successfully inserted random recipe:', result.title);
    return result;
  } catch (error) {
    console.error('Error seeding random recipe:', error);
    throw error;
  }
}

// Search Spoonacular for recipes based on preferences and save new ones to DB
async function searchRecipes(preferences) {
  try {
    console.log('[SPOONACULAR] Starting recipe search with preferences:', preferences);
    
    // Construct parameters for Spoonacular API
    const params = {
      number: 48,
      addRecipeInformation: true,
      fillIngredients: true,
      instructionsRequired: true,
      minServings: preferences.servingSize  // Convert servingSize to minServings
    };

    // Add cuisine types if specified
    if (preferences.cuisineTypes && preferences.cuisineTypes.length > 0) {
      params.cuisine = preferences.cuisineTypes.join(',');
    }

    // Add dietary restrictions if specified
    if (preferences.dietaryRestrictions && preferences.dietaryRestrictions.length > 0) {
      params.diet = preferences.dietaryRestrictions.join(',');
    }

    // Add cook time if specified (only for Hangry and Hungry)
    if (preferences.cookTimeCategory === 'Hangry') {
      params.maxReadyTime = 20;
    } else if (preferences.cookTimeCategory === 'Hungry') {
      params.maxReadyTime = 40;
    }
    // Patient has no max cook time, so no parameter is added

    console.log('[SPOONACULAR] Request parameters:', params);
    console.log('[SPOONACULAR] Request URL:', `${SPOONACULAR_BASE_URL}/complexSearch`);

    const response = await axiosWithRetry({
      method: 'get',
      url: `${SPOONACULAR_BASE_URL}/complexSearch`,
      params
    });

    console.log('[SPOONACULAR] Response status:', response.status);
    console.log('[SPOONACULAR] Response headers:', response.headers);
    console.log('[SPOONACULAR] Response data structure:', {
      hasResults: !!response.data.results,
      resultsLength: response.data.results?.length,
      totalResults: response.data.totalResults,
      offset: response.data.offset,
      number: response.data.number
    });

    let results = response.data.results || [];
    console.log('[SPOONACULAR] Number of results before filtering:', results.length);

    // Filter for lower bound if needed
    if (preferences.cookTimeCategory === 'Hangry') {
      results = results.filter(r => r.readyInMinutes <= 20);
      console.log('[SPOONACULAR] Number of results after cook time filtering:', results.length);
    } else if (preferences.cookTimeCategory === 'Hungry') {
      results = results.filter(r => r.readyInMinutes >= 21 && r.readyInMinutes <= 40);
      console.log('[SPOONACULAR] Number of results after cook time filtering:', results.length);
    } else if (preferences.cookTimeCategory === 'Patient') {
      results = results.filter(r => r.readyInMinutes >= 41);
      console.log('[SPOONACULAR] Number of results after cook time filtering:', results.length);
    }

    const newRecipes = [];
    for (const recipe of results) {
      const exists = await Recipe.findOne({ apiId: recipe.id });
      if (!exists) {
        const formatted = {
          apiId: recipe.id,
          title: recipe.title,
          ingredients: recipe.extendedIngredients?.map(ing => ({
            name: ing.name,
            quantity: ing.amount,
            unit: ing.unit
          })) || [],
          instructions: recipe.analyzedInstructions?.[0]?.steps.map(step => ({
            step: step.number,
            text: step.step
          })) || [],
          tags: [
            ...(recipe.dishTypes || []),
            ...(recipe.vegan ? ['vegan'] : []),
            ...(recipe.vegetarian ? ['vegetarian'] : []),
            ...(recipe.glutenFree ? ['gluten-free'] : []),
            ...(recipe.dairyFree ? ['dairy-free'] : []),
            ...(recipe.veryHealthy ? ['healthy'] : []),
          ],
          cuisine: recipe.cuisines?.[0] || '',
          cookingTime: recipe.readyInMinutes,
          servingSize: recipe.servings,
          nutrition: recipe.nutrition,
          image: recipe.image,
          sourceUrl: recipe.sourceUrl
        };
        const created = await Recipe.create(formatted);
        newRecipes.push(created);
      }
    }
    console.log('[SPOONACULAR] Number of new recipes added to DB:', newRecipes.length);
    return newRecipes;
  } catch (error) {
    console.error('[SPOONACULAR] Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        params: error.config?.params,
        headers: error.config?.headers
      }
    });
    throw error;
  }
}

module.exports = {
  seedRecipes,
  fetchDetailedRecipes,
  seedRandomRecipe,
  searchRecipes
};
