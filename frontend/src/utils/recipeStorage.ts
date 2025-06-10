import { Recipe } from "@/types/meal-plan";

const SELECTED_RECIPES_KEY = 'selectedRecipes';

export const clearSelectedRecipes = (): void => {
  localStorage.removeItem(SELECTED_RECIPES_KEY);
};
