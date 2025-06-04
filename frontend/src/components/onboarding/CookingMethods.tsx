
import { Button } from "@/components/ui/button";

interface CookingMethodsProps {
  selected: string[];
  onUpdate: (selected: string[]) => void;
}

const CookingMethods = ({ selected, onUpdate }: CookingMethodsProps) => {
  const methodOptions = [
    "Quick & Easy (15-30 min)", "One-Pot Meals", "Slow Cooking", 
    "Baking", "Grilling", "Stir-Frying", "Roasting", 
    "No-Cook/Raw", "Meal Prep Friendly", "Advanced Techniques"
  ];

  const toggleSelection = (method: string) => {
    if (selected.includes(method)) {
      onUpdate(selected.filter(m => m !== method));
    } else {
      onUpdate([...selected, method]);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-center">
        What cooking methods do you prefer or have time for?
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {methodOptions.map((method) => (
          <Button
            key={method}
            variant={selected.includes(method) ? "default" : "outline"}
            onClick={() => toggleSelection(method)}
            className={`h-12 ${
              selected.includes(method) 
                ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                : "hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
            }`}
          >
            {method}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CookingMethods;
