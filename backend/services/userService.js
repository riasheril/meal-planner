const User = require('../models/User');

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
async function updatePreferences(userId, preferences, authUser) {
  let user = await User.findById(userId);
  if (!user && authUser) {
    // Try to find by email (in case userId is not set correctly)
    user = await User.findOne({ email: authUser.email });
    if (!user) {
      // Create new user for Auth0 user
      user = new User({
        email: authUser.email,
        // No password for Auth0 users
        preferences: preferences || {},
      });
      await user.save();
      console.log("\n==============================");
      console.log(`[USER] CREATED: ${user.email} (${user._id})`);
      console.log("[USER] Preferences:", JSON.stringify(preferences, null, 2));
      console.log("==============================\n");
    } else {
      console.log("\n------------------------------");
      console.log(`[USER] FOUND by email: ${user.email} (${user._id})`);
      console.log("------------------------------\n");
    }
    userId = user._id;
  } else if (user) {
    console.log("\n------------------------------");
    console.log(`[USER] UPDATING preferences for: ${user.email} (${user._id})`);
    console.log("------------------------------\n");
  } else {
    console.log("\n[USER] No user found for update. userId:", userId, "authUser:", authUser);
  }
  const updatedUser = await User.findByIdAndUpdate(userId, { preferences }, { new: true });
  if (updatedUser) {
    console.log("[USER] Preferences UPDATED for:", updatedUser.email, `(${updatedUser._id})`);
    console.log("[USER] New Preferences:", JSON.stringify(updatedUser.preferences, null, 2));
  } else {
    console.log("[USER] FAILED to update preferences for userId:", userId);
  }
  return updatedUser;
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

// Bulk set chosen recipes
async function setChosenRecipes(userId, recipeIds) {
  return User.findByIdAndUpdate(
    userId,
    { chosenRecipes: recipeIds },
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
  setChosenRecipes,
  getSavedRecipes,
  addSavedRecipe,
}; 