import { useState, useEffect } from "react";
import { Recipe, GroceryItem, MealAssignment, MealStatus } from "@/types/meal-plan";
import { generateMealPlan } from "@/utils/mealPlanGenerator";
import { clearSelectedRecipes } from "@/utils/recipeStorage";
import { useAuth0 } from "@auth0/auth0-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useMealPlan = () => {
  const [selectedRecipeModal, setSelectedRecipeModal] = useState<Recipe | null>(null);
  const [mealStatus, setMealStatus] = useState<MealStatus>({});
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const [weeklyPlan, setWeeklyPlan] = useState<MealAssignment[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  // Load selected recipes from localStorage on component mount
  useEffect(() => {
    const recipes = localStorage.getItem('selectedRecipes');
    setSelectedRecipes(recipes ? JSON.parse(recipes) : []);
  }, []);

  // Re-generate weekly plan and grocery list whenever selected recipes change
  useEffect(() => {
    if (selectedRecipes.length === 0) {
      setWeeklyPlan([]);
      return;
    }

    // 1) Build weekly plan ONCE for these recipes (stable until selection changes)
    setWeeklyPlan(generateMealPlan(selectedRecipes));

    // 2) Generate grocery list from backend
    const syncGroceryList = async () => {
      try {
        const token = await getAccessTokenSilently();
        // Collect ALL recipes used in the weekly plan (breakfast/lunch/dinner)
        const idsSet = new Set<string>();
        weeklyPlan.forEach(day => {
          Object.values(day.meals).forEach(r => { if (r?._id) idsSet.add(r._id); });
        });
        const recipeIds = Array.from(idsSet);
        console.log('[MEALPLAN] Generating grocery list for', recipeIds);
        const res = await fetch(`${API_URL}/api/grocery-lists/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ recipeIds })
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const backendItems = data.groceryList?.items || [];
        const transformed: GroceryItem[] = backendItems.map((item: any, idx: number) => ({
          id: idx + 1,
          name: item.name,
          quantity: (item.quantity ? `${item.quantity} ${item.unit}` : '').trim(),
          category: item.aisle === 'Protein' ? 'Proteins' : (item.aisle || 'Miscellaneous'),
          purchased: !!item.checked,
        }));
        setGroceryItems(transformed);
      } catch (err) {
        console.error('[MEALPLAN] Failed to sync grocery list:', err);
        setGroceryItems([]);
      }
    };

    syncGroceryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRecipes]);

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
