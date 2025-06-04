require('dotenv').config();
const connectDB = require('../config/db');
const { seedRandomRecipe } = require('../services/spoonacularService');

async function runSeedRandom() {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Run the seed function
    const recipe = await seedRandomRecipe();
    console.log('Successfully seeded random recipe:', recipe.title);
    
    // Exit the process
    process.exit(0);
  } catch (error) {
    console.error('Error running seed random:', error);
    process.exit(1);
  }
}

runSeedRandom(); 