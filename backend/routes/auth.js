const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// connect the URLs to their controllers

router.post('/register', registerUser); // listen for requests at /api/auth/register
router.post('/login', loginUser); // listen for requests at /api/auth/login
router.get('/user', authMiddleware, getUser)

module.exports = router;
