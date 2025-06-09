const connectDB = require('../config/db');
const User = require('../models/User');
const axios = require('axios');

const API_URL = 'http://localhost:3000/api/recipes/discover';

// Map cookingTime number to cookTimeCategory string
function getCookTimeCategory(cookingTime) {
  if (cookingTime <= 20) return 'Hangry';
  if (cookingTime <= 40) return 'Hungry';
  return 'Patient';
}

async function testRecipeDiscovery() {
  await connectDB();
  const users = await User.find({});
  for (const user of users) {
    const prefs = user.preferences || {};
    const body = {
      cuisineTypes: prefs.cuisineTypes || [],
      dietaryRestrictions: prefs.dietaryRestrictions || [],
      cookTimeCategory: getCookTimeCategory(prefs.cookingTime),
      servingSize: prefs.servingSize || 1
    };
    try {
      const res = await axios.post(API_URL, body);
      const recipes = res.data;
      console.log(`\nUser: ${user.email}`);
      if (recipes.length === 0) {
        console.log('  No recipes found.');
      } else {
        console.log('  Recipes:');
        recipes.forEach(r => console.log(`    - ${r.title}`));
      }
    } catch (err) {
      console.error(`Error fetching recipes for ${user.email}:`, err.response ? err.response.data : err.message);
    }
  }
  process.exit(0);
}

testRecipeDiscovery(); 