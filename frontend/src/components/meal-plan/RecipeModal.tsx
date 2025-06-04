
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
                {recipe.name}
              </DialogTitle>
              <DialogDescription>
                {recipe.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Recipe Info */}
              <div className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {recipe.prepTime}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {recipe.servings} servings
                </div>
                <div className="px-2 py-1 bg-white rounded text-xs border">
                  {recipe.difficulty}
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Ingredients</h4>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Instructions</h4>
                <ol className="space-y-3">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{instruction}</span>
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
