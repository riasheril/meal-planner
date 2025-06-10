import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Recipe } from "./RecipeData";

interface SelectedRecipesSidebarProps {
  selectedRecipes: Recipe[];
  onRemoveRecipe: (recipeId: string) => void;
  onCompleteSelection: () => void;
  onBuildPlan: () => void;
}

const SelectedRecipesSidebar = ({ selectedRecipes, onRemoveRecipe, onCompleteSelection, onBuildPlan }: SelectedRecipesSidebarProps) => {
  return (
    <div className="sticky top-4">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Selected Recipes ({selectedRecipes.length}/7)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedRecipes.length === 0 ? (
            <p className="text-gray-500 text-sm">No recipes selected yet</p>
          ) : (
            <div className="space-y-3">
              {selectedRecipes.map((recipe) => (
                <div key={recipe._id} className="flex items-start justify-between p-3 bg-emerald-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{recipe.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{recipe.cookingTime} mins • {recipe.servingSize} servings</p>
                  </div>
                  <button 
                    onClick={() => onRemoveRecipe(recipe._id)} 
                    className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-4 space-y-2">
            {selectedRecipes.length >= 1 && selectedRecipes.length < 7 && (
              <button 
                onClick={onBuildPlan} 
                className="w-full p-3 border-2 border-emerald-600 bg-white text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all duration-200 font-medium"
              >
                Build Plan
              </button>
            )}
            
            {selectedRecipes.length === 7 && (
              <Button 
                onClick={onCompleteSelection} 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Complete Selection
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectedRecipesSidebar;