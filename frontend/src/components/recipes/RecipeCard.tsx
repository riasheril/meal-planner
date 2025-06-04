
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, Check } from "lucide-react";
import { Recipe } from "./RecipeData";

interface RecipeCardProps {
  recipe: Recipe;
  isSelected: boolean;
  canSelect: boolean;
  onToggle: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, isSelected, canSelect, onToggle }: RecipeCardProps) => {
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
          {recipe.name}
        </CardTitle>
        <CardDescription className="text-gray-600 text-sm">
          {recipe.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {recipe.prepTime}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {recipe.servings}
          </div>
          <div className="px-2 py-1 bg-gray-100 rounded text-xs">
            {recipe.difficulty}
          </div>
        </div>
        <div className="flex justify-end">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            recipe.mealType === 'breakfast' ? 'bg-yellow-100 text-yellow-800' :
            recipe.mealType === 'lunch' ? 'bg-blue-100 text-blue-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {recipe.mealType.charAt(0).toUpperCase() + recipe.mealType.slice(1)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
