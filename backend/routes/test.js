// this route just test that the middleware works
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/protected', authMiddleware, (req, res) => {
  res.json({ msg: 'Protected route accessed', user: req.user });
});

module.exports = router;
