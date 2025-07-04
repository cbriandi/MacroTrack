const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB(); // connect the DB

app.use(cors()); // middleware that enables CORS
app.use(express.json()); // body parser

app.get('/', (req, res) => res.send('API Running'));
app.use('/api/auth', require('./routes/auth')); // auth routes will be under /api/auth
app.use('/api/test', require('./routes/test')); // tests the auth middleware, will delete later
app.use('/api/recipes', require('./routes/recipe'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
