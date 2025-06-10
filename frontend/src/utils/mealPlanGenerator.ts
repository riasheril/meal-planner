import { Recipe, MealAssignment } from "@/types/meal-plan";

// Three meals per day
const MEALS_PER_DAY = ["breakfast", "lunch", "dinner"];
const MAX_RECIPE_USAGE = 3;

// Shuffle helper to randomize recipe order once
const shuffleArray = <T>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const generateMealPlan = (selectedRecipes: Recipe[]): MealAssignment[] => {
  if (selectedRecipes.length === 0) return [];

  const numDays = Math.min(selectedRecipes.length, 7);

  // Track global recipe usage
  const recipeUsage: Record<string, number> = {};
  selectedRecipes.forEach(r => { recipeUsage[r._id] = 0; });

  // Split recipes into pools
  const breakfastRecipes = selectedRecipes.filter(r => r.tags.includes("breakfast"));
  const otherRecipes = selectedRecipes.filter(r => !r.tags.includes("breakfast"));

  // Shuffle pools to avoid fixed order bias
  const shuffledBreakfastRecipes = shuffleArray(breakfastRecipes);
  const shuffledOtherRecipes = shuffleArray(otherRecipes);

  // Helper function to pick next recipe with proper fallback behavior
  const getNextRecipe = (
    mealType: string,
    recipes: Recipe[],
    fallbackRecipes: Recipe[],
    usedToday: Set<string>
  ): Recipe | null => {
    // Step 1: Prefer unused recipe of preferred type (avoid repeats in day if possible)
    const isValidStrict = (r: Recipe) =>
      recipeUsage[r._id] < MAX_RECIPE_USAGE &&
      !usedToday.has(r._id) &&
      (mealType !== "breakfast" ? !r.tags.includes("breakfast") : true);

    let pool = recipes.find(isValidStrict) || fallbackRecipes.find(isValidStrict);

    // Step 2: If none found, allow repeat within day if needed, still respecting meal type
    if (!pool) {
      const isValidRelaxed = (r: Recipe) =>
        recipeUsage[r._id] < MAX_RECIPE_USAGE &&
        (mealType !== "breakfast" ? !r.tags.includes("breakfast") : true);

      pool = recipes.find(isValidRelaxed) || fallbackRecipes.find(isValidRelaxed);
    }

    // Step 3: If still none, allow any recipe regardless of tag (last resort)
    if (!pool) {
      const isValidAny = (r: Recipe) =>
        recipeUsage[r._id] < MAX_RECIPE_USAGE;

      pool = recipes.find(isValidAny) || fallbackRecipes.find(isValidAny);
    }

    return pool || null;
  };

  const plan: MealAssignment[] = [];

  // Build plan day by day
  for (let day = 0; day < numDays; day++) {
    const usedToday = new Set<string>(); // Track used recipes for this day
    const meals: Record<string, Recipe> = {};

    // Iterate over meal slots
    MEALS_PER_DAY.forEach(mealType => {
      const primaryPool = mealType === "breakfast" ? shuffledBreakfastRecipes : shuffledOtherRecipes;
      const fallbackPool = mealType === "breakfast" ? shuffledOtherRecipes : shuffledBreakfastRecipes;

      const recipe = getNextRecipe(mealType, primaryPool, fallbackPool, usedToday);

      if (recipe) {
        recipeUsage[recipe._id]++;
        usedToday.add(recipe._id);
        meals[mealType] = recipe;
      }
    });

    // Save day's meal assignment
    plan.push({
      day: `Day${day + 1}`,
      meals: {
        breakfast: meals.breakfast,
        lunch: meals.lunch,
        dinner: meals.dinner
      }
    });
  }

  return plan;
};