import { Recipe, MealAssignment } from "@/types/meal-plan";

export const generateMealPlan = (selectedRecipes: Recipe[]): MealAssignment[] => {
  if (selectedRecipes.length === 0) return [];

  const numDays = Math.min(selectedRecipes.length, 7);
  const breakfastRecipes = selectedRecipes.filter(r => r.mealType === "breakfast");
  const lunchDinnerRecipes = selectedRecipes.filter(r => r.mealType !== "breakfast");

  // Track how many times each recipe is used
  const recipeUsage: Record<number, number> = {};
  selectedRecipes.forEach(r => { recipeUsage[r.id] = 0; });

  const getNextRecipe = (pool: Recipe[], fallbackPool: Recipe[]) => {
    // Try to find a recipe in pool used < 3 times
    let candidate = pool.find(r => recipeUsage[r.id] < 3);
    if (candidate) return candidate;
    // If none, try fallback pool
    candidate = fallbackPool.find(r => recipeUsage[r.id] < 3);
    if (candidate) return candidate;
    // If still none, return null (shouldn't happen unless not enough recipes)
    return null;
  };

  const plan: MealAssignment[] = [];
  for (let day = 0; day < numDays; day++) {
    const dayName = `Day${day + 1}`;
    let breakfast: Recipe | null = null;
    let lunch: Recipe | null = null;
    let dinner: Recipe | null = null;

    // 1. Breakfast slot
    if (breakfastRecipes.length > 0) {
      breakfast = getNextRecipe(breakfastRecipes, lunchDinnerRecipes);
    } else {
      breakfast = getNextRecipe(lunchDinnerRecipes, breakfastRecipes);
    }
    if (breakfast) recipeUsage[breakfast.id]++;

    // 2. Lunch slot
    if (lunchDinnerRecipes.length > 0) {
      lunch = getNextRecipe(lunchDinnerRecipes, breakfastRecipes);
    } else {
      // fallback to breakfast recipes if no lunch/dinner
      lunch = getNextRecipe(breakfastRecipes, lunchDinnerRecipes);
    }
    // Don't use a breakfast recipe for lunch if we have lunch/dinner recipes
    if (lunch && lunch.mealType === "breakfast" && lunchDinnerRecipes.length > 0) {
      lunch = getNextRecipe(lunchDinnerRecipes, []);
    }
    if (lunch) recipeUsage[lunch.id]++;

    // 3. Dinner slot
    if (lunchDinnerRecipes.length > 0) {
      dinner = getNextRecipe(lunchDinnerRecipes, breakfastRecipes);
    } else {
      dinner = getNextRecipe(breakfastRecipes, lunchDinnerRecipes);
    }
    if (dinner && dinner.mealType === "breakfast" && lunchDinnerRecipes.length > 0) {
      dinner = getNextRecipe(lunchDinnerRecipes, []);
    }
    if (dinner) recipeUsage[dinner.id]++;

    plan.push({
      day: dayName,
      meals: {
        breakfast: breakfast!,
        lunch: lunch!,
        dinner: dinner!,
      },
    });
  }
  return plan;
};
