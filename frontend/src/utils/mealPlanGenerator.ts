
import { Recipe, MealAssignment } from "@/types/meal-plan";

export const generateMealPlan = (selectedRecipes: Recipe[]): MealAssignment[] => {
  if (selectedRecipes.length === 0) return [];

  // Generate a meal plan with the same number of days as recipes selected (up to 7 days max)
  const numDays = Math.min(selectedRecipes.length, 7);
  
  console.log(`Generating meal plan for ${selectedRecipes.length} recipes, creating ${numDays} days`);
  
  // Separate breakfast recipes from other recipes
  const breakfastRecipes = selectedRecipes.filter(recipe => recipe.mealType === 'breakfast');
  const otherRecipes = selectedRecipes.filter(recipe => recipe.mealType !== 'breakfast');
  
  // Generate meal assignments for each day
  const weeklyPlan: MealAssignment[] = [];
  
  for (let day = 0; day < numDays; day++) {
    const dayName = `Day${day + 1}`;
    
    // For breakfast, prioritize breakfast recipes if available, otherwise cycle through all recipes
    let breakfastMeal: Recipe;
    if (breakfastRecipes.length > 0) {
      const sourceRecipe = breakfastRecipes[day % breakfastRecipes.length];
      breakfastMeal = { ...sourceRecipe }; // Create a new object to avoid circular references
    } else {
      const sourceRecipe = selectedRecipes[day % selectedRecipes.length];
      breakfastMeal = { ...sourceRecipe }; // Create a new object to avoid circular references
    }
    
    // For lunch and dinner, cycle through all selected recipes
    const lunchSourceRecipe = selectedRecipes[(day * 3 + 1) % selectedRecipes.length];
    const lunchMeal = { ...lunchSourceRecipe }; // Create a new object to avoid circular references
    
    const dinnerSourceRecipe = selectedRecipes[(day * 3 + 2) % selectedRecipes.length];
    const dinnerMeal = { ...dinnerSourceRecipe }; // Create a new object to avoid circular references
    
    weeklyPlan.push({
      day: dayName,
      meals: {
        breakfast: breakfastMeal,
        lunch: lunchMeal,
        dinner: dinnerMeal
      }
    });
  }
  
  console.log(`Generated ${weeklyPlan.length} days in meal plan:`, weeklyPlan);
  return weeklyPlan;
};
