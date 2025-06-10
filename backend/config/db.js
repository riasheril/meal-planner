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
      if (process.env.NODE_ENV === 'test') {
        // Spin up an ephemeral Mongo instance ONLY for automated tests
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        const mongoServer = await MongoMemoryServer.create();
        uri = mongoServer.getUri();
        console.log('Started in-memory MongoDB instance for tests');
      } else {
        throw new Error('MONGODB_URI not set and NODE_ENV is not "test". Refusing to start with in-memory database.');
      }
    }

    console.log('Attempting to connect to MongoDB...');
    
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

    // -------------------------------------------------------------------
    // Ensure sparse unique index on User.email to avoid duplicate nulls
    // -------------------------------------------------------------------
    try {
      const User = require('../models/User');
      const indexes = await User.collection.getIndexes({ full: true });
      const emailIdx = indexes.find(idx => idx.key && idx.key.email === 1);
      if (emailIdx && !emailIdx.sparse) {
        console.log('Dropping non-sparse `email` index on users collection...');
        await User.collection.dropIndex(emailIdx.name);
      }
      // (Re)create desired index
      await User.collection.createIndex({ email: 1 }, { unique: true, sparse: true });
      console.log('Verified sparse unique index on users.email');
    } catch (idxErr) {
      console.error('Failed to verify/create sparse index on users.email:', idxErr);
    }
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB; 