# Scripts Directory

This directory contains utility scripts for database management and other tasks.

## Files

### clearSeedData.js
- Loads environment variables from `.env`.
- Connects to MongoDB using the shared config.
- Imports User, Recipe, and GroceryList models.
- Deletes all documents from the User, Recipe, and GroceryList collections.
- Logs the number of documents deleted from each collection.
- Disconnects from MongoDB after completion.
- Usage: Run with `node scripts/clearSeedData.js` to reset the database. 