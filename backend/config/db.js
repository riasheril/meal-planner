require('dotenv').config();
const mongoose = require('mongoose');

// config/db.js
// Centralized MongoDB connection logic for the project
// Usage: require and call connectDB() in your main app entry point
// Uses environment variable MONGODB_URI for connection string
// Handles connection errors and logs status
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB; 