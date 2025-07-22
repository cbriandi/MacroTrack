const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body; // get data from the request body

  try {
    let user = await User.findOne({ email }); // look for an existing user
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ // if there is not an existing user, create a new user
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt); // hash the password

    await user.save(); // save the new user to the database

    const payload = { userId: user._id }; // make a jwt token so the user does not have to repeatedly sign in
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token }); // respond with the generated token
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body; // get data from request body

  try {
    const user = await User.findOne({ username }); // find a user with the given username
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' }); // user does not exist
    }

    const isMatch = await bcrypt.compare(password, user.password); // email exists, now check if the passwords match
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' }); // passwords did not match
    }

    const payload = { userId: user._id }; // make a jwt token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token }); // respond with the token
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getUser = async (req, res) => {
  console.log('getting user');
  try {
    console.log(`Here is the user object sent to the backend: ${req.user}`)
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
