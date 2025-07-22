const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // give the parsed env file

const authMiddleware = (req, res, next) => {
    const header = req.header('Authorization');
    if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
    }

    const token = header.split(' ')[1];

    if (!token) { // if there isnt a token, deny access
    return res.status(401).json({ message: 'Authorization token is required.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify the token
        req.user = { id: decoded.userId }; // attach the uid from the decoded token to the req object
        next(); // continue to the next middleware/route 
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;