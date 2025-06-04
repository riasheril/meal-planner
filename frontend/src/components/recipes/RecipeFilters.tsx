
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RefreshCw, Filter } from "lucide-react";

interface RecipeFiltersProps {
  mealTypeFilter: string;
  onMealTypeFilterChange: (value: string) => void;
  onShowMoreRecipes: () => void;
  hasMoreRecipes: boolean;
}

const RecipeFilters = ({ mealTypeFilter, onMealTypeFilterChange, onShowMoreRecipes, hasMoreRecipes }: RecipeFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h2 className="text-xl font-semibold text-gray-900">Available Recipes</h2>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Meal Type Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-600" />
          <ToggleGroup 
            type="single" 
            value={mealTypeFilter} 
            onValueChange={(value) => onMealTypeFilterChange(value || "all")}
            className="bg-white rounded-lg border"
          >
            <ToggleGroupItem value="all" className="px-3 py-2 text-sm">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="breakfast" className="px-3 py-2 text-sm">
              Breakfast
            </ToggleGroupItem>
            <ToggleGroupItem value="lunch" className="px-3 py-2 text-sm">
              Lunch
            </ToggleGroupItem>
            <ToggleGroupItem value="dinner" className="px-3 py-2 text-sm">
              Dinner
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <Button 
          onClick={onShowMoreRecipes} 
          variant="outline" 
          className="flex items-center gap-2"
          disabled={!hasMoreRecipes}
        >
          <RefreshCw className="w-4 h-4" />
          Show More Recipes
        </Button>
      </div>
    </div>
  );
};

export default RecipeFilters;
