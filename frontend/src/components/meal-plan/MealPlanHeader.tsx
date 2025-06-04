
import { Button } from "@/components/ui/button";
import { ChefHat, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MealPlanHeaderProps {
  planDays: number;
}

const MealPlanHeader = ({ planDays }: MealPlanHeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored data and navigate to home
    localStorage.removeItem('selectedRecipes');
    navigate('/');
  };

  return (
    <div className="text-center mb-8">
      <div className="flex justify-between items-start mb-4">
        <Button 
          onClick={() => navigate("/recipes")} 
          variant="outline"
        >
          ← Back to Recipe Selection
        </Button>
        
        <div className="flex-1 flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
        </div>

        <Button 
          onClick={handleLogout}
          variant="outline"
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Weekly Meal Plan</h1>
      <p className="text-gray-600 mb-4">
        Your personalized {planDays}-day meal plan with grocery list
      </p>
    </div>
  );
};

export default MealPlanHeader;