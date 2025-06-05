require('dotenv').config({ path: 'C:/Users/steve/OneDrive/Documents/_Organized/02_Programming/Bootcamp/Meal Map/Meal Map/backend/.env' });
const mongoose = require('mongoose');
const connectDB = require('../config/db');

const User = require('../models/User');
const Recipe = require('../models/Recipe');
const GroceryList = require('../models/GroceryList');

async function clearSeedData() {
  await connectDB();

  const collections = [
    { name: 'User', model: User },
    { name: 'Recipe', model: Recipe },
    { name: 'GroceryList', model: GroceryList }
  ];

  for (const { name, model } of collections) {
    try {
      const result = await model.deleteMany({});
      console.log(`Cleared ${result.deletedCount} documents from ${name} collection.`);
    } catch (err) {
      console.error(`Error clearing ${name} collection:`, err);
    }
  }

  await mongoose.disconnect();
  console.log('Done!');
}

clearSeedData(); 