
import { Recipe } from "@/types/meal-plan";

const SELECTED_RECIPES_KEY = 'selectedRecipes';

export const saveSelectedRecipes = (recipes: Recipe[]): void => {
  localStorage.setItem(SELECTED_RECIPES_KEY, JSON.stringify(recipes));
};

export const getSelectedRecipes = (): Recipe[] => {
  const stored = localStorage.getItem(SELECTED_RECIPES_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error parsing selected recipes from localStorage:', error);
    return [];
  }
};

export const clearSelectedRecipes = (): void => {
  localStorage.removeItem(SELECTED_RECIPES_KEY);
};
