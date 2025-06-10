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
  console.log('RecipeCard received recipe:', recipe);

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
        <div className="mt-6 flex flex-col gap-8">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              recipe.tags.includes('breakfast') ? 'bg-yellow-100 text-yellow-800' :
              recipe.tags.includes('lunch') ? 'bg-blue-100 text-blue-800' :
              recipe.tags.includes('dinner') ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {recipe.tags.includes('breakfast') ? 'Breakfast' :
               recipe.tags.includes('lunch') ? 'Lunch' :
               recipe.tags.includes('dinner') ? 'Dinner' : 'Other'}
            </span>
            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {recipe.cookingTime} mins
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {recipe.servingSize}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
