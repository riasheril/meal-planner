const mongoose = require('mongoose');

const GroceryListSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    name: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0.01 },
    // IMPORTANT: Input normalization should be applied before saving (see services/groceryListService.js)
    unit: {
      type: String,
      default: ''
    },
    checked: { type: Boolean, default: false },
    aisle: { type: String, trim: true }
  }],
  relatedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GroceryList', GroceryListSchema); 