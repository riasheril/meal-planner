require('dotenv').config();
const axios = require('axios');
const Recipe = require('../models/Recipe');
const GroceryList = require('../models/GroceryList');
const mongoose = require('mongoose');

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

// Function to seed the database with 48 recipes
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

    const response = await axios.get(`${SPOONACULAR_BASE_URL}/complexSearch`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        number: 48,
        addRecipeInformation: true,
        fillIngredients: true,
        instructionsRequired: true
      }
    });

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

    console.log('Attempting to insert recipes...');
    const result = await Recipe.insertMany(recipes);
    console.log(`Successfully inserted ${result.length} recipes`);
  } catch (error) {
    console.error('Error seeding recipes:', error);
    throw error;
  }
}

// Function to fetch detailed info for selected recipes
async function fetchDetailedRecipes(recipeIds) {
  try {
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/informationBulk`, {
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

    const response = await axios.get(`${SPOONACULAR_BASE_URL}/random`, {
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

module.exports = {
  seedRecipes,
  fetchDetailedRecipes,
  seedRandomRecipe
};
