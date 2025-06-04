# Services Directory

This directory contains service files that implement business logic and interact with the database models.

## Files

### userService.js
Implements user-related business logic:
- `registerUser`: Registers a new user and saves to the database.
- `loginUser`: Authenticates a user by email and password.
- `getPreferences`: Retrieves user preferences.
- `updatePreferences`: Updates user preferences.
- `getChosenRecipes`: Gets the user's chosen recipes.
- `addChosenRecipe`: Adds a recipe to the user's chosen list.
- `getSavedRecipes`: Gets the user's saved recipes.
- `addSavedRecipe`: Adds a recipe to the user's saved list.

### recipeService.js
Implements recipe-related business logic:
- `listRecipes`: Lists all recipes.
- `filterRecipes`: Filters recipes by query parameters.
- `getRecipeById`: Retrieves a recipe by its ID.
- `createRecipe`: Creates a new recipe.
- `updateRecipe`: Updates an existing recipe by ID.
- `deleteRecipe`: Deletes a recipe by ID.
- `getRecipeByApiId`: Retrieves a recipe by its external API ID.

### groceryListService.js
Implements grocery list-related business logic:
- `generateGroceryList`: Aggregates ingredients from selected recipes and creates a grocery list for a user.
- `getGroceryListsByUser`: Retrieves all grocery lists for a user.
- `updateGroceryList`: Updates a grocery list (e.g., check off items).
- `createGroceryList`: Creates a new grocery list.
- `getGroceryListById`: Retrieves a grocery list by its ID.
- `listAllGroceryLists`: Lists all grocery lists in the system.
- `deleteGroceryList`: Deletes a grocery list by ID.
- Normalizes units for grocery list items. 