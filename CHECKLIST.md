# Project Integration & Feature Checklist

A comprehensive checklist to align, connect, and enhance the MealApp project (frontend + backend), including API integration, user authentication, and deployment readiness.

---

## 1. Backend

- [ ] **Spoonacular Integration**
  - [ ] Create `spoonacularService.js` for API calls (search, details)
  - [ ] Securely manage API key via environment variables
  - [ ] Handle API errors and rate limits
  - [ ] Add caching for fetched recipes (optional)
- [ ] **Recipe Logic**
  - [ ] Store/caches new recipes in MongoDB
  - [ ] Expose endpoints for search, details, and user favorites
- [ ] **User Authentication**
  - [ ] Implement user registration/login (JWT or session-based)
  - [ ] Secure endpoints (recipes, meal plans, grocery lists) for authenticated users
  - [ ] Password hashing and validation
  - [ ] Add user model/schema if not present
- [ ] **API Endpoints**
  - [ ] `/api/recipes/search` (Spoonacular + local)
  - [ ] `/api/recipes/:id` (details, local or Spoonacular)
  - [ ] `/api/users/register` and `/api/users/login`
  - [ ] `/api/meal-plans` (CRUD, user-specific)
  - [ ] `/api/grocery-lists` (CRUD, user-specific)
- [ ] **Testing**
  - [ ] Unit tests for services/controllers
  - [ ] Integration tests for endpoints
- [ ] **Documentation**
  - [ ] Update backend README with setup, env, and API usage

---

## 2. Frontend

- [ ] **API Integration**
  - [ ] Replace local recipe generation with backend fetch (React Query/axios)
  - [ ] Fetch recipe details from backend
  - [ ] Implement search/filter UI (calls backend)
- [ ] **User Authentication**
  - [ ] Registration and login forms
  - [ ] Store JWT/token securely (httpOnly cookie or localStorage)
  - [ ] Auth context/provider for user state
  - [ ] Protect routes (recipes, meal plan, grocery list)
  - [ ] Logout functionality
- [ ] **Meal Plan & Grocery List**
  - [ ] Fetch/save meal plans and grocery lists per user
  - [ ] UI for creating/editing meal plans
  - [ ] UI for managing grocery lists
- [ ] **Error & Loading States**
  - [ ] Show loading spinners/placeholders
  - [ ] Show error messages for failed API calls
- [ ] **Testing**
  - [ ] Component and integration tests
- [ ] **Documentation**
  - [ ] Update frontend README with setup, env, and usage

---

## 3. DevOps & Deployment

- [ ] **Environment**
  - [ ] Add `.env.example` files for frontend and backend
  - [ ] Ensure API keys/secrets are not committed
- [ ] **Deployment**
  - [ ] Prepare for deployment (Vercel/Netlify for frontend, Render/Heroku for backend, etc.)
  - [ ] Add deployment instructions to README
- [ ] **GitHub**
  - [ ] Push this checklist to remote
  - [ ] Set up branch protection and PR review (optional)

---

## 4. (Optional) Enhancements
- [ ] User profile management
- [ ] Recipe ratings/comments
- [ ] Mobile responsiveness improvements

---

**Check off items as you complete them!** 