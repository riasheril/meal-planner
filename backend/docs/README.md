# Recipe App Backend

## Project Setup

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in your MongoDB URI and any API keys.
4. **Run the server:**
   ```bash
   npm start
   ```

## Folder Structure

```
/project-root
  /models         # Mongoose schemas (User.js, Recipe.js, GroceryList.js, etc.)
  /services       # Business logic, DB utility functions, API integration helpers
  /routes         # Express route handlers
  /controllers    # (Optional) Controllers for separating route logic
  /config         # DB connection, config files
  /test           # Unit and integration tests
  app.js          # Main entry point
  .env            # Environment variables (DB URI, API keys, etc.)
  package.json
  README.md
```

## Basic Usage

- The backend provides endpoints for user onboarding, recipe management, and grocery list generation.
- MongoDB is used for persistent storage.
- External APIs (e.g., Spoonacular) are integrated for recipe data.

## Database Connection Best Practices

- All MongoDB connection logic is centralized in `config/db.js`.
- Use environment variables for sensitive information (see `.env.example`).
- Do not connect to MongoDB in multiple places; always use the exported `connectDB()` function.
- Models are in `models/`, controllers in `controllers/`, and (optionally) business logic in `services/`.
- Controllers should handle HTTP logic and call service functions for DB operations.
- Services (if used) should contain business logic and interact with Mongoose models.
- See code comments for further guidance.

## Project Structure

- `app.js`: Main entry, sets up Express and calls `connectDB()`
- `config/db.js`: MongoDB connection logic
- `models/`: Mongoose schemas
- `controllers/`: HTTP request/response logic
- `services/`: (Optional) Business logic and DB operations
- `routes/`: Express route definitions

---

For more details, see the code in each directory and the comments in the source files.
