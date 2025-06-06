require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const recipeRoutes = require('./routes/recipe');
const groceryListRoutes = require('./routes/groceryList');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB();

// Root route
app.get('/', (req, res) => {
  res.send('Recipe App Backend is running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/grocery-lists', groceryListRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 