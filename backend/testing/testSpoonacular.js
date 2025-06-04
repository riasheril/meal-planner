const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
const connectDB = require('../config/db');

// Log the current working directory
console.log('Current working directory:', process.cwd());

// Try to load .env file with absolute path
const envPath = path.resolve(process.cwd(), '.env');
console.log('Looking for .env file at:', envPath);

// Try to read .env file directly
try {
    const envContents = fs.readFileSync(envPath, 'utf8');
    console.log('Contents of .env file:', envContents);
} catch (error) {
    console.error('Error reading .env file:', error);
}

// Load .env file
const result = dotenv.config({ path: envPath });
if (result.error) {
    console.error('Error loading .env file:', result.error);
} else {
    console.log('.env file loaded successfully');
}

// Log all environment variables (be careful with this in production!)
console.log('Environment variables:', process.env);

const { seedRecipes, fetchDetailedRecipes } = require('../services/spoonacularService');

// Main test function
async function runTests() {
    try {
        // First connect to MongoDB
        console.log('Connecting to MongoDB...');
        await connectDB();
        console.log('MongoDB connected successfully');

        // Test seeding recipes
        console.log('Starting recipe seeding test...');
        await seedRecipes();
        console.log('Recipes seeded successfully');

        // Test fetching detailed recipes
        console.log('Testing detailed recipe fetch...');
        const detailedRecipes = await fetchDetailedRecipes(['123456', '789012']); // Replace with actual recipe IDs
        console.log('Detailed recipes:', detailedRecipes);

        process.exit(0);
    } catch (error) {
        console.error('Test failed:', error);
        process.exit(1);
    }
}

// Run the tests
runTests(); 