# Full Application Flow Documentation

This document explains the end-to-end flow of the application, referencing every relevant file, when it is used, and what it does. It covers both the mock/test flow (using Spoonacular mock data) and the core backend structure for production use.

---

## 1. **Mock/Test Flow (End-to-End Demo)**

### **Key Files & Folders**
- `testing/fullMockFlow.sh` — Shell script to automate the full mock flow.
- `testing/seedRecipesFromMock.js` — Seeds the database with recipes from mock Spoonacular data.
- `testing/generateMockGroceryList.js` — Simulates a user and generates a grocery list from all recipes.
- `testing/spoontacular-api-examples/complex-search.json` — Mock output from Spoonacular complex search API.
- `testing/spoontacular-api-examples/focussed-search.json` — Mock output from Spoonacular ingredient widget API.
- `scripts/clearSeedData.js` — Clears all users, recipes, and grocery lists from the database.

### **How the Mock Flow Works**
1. **Clear all data:** `scripts/clearSeedData.js` wipes the database for a clean slate.
2. **Seed recipes:** `testing/seedRecipesFromMock.js` reads the mock JSON files, transforms the data, and inserts high-level and full-detail recipes into the DB.
3. **Generate grocery list:** `testing/generateMockGroceryList.js` creates a mock user (if needed), fetches all recipes, and generates a grocery list using the real aggregation logic.
4. **Automate all steps:** Run `./testing/fullMockFlow.sh` to execute all the above in sequence.

---

## 2. **Core Backend Structure**

### **Models (`models/`)**
- `User.js` — Mongoose schema for users, including preferences, chosen/saved recipes, and grocery lists.
- `Recipe.js` — Mongoose schema for recipes, including Spoonacular `apiId`, ingredients, instructions, tags, etc.
- `GroceryList.js` — Mongoose schema for grocery lists, referencing users and recipes, and storing normalized items.

### **Services (`services/`)**
- `userService.js` — Business logic for user registration, login, preferences, and managing chosen/saved recipes.
- `recipeService.js` — Business logic for creating, updating, and fetching recipes, including by Spoonacular `apiId`.
- `groceryListService.js` — Business logic for generating grocery lists by aggregating and normalizing ingredients from recipes.

### **Controllers (`controllers/`)**
- `userController.js`, `recipeController.js`, `groceryListController.js` — Handle HTTP requests, call service functions, and return responses.

### **Routes (`routes/`)**
- `user.js`, `recipe.js`, `groceryList.js` — Define Express API endpoints for users, recipes, and grocery lists.

### **Utils (`utils/`)**
- `unit.js` — Contains `normalizeUnit` for mapping and validating ingredient units (handles plural/synonyms).
- `transformSpoonacular.js` — Contains `transformSpoonacularRecipe` for converting Spoonacular API data to your internal schema.

### **Config (`config/`)**
- `db.js` — Centralized MongoDB connection logic.

---

## 3. **How Spoonacular Data Is Handled**
- **Mock/test:**
  - `complex-search.json` simulates a user search (high-level recipe info).
  - `focussed-search.json` simulates fetching full ingredient details for a recipe.
  - `transformSpoonacularRecipe` (utils) combines these into your schema.
- **Production:**
  - The same transformation utility is used, but data is fetched from the real Spoonacular API.
  - Only recipes a user interacts with are stored in the DB.

---

## 4. **How User Actions Map to DB Changes**
- **User saves/chooses a recipe:**
  - The recipe is fetched (if not already in DB), transformed, and stored.
  - The recipe's `_id` is added to `user.chosenRecipes` or `user.savedRecipes`.
- **User generates a grocery list:**
  - The grocery list is created by aggregating ingredients from selected recipes.
  - The grocery list's `_id` is added to `user.groceryLists`.
- **In mock/test scripts:**
  - These relationships are only created if explicitly simulated (for future-proofing, let real user actions drive these updates).

---

## 5. **How to Run the Full Mock Flow**
1. `chmod +x testing/fullMockFlow.sh` (if not already executable)
2. `./testing/fullMockFlow.sh`
   - This will clear the DB, seed recipes, and generate a grocery list for a mock user.

---

## 6. **Important Notes for Future Development**
- **Always use service functions** (not direct DB updates) to update user relationships for chosen/saved recipes and grocery lists.
- **Keep transformation and normalization logic in utils** for consistency and maintainability.
- **Expand mock data** as needed to test more edge cases or new features.
- **In production,** connect to the real Spoonacular API and use the same transformation logic.
- **Document any new flows or scripts** in this file for team clarity.

---

## 7. **File Reference Table**

| File/Folder                                      | Purpose/Role                                                      |
|--------------------------------------------------|-------------------------------------------------------------------|
| `testing/fullMockFlow.sh`                        | Automates the full mock flow (clear, seed, generate grocery list) |
| `testing/seedRecipesFromMock.js`                 | Seeds recipes from mock Spoonacular data                          |
| `testing/generateMockGroceryList.js`             | Simulates user and generates grocery list                         |
| `testing/spoontacular-api-examples/`             | Contains mock Spoonacular API JSON files                          |
| `scripts/clearSeedData.js`                       | Clears all users, recipes, and grocery lists from DB              |
| `models/` (User.js, Recipe.js, GroceryList.js)   | Mongoose schemas for core entities                                |
| `services/`                                      | Business logic for users, recipes, grocery lists                  |
| `controllers/`                                   | HTTP request/response logic                                       |
| `routes/`                                        | Express API endpoint definitions                                  |
| `utils/unit.js`                                  | Unit normalization helper                                         |
| `utils/transformSpoonacular.js`                  | Spoonacular-to-schema transformation utility                      |
| `config/db.js`                                   | MongoDB connection setup                                          |

---

**Keep this document updated as your app evolves!** 