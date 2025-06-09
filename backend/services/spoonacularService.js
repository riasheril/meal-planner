require('dotenv').config();
const axios = require('axios');
const Recipe = require('../models/Recipe');
const GroceryList = require('../models/GroceryList');
const mongoose = require('mongoose');

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

// Helper: axios with retry on 429/quota-exceeded
async function axiosWithRetry(config, maxRetries = 5, initialDelay = 1000) {
  let attempt = 0;
  let delay = initialDelay;
  while (true) {
    try {
      return await axios(config);
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
          apiKey: SPOONACULAR_API_KEY,
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

      totalRecipesFetched += recipes.length;
      offset += recipes.length; // Use actual number of recipes received for next offset

      // Add a small delay to avoid hitting API rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
      batchCount++;
    }

    console.log(`Finished seeding database. Total recipes inserted: ${totalRecipesFetched}`);
    return {
      recipes: result,
      pagination: {
        currentOffset: offset,
        totalFetched: totalRecipesFetched,
        totalAvailable: totalResults,
        hasMore: totalRecipesFetched < totalResults,
        isComplete: totalRecipesFetched >= totalResults || response.data.results.length === 0
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
        apiKey: SPOONACULAR_API_KEY,
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
        apiKey: SPOONACULAR_API_KEY,
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
  const params = {
    apiKey: SPOONACULAR_API_KEY,
    number: 10,
    addRecipeInformation: true,
    fillIngredients: true,
    instructionsRequired: true
  };
  if (preferences.cuisineTypes && preferences.cuisineTypes.length) {
    params.cuisine = preferences.cuisineTypes.join(',');
  }
  if (preferences.dietaryRestrictions && preferences.dietaryRestrictions.length) {
    params.diet = preferences.dietaryRestrictions.join(',');
  }
  if (preferences.cookingTime) {
    params.maxReadyTime = preferences.cookingTime;
  }
  if (preferences.servingSize) {
    params.servings = preferences.servingSize;
  }

  const response = await axiosWithRetry({
    method: 'get',
    url: `${SPOONACULAR_BASE_URL}/complexSearch`,
    params
  });
  const results = response.data.results || [];
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
  return newRecipes;
}

module.exports = {
  seedRecipes,
  fetchDetailedRecipes,
  seedRandomRecipe,
  searchRecipes
};
