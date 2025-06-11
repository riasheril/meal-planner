import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, Check } from "lucide-react";
import { Recipe } from "@/types/meal-plan";
import { spoonacularToUICategories, getPrimaryCategory } from "@/utils/tagMapping";

interface RecipeCardProps {
  recipe: Recipe;
  isSelected: boolean;
  canSelect: boolean;
  onToggle: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, isSelected, canSelect, onToggle }: RecipeCardProps) => {
  // Get all categories for this recipe and sort them alphabetically
  const categories = spoonacularToUICategories(recipe.tags).sort();
  // Take first 3 categories
  const displayCategories = categories.slice(0, 3);

  // Map categories to their styling
  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'Breakfast':
        return 'bg-yellow-100 text-yellow-800';
      case 'Lunch':
        return 'bg-blue-100 text-blue-800';
      case 'Dinner':
        return 'bg-purple-100 text-purple-800';
      case 'Snack':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 ${
        isSelected 
          ? "ring-2 ring-emerald-500 bg-emerald-50" 
          : canSelect 
            ? "hover:shadow-md" 
            : "opacity-50 cursor-not-allowed"
      }`} 
      onClick={() => canSelect && onToggle(recipe)}
    >
      <CardHeader className="relative pb-2">
        {isSelected && (
          <div className="absolute top-4 right-4 w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
        <CardTitle className="text-lg font-semibold text-gray-900 pr-8">
          {recipe.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* Cooking time and servings row */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {recipe.cookingTime} mins
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {recipe.servingSize}
            </div>
          </div>

          {/* Tags row */}
          <div className="flex flex-wrap gap-2">
            {displayCategories.map((category, index) => (
              <span 
                key={index}
                className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryStyle(category)}`}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
