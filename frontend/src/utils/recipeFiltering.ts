import { Recipe } from "@/types/meal-plan";
import { spoonacularToUICategories } from "./tagMapping";

/**
 * Filters out recipes that should not be shown (sauces, marinades) and removes duplicates
 * @param recipes Array of recipes to filter
 * @returns Filtered array of recipes
 */
export function filterRecipes(recipes: Recipe[]): Recipe[] {
  // First, filter out recipes that should not be shown
  const filteredRecipes = recipes.filter(recipe => {
    const categories = spoonacularToUICategories(recipe.tags);
    return !categories.includes("DoNotShow");
  });

  // Then, remove duplicates based on apiId
  const uniqueRecipes = new Map<string, Recipe>();
  filteredRecipes.forEach(recipe => {
    if (!uniqueRecipes.has(recipe.apiId)) {
      uniqueRecipes.set(recipe.apiId, recipe);
    }
  });

  return Array.from(uniqueRecipes.values());
}

/**
 * Checks if a recipe should be shown (not a sauce or marinade)
 * @param recipe Recipe to check
 * @returns boolean indicating if the recipe should be shown
 */
export function shouldShowRecipe(recipe: Recipe): boolean {
  const categories = spoonacularToUICategories(recipe.tags);
  return !categories.includes("DoNotShow");
}

/**
 * Checks if a recipe is a duplicate of any recipe in the provided array
 * @param recipe Recipe to check
 * @param existingRecipes Array of existing recipes
 * @returns boolean indicating if the recipe is a duplicate
 */
export function isDuplicateRecipe(recipe: Recipe, existingRecipes: Recipe[]): boolean {
  return existingRecipes.some(existing => existing.apiId === recipe.apiId);
} 