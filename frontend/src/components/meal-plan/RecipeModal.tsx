import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";
import { Recipe } from "@/types/meal-plan";

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

const RecipeModal = ({ recipe, onClose }: RecipeModalProps) => {
  return (
    <Dialog open={!!recipe} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        {recipe && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {recipe.title}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Recipe Info */}
              <div className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-lg">
                {recipe.sourceUrl && (
                  <a
                    href={recipe.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 underline mx-4 whitespace-nowrap hover:text-emerald-800 transition-colors"
                  >
                    View Original Recipe
                  </a>
                )}
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {recipe.cookingTime} mins
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {recipe.servingSize} servings
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Ingredients</h4>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={ingredient._id || index} className="flex items-start">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">
                        {ingredient.quantity ? `${ingredient.quantity} ` : ''}{ingredient.unit ? `${ingredient.unit} ` : ''}{ingredient.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Instructions</h4>
                <ol className="space-y-3">
                  {recipe.instructions.map((step, idx) => (
                    <li key={step._id || idx} className="flex items-center">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-gray-700">{step.text}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={onClose} variant="outline">
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RecipeModal;
