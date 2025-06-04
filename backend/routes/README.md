# Routes Directory

This directory contains Express route definitions for the application's API endpoints.

## Files

### user.js
Defines user-related API endpoints:
- `POST /register`: Register a new user.
- `POST /login`: Login a user.
- `GET /preferences`: Get user preferences.
- `PUT /preferences`: Update user preferences.
- `GET /chosen-recipes`: Get user's chosen recipes.
- `POST /chosen-recipes`: Add a recipe to chosen recipes.
- `GET /saved-recipes`: Get user's saved recipes.
- `POST /saved-recipes`: Add a recipe to saved recipes.

### recipe.js
Defines recipe-related API endpoints:
- `GET /`: List all recipes.
- `GET /filter`: Filter recipes by query.
- `GET /:id`: Get a recipe by ID.
- `POST /`: Create a new recipe.
- `PUT /:id`: Update a recipe by ID.
- `DELETE /:id`: Delete a recipe by ID.

### groceryList.js
Defines grocery list-related API endpoints:
- `POST /generate`: Generate a grocery list from recipes.
- `GET /`: Get grocery lists for a user.
- `PUT /:id`: Update a grocery list.
- `POST /`: Create a new grocery list.
- `GET /:id`: Get a grocery list by ID.
- `GET /all`: List all grocery lists.
- `DELETE /:id`: Delete a grocery list by ID. 