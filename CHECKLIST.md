# 🚀 Lean MVP To-Do (Auth, DB, Spoonacular)

**Focus: Only what's needed for a real, working MVP.**

Below is the short-list of work items that still have to be done (or at least verified) before the "search → pick recipes → build grocery list" MVP can be demoed end-to-end on a fresh laptop.  
Everything that is already in the repo but still needs wiring / tweaking is marked "CONNECT", things that are completely missing are marked "CREATE".

────────────────────────────────────────
BACK-END
────────────────────────────────────────
2. Auth flow  – CONNECT  
   • server.js already protects all routes with checkJwt; just make sure the AUTH0_AUDIENCE in .env matches the value you pass to Auth0 on the front-end.  
   • If you keep Auth0, the local "/api/users/login" & "/register" endpoints are redundant – either delete them or make them issue JWTs identical to Auth0's.

3. Spoonacular resilience  – CONNECT  
   • spoonacularService: add basic 429 / quota-exceeded retry logic (e.g. exponential back-off) so a single limit-hit does not crash seeding or /discover.  
   • read key from process.env.SPOONACULAR_API_KEY only (no fallback literals).

4. Cascade / clean-up  – CREATE  
   • When a User is deleted also delete (or orphan-check) their GroceryLists / Recipes. A simple pre('remove') hook on User plus Recipe.updateMany({$pull …}) is enough for MVP.

5. ✔ Manual Happy-Path Test script  
   npm run dev → register (Auth0) → POST /api/recipes/discover → POST /api/grocery-lists → verify docs in Mongo.  
   Document this in backend/README.

────────────────────────────────────────
FRONT-END
────────────────────────────────────────
6. Env config  – CREATE  
   • .env.local with VITE_AUTH0_DOMAIN, VITE_AUTH0_CLIENT_ID, VITE_API_URL

7. Replace mock data with live data  – CONNECT  
   • Recipes.tsx currently uses generateRecipes(); swap in a React-Query hook that hits `${API_URL}/api/recipes/discover` (payload already assembled in Onboarding.tsx).  
   • Map the backend schema { _id, title, cookingTime, servingSize, … } to the UI's Recipe interface (name, prepTime, servings, …). Remove RecipeData.ts.

8. Grocery-list integration  – CONNECT  
   • When the user presses "Build Plan" call POST /api/grocery-lists with { recipeIds } and store the returned list instead of the mockGroceryItems array in useMealPlan.ts.

9. Persist auth token  – VERIFY  
   • On every frontend fetch use getAccessTokenSilently() and attach Authorization: Bearer <token>.  Already done in Onboarding.tsx; replicate in new hooks.

10. Minor polish  
    • Fix the audience typo in backend/middleware/auth.js (`https:/mealplannerapi.com` → `https://mealplannerapi.com`).  
    • Show spinner / toast for API errors instead of silent console.log.

────────────────────────────────────────
DEV-OPS / QUALITY
────────────────────────────────────────
11. Single-command bootstrapping  – CREATE  
    • add root-level scripts:  
      "dev:backend": "npm --prefix backend run dev",  
      "dev:frontend": "npm --prefix frontend run dev",  
      "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\""  

12. README  – CONNECT  
    • One README in the repo root that explains "clone → cp .env.example .env → npm i → npm run dev".

Once the twelve items above are checked off you will be able to:

1. `npm run dev`  
2. Sign-up / log-in with Auth0  
3. Walk through onboarding → /recipes (live Spoonacular-backed list)  
4. Choose up to seven recipes, click "Build Plan"  
5. See real grocery list pulled from Mongo in the Grocery-List tab  

With that, the core value loop of the application is complete, meeting the MVP definition your team agreed on.
