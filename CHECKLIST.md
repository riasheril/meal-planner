# 🚀 Lean MVP To-Do (Auth, DB, Spoonacular)

**Focus: Only what's needed for a real, working MVP.**

- [ ] AUTH: Decide on single auth flow (Auth0 or custom JWT) and ensure login returns usable token for frontend
- [ ] AUTH: Ensure all protected endpoints require valid auth (JWT or Auth0)
- [ ] AUTH: Frontend can register, login, and persist session (token/cookie)
- [ ] DB: Ensure MongoDB connection is robust and uses env vars in all environments
- [ ] DB: User, Recipe, and GroceryList models are working and validated
- [ ] DB: Cascade or handle deletes for user/recipe relationships
- [ ] SPOONACULAR: API key in .env, never hardcoded
- [ ] SPOONACULAR: Handle API rate limits and errors gracefully
- [ ] SPOONACULAR: Recipe search/discover works end-to-end (frontend → backend → Spoonacular → DB → frontend)
- [ ] TEST: Manual test of user flow: register → login → search recipes → save/choose recipe → see in DB 