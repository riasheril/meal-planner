# Controllers Directory

This directory contains controller files that handle HTTP requests and responses for different resources.

## Files

### userController.js
Handles user-related HTTP requests:
- `register`: Registers a new user.
- `login`: Authenticates a user and returns user info.
- `getPreferences`: Retrieves user preferences.
- `updatePreferences`: Updates user preferences.
- `getChosenRecipes`: Gets the user's chosen recipes.
- `addChosenRecipe`: Adds a recipe to the user's chosen list.
- `getSavedRecipes`: Gets the user's saved recipes.
- `addSavedRecipe`: Adds a recipe to the user's saved list.

### recipeController.js
Handles recipe-related HTTP requests:
- `list`: Lists all recipes.
- `filter`: Filters recipes by query parameters.
- `getById`: Retrieves a recipe by its ID.
- `create`: Creates a new recipe.
- `update`: Updates an existing recipe by ID.
- `delete`: Deletes a recipe by ID.

### groceryListController.js
Handles grocery list-related HTTP requests:
- `generate`: Generates a grocery list from selected recipes for a user.
- `getByUser`: Retrieves all grocery lists for a user.
- `update`: Updates a grocery list (e.g., check off items).
- `create`: Creates a new grocery list.
- `getById`: Retrieves a grocery list by its ID.
- `listAll`: Lists all grocery lists in the system.
- `delete`: Deletes a grocery list by ID. 