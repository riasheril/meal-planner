
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { GroceryItem } from "@/types/meal-plan";

interface GroceryListProps {
  groceryItems: GroceryItem[];
  onToggleItem: (id: number) => void;
}

const GroceryList = ({ groceryItems, onToggleItem }: GroceryListProps) => {
  const purchasedCount = groceryItems.filter(item => item.purchased).length;
  const totalCount = groceryItems.length;
  const progressPercentage = (purchasedCount / totalCount) * 100;

  const groupedGroceries = groceryItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, GroceryItem[]>);

  const categoryConfig = {
    "Proteins": { emoji: "🥩" },
    "Vegetables": { emoji: "🥬" },
    "Pantry": { emoji: "🏺" },
    "Dairy": { emoji: "🧀" },
    "Produce": { emoji: "🥬" },
    "Meat/Fish": { emoji: "🥩" },
    "Bakery": { emoji: "🍞" }
  };

  // Sort categories by number of items to optimize layout
  const sortedCategories = Object.entries(groupedGroceries).sort((a, b) => b[1].length - a[1].length);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Shopping Progress</h3>
          <span className="text-sm text-gray-600">
            {purchasedCount} of {totalCount} items
          </span>
        </div>
        <Progress value={progressPercentage} className="h-3" />
        <p className="text-sm text-gray-600 mt-2">
          {progressPercentage.toFixed(0)}% complete
        </p>
      </div>

      {/* Masonry-style Grid Layout for Grocery Categories */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {sortedCategories.map(([category, items]) => {
          const config = categoryConfig[category as keyof typeof categoryConfig] || categoryConfig.Pantry;
          return (
            <div 
              key={category}
              className="p-6 rounded-xl border border-gray-200 bg-white break-inside-avoid"
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{config.emoji}</span>
                <h4 className="font-semibold text-lg text-gray-900">
                  {category}
                </h4>
                <span className="ml-auto text-sm text-gray-500">
                  {items.length} items
                </span>
              </div>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-start justify-between py-2"
                  >
                    <div className="flex items-start flex-1">
                      <Checkbox
                        checked={item.purchased}
                        onCheckedChange={() => onToggleItem(item.id)}
                        className="mt-1 mr-4"
                      />
                      <div className="flex-1">
                        <div className={`font-medium ${item.purchased ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {item.name}
                        </div>
                        {item.usedIn && (
                          <div className="text-xs text-gray-500 mt-1 flex items-center">
                            <span className="mr-1">⚪</span>
                            {item.usedIn.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`text-right text-sm font-medium ${item.purchased ? 'text-gray-500' : 'text-gray-700'}`}>
                      {item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroceryList;
