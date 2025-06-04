const userService = require('@services/userService');

// Placeholder user controller
exports.register = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ message: 'User registered', user: { _id: user._id, email: user.email } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ message: 'Login successful', user: { _id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPreferences = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : req.query.userId;
    const preferences = await userService.getPreferences(userId);
    res.json({ preferences });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : req.body.userId;
    const updated = await userService.updatePreferences(userId, req.body.preferences);
    res.json({ message: 'Preferences updated', preferences: updated.preferences });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getChosenRecipes = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : req.query.userId;
    const recipes = await userService.getChosenRecipes(userId);
    res.json({ recipes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addChosenRecipe = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : req.body.userId;
    const { recipeId } = req.body;
    const user = await userService.addChosenRecipe(userId, recipeId);
    res.json({ message: 'Recipe added to chosen', chosenRecipes: user.chosenRecipes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSavedRecipes = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : req.query.userId;
    const recipes = await userService.getSavedRecipes(userId);
    res.json({ recipes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addSavedRecipe = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : req.body.userId;
    const { recipeId } = req.body;
    const user = await userService.addSavedRecipe(userId, recipeId);
    res.json({ message: 'Recipe added to saved', savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 