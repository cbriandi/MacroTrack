const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// connect the URLs to their controllers

router.post('/register', registerUser); // listen for requests at /api/auth/register
router.post('/login', loginUser); // listen for requests at /api/auth/login

module.exports = router;
