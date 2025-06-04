const connectDB = require('../config/db');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const { generateGroceryList } = require('../services/groceryListService');

async function main() {
  await connectDB();

  // 1. Ensure a mock user exists
  let user = await User.findOne();
  if (!user) {
    user = await User.create({ email: 'mockuser@example.com', password: 'password123' });
    console.log('Created mock user:', user.email);
  } else {
    console.log('Using existing user:', user.email);
  }

  // 2. Get all recipe IDs (or select specific ones)
  const recipes = await Recipe.find();
  if (recipes.length === 0) {
    console.error('No recipes found! Run your seed script first.');
    process.exit(1);
  }
  const recipeIds = recipes.map(r => r._id);

  // 3. Generate grocery list
  const groceryList = await generateGroceryList(user._id, recipeIds);
  console.log('Generated grocery list:', JSON.stringify(groceryList, null, 2));

  process.exit(0);
}

main(); 