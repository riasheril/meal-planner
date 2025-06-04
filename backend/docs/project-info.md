# Recipe App Project

**Goal:**  
A meal planner that allows users to efficiently explore new recipes and generate a grocery list, within customizable criteria, while avoiding recipe repetition.

---

## Final MVP

- **Demo Deck:** CMU Capstone Group 1 - Demo Deck_01.pptx
- **Deliverable:** 1-week meal plan (3 meals per day, 21 meals total)

---

## Assumptions

- Cooking time
- Dietary restrictions (e.g., vegan, vegetarian)
- Tags (e.g., breakfast, cuisine type)
- Serving size: Family of 4

---

## User Flow

### 1. Log-in & Onboarding

- User completes a survey to determine:
  - Preferred cooking time
  - Dietary restrictions
  - Cuisine type
  - Serving size

### 2. Recipe Selection

- Recipes sourced from a pre-set database (API)
- Onboarding survey responses determine API call/recipe filtering
- Tags include cuisine for flavor profile
- User chooses final list of recipes
- Running list of chosen recipes maintained
- Option to reload/view different suggested recipes
- When 7 recipes are chosen, prompt to generate grocery list

---

## Grocery List Generation

- Generate a grocery list based on selected recipes
- Ignore ingredients the user already owns (user can check off owned items)
- Handle overlapping ingredients (sum quantities, use unique IDs, conversions)

---

## App UI

- **Tab 1:** Recipe cards with all info (web-scraper)
- **Tab 2:** Grocery checklist

---

## Filters

- Cuisine type
- Number of people served
- Cooking time
- Dietary restrictions

---

## Add-ons (Future Features)

- Nutrition info
- Additional cuisine types

---





















































