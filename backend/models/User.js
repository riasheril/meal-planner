const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  password: { type: String, select: false },
  // For users authenticated via Auth0 we store their unique `sub` identifier.
  auth0Id: { type: String, unique: true, sparse: true },
  preferences: {
    // Array of dietary restriction tags (e.g., 'vegan', 'gluten-free')
    dietaryRestrictions: { type: [String], default: [] },
    // Array of preferred cuisine types (e.g., 'Italian', 'Mexican')
    cuisineTypes: { type: [String], default: [] },
    cookingTime: String, // Accepts 'Hungry', 'Hangry', 'Patient', etc.
    servingSize: Number
  },
  chosenRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }], // List of selected recipes
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  groceryLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GroceryList' }]
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password for login
UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema); 