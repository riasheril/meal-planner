#!/bin/bash

set -e

# Step 1: Clear all seed data
echo "[1/3] Clearing all seed data..."
node ../scripts/clearSeedData.js

echo "[2/3] Seeding recipes from mock Spoonacular files..."
node testing/seedRecipesFromMock.js

echo "[3/3] Generating grocery list for mock user..."
node testing/generateMockGroceryList.js

echo "All done!" 