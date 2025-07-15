const Recipe = require('../models/Recipe');

const createRecipe = async (req, res) => {
  const { title, ingredients, instructions, macros, isPublic } = req.body;

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ msg: 'Title, ingredients, and instructions are required.' });
  }

  try {
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      macros: macros || {},
      isPublic: isPublic || false,
      user: req.user.userId,
    });

    const savedRecipe = await newRecipe.save();

    res.status(201).json(savedRecipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { createRecipe };
