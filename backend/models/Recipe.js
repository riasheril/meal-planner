const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  apiId: String,
  title: String,
  ingredients: [{ name: String, quantity: Number, unit: String }],
  instructions: [{ step: Number, text: String }],
  tags: [String],
  cuisine: String,
  cookingTime: Number,
  servingSize: Number,
  nutrition: Object,
  image: String,
  sourceUrl: String
});

module.exports = mongoose.model('Recipe', RecipeSchema); 