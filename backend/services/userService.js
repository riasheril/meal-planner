const User = require('@models/User');

// Register a new user
async function registerUser(userData) {
  const user = new User(userData);
  await user.save();
  return user;
}

// Find user by email and compare password
async function loginUser(email, password) {
  const user = await User.findOne({ email }).select('+password');
  if (!user) return null;
  const isMatch = await user.comparePassword(password);
  return isMatch ? user : null;
}

// Get user preferences
async function getPreferences(userId) {
  const user = await User.findById(userId);
  return user ? user.preferences : null;
}

// Update user preferences
async function updatePreferences(userId, preferences) {
  return User.findByIdAndUpdate(userId, { preferences }, { new: true });
}

// Get chosen recipes
async function getChosenRecipes(userId) {
  const user = await User.findById(userId).populate('chosenRecipes');
  return user ? user.chosenRecipes : [];
}

// Add a recipe to chosen recipes
async function addChosenRecipe(userId, recipeId) {
  return User.findByIdAndUpdate(
    userId,
    { $addToSet: { chosenRecipes: recipeId } },
    { new: true }
  );
}

// Get saved recipes
async function getSavedRecipes(userId) {
  const user = await User.findById(userId).populate('savedRecipes');
  return user ? user.savedRecipes : [];
}

// Add a recipe to saved recipes
async function addSavedRecipe(userId, recipeId) {
  return User.findByIdAndUpdate(
    userId,
    { $addToSet: { savedRecipes: recipeId } },
    { new: true }
  );
}

module.exports = {
  registerUser,
  loginUser,
  getPreferences,
  updatePreferences,
  getChosenRecipes,
  addChosenRecipe,
  getSavedRecipes,
  addSavedRecipe,
}; 