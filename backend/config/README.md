# Config Directory

This directory contains configuration files for the project.

## Files

### db.js
- Centralized MongoDB connection logic for the project.
- Exports a `connectDB` function to establish a connection to MongoDB using the `MONGODB_URI` environment variable.
- Handles connection errors and logs status.
- Usage: Require and call `connectDB()` in your main app entry point.
- Loads environment variables from `.env` using `dotenv`.
- Uses Mongoose for database connection and management. 