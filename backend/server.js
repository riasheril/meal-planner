require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const recipeRoutes = require('./routes/recipe');
const groceryListRoutes = require('./routes/groceryList');
const { checkJwt } = require('./middleware/auth');
const userController = require('./controllers/userController');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB();

// Root route
app.get('/', (req, res) => {
  res.send('Recipe App Backend is running!');
});

// Protected routes that require JWT
app.use('/api/recipes', checkJwt, recipeRoutes);
app.use('/api/grocery-lists', checkJwt, groceryListRoutes);

// Public user routes
app.post('/api/users/register', userController.register);
app.post('/api/users/login', userController.login);

// Protected user routes
app.use('/api/users', checkJwt, userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Invalid token' });
  }
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 