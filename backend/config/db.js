require('dotenv').config();
const mongoose = require('mongoose');

// config/db.js
// Centralized MongoDB connection logic for the project
// Usage: require and call connectDB() in your main app entry point
// Uses environment variable MONGODB_URI for connection string
// Handles connection errors and logs status
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // How long to wait for operations to complete
      family: 4 // Use IPv4, skip trying IPv6
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB; 