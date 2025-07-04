const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createRecipe } = require('../controllers/recipeController');

router.post('/', authMiddleware, createRecipe); // protected POST route to create a new recipe

module.exports = router;
