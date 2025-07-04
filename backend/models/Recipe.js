const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  macros: {
     protein: { type: Number },
    carbs: { type: Number },
    fats: { type: Number },
    calories: { type: Number },
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true }); // autosave createdAt and updatedAt

module.exports = mongoose.model('Recipe', RecipeSchema);
