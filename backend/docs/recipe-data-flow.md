# Recipe Data Flow: Spoonacular & MongoDB Integration

## Overview
This document describes the recommended approach for integrating Spoonacular recipe data with your MongoDB database, ensuring efficient use of API calls, consistent data structure, and a great user experience.

---

## 1. When to Store Recipes in MongoDB
Store recipes in your own database if:
- A user saves, chooses, or interacts with a recipe (e.g., adds to meal plan, favorites, etc.).
- You want to allow user-specific customizations (notes, ratings, etc.).
- You want to avoid repeated API calls for the same recipe.
- You want to ensure a consistent data structure for your frontend.

Do **not** store every recipe fetched from Spoonacular—only those the user interacts with.

---

## 2. Data Flow

### a. User Browses/Searches Recipes
- **Backend** fetches recipes from Spoonacular based on user query.
- **Backend** transforms Spoonacular data to match your schema (e.g., instructions as `{ step, text }`).
- **Backend** sends transformed data to the frontend.
- **No database storage** at this stage.

### b. User Saves/Chooses a Recipe
- **Backend** fetches the recipe from Spoonacular (if not already fetched).
- **Backend** transforms the data to your schema.
- **Backend** stores the recipe in MongoDB.
- **Backend** serves the recipe to the frontend from MongoDB for future requests.

### c. User Views Saved/Chosen Recipes
- **Backend** fetches recipes directly from MongoDB (already in your schema).
- **Backend** sends data to the frontend.

---

## 3. Why Transform Spoonacular Data?
- Ensures your frontend always receives data in a consistent format.
- Decouples your app from Spoonacular API changes.
- Allows you to add custom fields (user notes, ratings, etc.).

---

## 4. Summary Table

| Action                | Source         | Store in DB? | Transform to Schema? | Serve to Frontend |
|-----------------------|---------------|--------------|----------------------|-------------------|
| Search/Browse         | Spoonacular   | No           | Yes                  | Yes               |
| Save/Choose Recipe    | Spoonacular   | Yes          | Yes                  | Yes               |
| View Saved/Chosen     | MongoDB       | Already in DB| Already transformed  | Yes               |

---

## 5. Example Flow

1. **User searches for recipes:**
   - Backend calls Spoonacular, transforms data, returns to frontend.
2. **User saves a recipe:**
   - Backend fetches from Spoonacular (if needed), transforms, stores in MongoDB.
3. **User views saved recipes:**
   - Backend fetches from MongoDB, returns to frontend.

---

## 6. Notes
- Only store recipes in MongoDB that users interact with.
- Always transform Spoonacular data to your schema before storing or serving.
- Store user-specific data (chosen recipes, grocery lists, preferences) in MongoDB.

---

**This approach ensures efficiency, flexibility, and a robust user experience!** 