
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ShoppingCart } from "lucide-react";
import WeeklyCalendar from "@/components/meal-plan/WeeklyCalendar";
import GroceryList from "@/components/meal-plan/GroceryList";
import RecipeModal from "@/components/meal-plan/RecipeModal";
import MealPlanHeader from "@/components/meal-plan/MealPlanHeader";
import { useMealPlan } from "@/hooks/useMealPlan";

const MealPlan = () => {
  const {
    selectedRecipeModal,
    setSelectedRecipeModal,
    mealStatus,
    groceryItems,
    weeklyPlan,
    toggleGroceryItem,
    updateMealStatus
  } = useMealPlan();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50 p-4">
      <div className="container mx-auto max-w-7xl">
        <MealPlanHeader planDays={weeklyPlan.length} />

        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Weekly Calendar
            </TabsTrigger>
            <TabsTrigger value="grocery" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Grocery List
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <WeeklyCalendar 
              weeklyPlan={weeklyPlan}
              mealStatus={mealStatus}
              onMealClick={setSelectedRecipeModal}
              onStatusUpdate={updateMealStatus}
            />
          </TabsContent>

          <TabsContent value="grocery">
            <GroceryList 
              groceryItems={groceryItems}
              onToggleItem={toggleGroceryItem}
            />
          </TabsContent>
        </Tabs>

        <RecipeModal 
          recipe={selectedRecipeModal}
          onClose={() => setSelectedRecipeModal(null)}
        />
      </div>
    </div>
  );
};

export default MealPlan;
