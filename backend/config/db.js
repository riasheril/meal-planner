require('dotenv').config();
const mongoose = require('mongoose');

// config/db.js
// Centralized MongoDB connection logic for the project
// Usage: require and call connectDB() in your main app entry point
// Uses environment variable MONGODB_URI for connection string
// Handles connection errors and logs status
const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;
    if (!uri) {
      // Spin up an ephemeral Mongo instance for tests/development
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log('Started in-memory MongoDB instance');
    }

    console.log('Attempting to connect to MongoDB...');
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Mongo URI: ${uri}`);
    }
    
    // Use DB_NAME env var if supplied (helps when the connection string omits the db segment)
    const dbNameOption = process.env.DB_NAME ? { dbName: process.env.DB_NAME } : {};

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // How long to wait for operations to complete
      family: 4, // Use IPv4, skip trying IPv6
      ...dbNameOption
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB; 