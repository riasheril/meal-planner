# Models Directory

This directory contains Mongoose models that define the data structure for the application.

## Files

### User.js
Defines the user schema and model:
- Fields: email, password (hashed), preferences (dietary restrictions, cuisine types, cooking time, serving size), chosenRecipes, savedRecipes, groceryLists.
- Passwords are hashed before saving using bcrypt.
- Includes a method to compare passwords for authentication.
- Timestamps for creation and update.

### Recipe.js
Defines the recipe schema and model:
- Fields: apiId, title, ingredients (name, quantity, unit), instructions (step, text), tags, cuisine, cookingTime, servingSize, nutrition, image, sourceUrl.
- Used to store and retrieve recipe data.

### GroceryList.js
Defines the grocery list schema and model:
- Fields: user (reference), items (name, quantity, unit, checked), relatedRecipes (references), createdAt.
- Items include normalization and validation for units.
- Used to manage grocery lists for users, linked to recipes. 