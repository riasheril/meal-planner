import { Clock, Check, X } from "lucide-react";
import { MealAssignment, MealStatus, Recipe } from "@/types/meal-plan";

interface WeeklyCalendarProps {
  weeklyPlan: MealAssignment[];
  mealStatus: MealStatus;
  onMealClick: (recipe: Recipe) => void;
  onStatusUpdate: (day: string, mealType: string, status: 'completed' | 'skipped') => void;
}

const WeeklyCalendar = ({ weeklyPlan, mealStatus, onMealClick, onStatusUpdate }: WeeklyCalendarProps) => {
  const getMealKey = (day: string, mealType: string) => `${day}-${mealType}`;

  return (
    <>
      {/* Calendar Grid Header */}
      <div className={`grid gap-4 mb-4`} style={{gridTemplateColumns: `repeat(${weeklyPlan.length}, minmax(0, 1fr))`}}>
        {weeklyPlan.map((dayPlan, index) => (
          <div key={dayPlan.day} className="text-center font-semibold text-gray-600 p-2">
            DAY {index + 1}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className={`grid gap-4 min-h-[600px]`} style={{gridTemplateColumns: `repeat(${weeklyPlan.length}, minmax(0, 1fr))`}}>
        {weeklyPlan.map((dayPlan) => (
          <div key={dayPlan.day} className="flex flex-col space-y-4">
            {Object.entries(dayPlan.meals).map(([mealType, recipe]) => {
              const mealKey = getMealKey(dayPlan.day, mealType);
              const status = mealStatus[mealKey];
              
              return (
                <div 
                  key={mealKey}
                  className={`group relative border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md h-32 ${
                    status === 'completed' ? 'border-green-400 bg-green-50' :
                    status === 'skipped' ? 'border-red-400 bg-red-50' :
                    'border-gray-200 bg-white'
                  }`}
                >
                  {/* Meal Status Icons - Only visible on hover */}
                  <div className="absolute top-2 right-2 gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStatusUpdate(dayPlan.day, mealType, 'completed');
                      }}
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                        status === 'completed' 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-200 hover:bg-green-200'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStatusUpdate(dayPlan.day, mealType, 'skipped');
                      }}
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                        status === 'skipped' 
                          ? 'bg-red-600 text-white' 
                          : 'bg-gray-200 hover:bg-red-200'
                      }`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  <div 
                    onClick={() => recipe && onMealClick(recipe)}
                    className="h-full p-4 flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide mb-2">
                        {mealType}
                      </p>
                      <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-relaxed">
                        {recipe?.title || <span className="text-gray-400 italic">No recipe</span>}
                      </h4>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-auto">
                      <Clock className="w-3 h-3 mr-1" />
                      {recipe?.cookingTime ? `${recipe.cookingTime} mins` : "--"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default WeeklyCalendar;