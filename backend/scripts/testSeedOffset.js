const connectDB = require('../config/db');
const { seedRecipes } = require('../services/spoonacularService');

async function testSeedOffset() {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Run the seed function
    console.log('Starting to seed recipes...');
    await seedRecipes();
    console.log('Successfully completed seeding recipes');
    
    // Exit the process
    process.exit(0);
  } catch (error) {
    console.error('Error running seed test:', error);
    process.exit(1);
  }
}

// Run the script
testSeedOffset(); 