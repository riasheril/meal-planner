import { useState, useEffect } from "react";
import { ChefHat } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
// import { Recipe, generateRecipes } from "@/components/recipes/RecipeData";
import RecipeCard from "@/components/recipes/RecipeCard";
import RecipeFilters from "@/components/recipes/RecipeFilters";
import SelectedRecipesSidebar from "@/components/recipes/SelectedRecipesSidebar";
import CompletionModal from "@/components/recipes/CompletionModal";
import { saveSelectedRecipes } from "@/utils/recipeStorage";
import { Recipe } from "@/types/meal-plan"; // Use your shared type

const Recipes = () => {
  const location = useLocation();
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [recipeSet, setRecipeSet] = useState(0);
  const [mealTypeFilter, setMealTypeFilter] = useState<string>("all");
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  // Use recipes from navigation state if available, otherwise fallback to local data
  // const initialRecipes = (location.state?.recipes && location.state.recipes.length > 0)
  //   ? location.state.recipes
  //   : generateRecipes(0);
  // const [availableRecipes, setAvailableRecipes] = useState<Recipe[]>(initialRecipes);
  const [availableRecipes, setAvailableRecipes] = useState<Recipe[]>([]); // Now fetched from API
  const [loading, setLoading] = useState(true); // Loading state for API

  // Fetch recipes from backend API on mount
  // --- NEW: Fetch from real backend ---
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const token = await getAccessTokenSilently();
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
        // 1. Fetch user preferences
        const prefRes = await fetch(`${API_URL}/api/users/preferences`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const prefData = await prefRes.json();
        const preferences = prefData.preferences || {};

        // 2. Use preferences to fetch recipes
        const response = await fetch(`${API_URL}/api/recipes/discover`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(preferences),
        });
        const data = await response.json();
        setAvailableRecipes(data.recipes || []);
      } catch (error) {
        // TODO: Handle error (show toast, etc.)
        setAvailableRecipes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [location.state]); // Optionally, add dependencies

  // Ensure availableRecipes is always an array
  // const safeAvailableRecipes = Array.isArray(availableRecipes) ? availableRecipes : [];
  const safeAvailableRecipes = Array.isArray(availableRecipes) ? availableRecipes : [];

  // Filter recipes based on meal type
  const filteredRecipes = safeAvailableRecipes.filter(recipe => 
    mealTypeFilter === "all" 
      ? true 
      : recipe.tags.includes(mealTypeFilter)
  );

  console.log("safeAvailableRecipes", safeAvailableRecipes);
  console.log("filteredRecipes", filteredRecipes);

  const toggleRecipe = (recipe: Recipe) => {
    const isAlreadySelected = selectedRecipes.some(r => r._id === recipe._id);
    if (isAlreadySelected) {
      setSelectedRecipes(selectedRecipes.filter(r => r._id !== recipe._id));
    } else if (selectedRecipes.length < 7) {
      const newSelection = [...selectedRecipes, recipe];
      setSelectedRecipes(newSelection);

      // Show modal when 7 recipes are selected
      if (newSelection.length === 7) {
        setShowCompletionModal(true);
      }
    }
  };

  const removeSelectedRecipe = (recipeId: string) => {
    setSelectedRecipes(selectedRecipes.filter(r => r._id !== recipeId));
  };

  // const showMoreRecipes = () => {
  //   const nextSet = recipeSet + 1;
  //   setRecipeSet(nextSet);
  //   // setAvailableRecipes(generateRecipes(nextSet)); // Mock fallback
  // };
  // --- Show more recipes logic may need to be reworked for real API ---

  const handleGoToCalendar = () => {
    console.log("Adding recipes to calendar:", selectedRecipes);
    saveSelectedRecipes(selectedRecipes);
    navigate("/meal-plan");
  };

  const handleChooseDifferent = () => {
    setShowCompletionModal(false);
  };

  const handleBuildPlan = () => {
    console.log("Building plan with selected recipes:", selectedRecipes);
    saveSelectedRecipes(selectedRecipes);
    navigate("/meal-plan");
  };

  // Check if there are more recipes available (simplified logic for now)
  // const hasMoreRecipes = recipeSet < 3; // Allow up to 4 sets of recipes

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Recipes</h1>
          <p className="text-gray-600 mb-4">
            Select 1-7 recipes for your weekly meal plan
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Available Recipes */}
          <div className="lg:col-span-3">
            <RecipeFilters
              mealTypeFilter={mealTypeFilter}
              onMealTypeFilterChange={setMealTypeFilter}
              onShowMoreRecipes={() => {}}
              hasMoreRecipes={false}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredRecipes.map(recipe => {
                const isSelected = selectedRecipes.some(r => r._id === recipe._id);
                const canSelect = selectedRecipes.length < 7 || isSelected;
                return (
                  <RecipeCard
                    key={recipe._id}
                    recipe={recipe}
                    isSelected={isSelected}
                    canSelect={canSelect}
                    onToggle={toggleRecipe}
                  />
                );
              })}
            </div>
          </div>

          {/* Selected Recipes Sidebar */}
          <div className="lg:col-span-1">
            <SelectedRecipesSidebar
              selectedRecipes={selectedRecipes}
              onRemoveRecipe={removeSelectedRecipe}
              onCompleteSelection={() => setShowCompletionModal(true)}
              onBuildPlan={handleBuildPlan}
            />
          </div>
        </div>

        {/* Completion Modal */}
        <CompletionModal
          isOpen={showCompletionModal}
          onClose={() => setShowCompletionModal(false)}
          onGoToCalendar={handleGoToCalendar}
          onChooseDifferent={handleChooseDifferent}
        />
      </div>
    </div>
  );
};

export default Recipes;
