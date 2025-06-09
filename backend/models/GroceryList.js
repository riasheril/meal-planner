const mongoose = require('mongoose');

const GroceryListSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    name: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0.01 },
    // IMPORTANT: Input normalization should be applied before saving (see services/groceryListService.js)
    unit: { 
      type: String, 
      required: true, 
      enum: [
        'mg', 'g', 'kg', 'oz', 'lb',
        'ml', 'l', 'tsp', 'tbsp', 'cup', 'pt', 'qt', 'gal', 'fl oz',
        'piece', 'clove', 'slice', 'can', 'pack', 'bunch', 'stick', 'head', 'bottle', 'jar',
        'medium', 'large', 'bag', 'box', 't', 'c'
      ]
    },
    checked: { type: Boolean, default: false }
  }],
  relatedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GroceryList', GroceryListSchema); 