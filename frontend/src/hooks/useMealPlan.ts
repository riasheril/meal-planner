
import { useState, useEffect } from "react";
import { Recipe, GroceryItem, MealAssignment, MealStatus } from "@/types/meal-plan";
import { generateMealPlan } from "@/utils/mealPlanGenerator";
import { getSelectedRecipes } from "@/utils/recipeStorage";
import { mockGroceryItems } from "@/data/mockGroceryItems";

export const useMealPlan = () => {
  const [selectedRecipeModal, setSelectedRecipeModal] = useState<Recipe | null>(null);
  const [mealStatus, setMealStatus] = useState<MealStatus>({});
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(mockGroceryItems);
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);

  // Load selected recipes from localStorage on component mount
  useEffect(() => {
    const recipes = getSelectedRecipes();
    setSelectedRecipes(recipes);
  }, []);

  const weeklyPlan: MealAssignment[] = generateMealPlan(selectedRecipes);

  const toggleGroceryItem = (id: number) => {
    setGroceryItems(items => 
      items.map(item => 
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  const updateMealStatus = (day: string, mealType: string, status: 'completed' | 'skipped') => {
    const mealKey = `${day}-${mealType}`;
    setMealStatus(prev => ({
      ...prev,
      [mealKey]: prev[mealKey] === status ? null : status
    }));
  };

  return {
    selectedRecipeModal,
    setSelectedRecipeModal,
    mealStatus,
    groceryItems,
    weeklyPlan,
    toggleGroceryItem,
    updateMealStatus
  };
};
