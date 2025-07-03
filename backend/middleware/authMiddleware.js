const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // give the parsed env file

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization'); // get the token from the header

    if (!token) { // if there isnt a token, dent access
    return res.status(401).json({ message: 'Authorization token is required.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify the token
        req.user = { userId: decoded.userId }; // attach the uid from the decoded token to the req object
        next(); // continue to the next middleware/route 
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;