import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface ServingSizeProps {
  selected: number;
  onUpdate: (selected: number) => void;
}

const ServingSize = ({ selected, onUpdate }: ServingSizeProps) => {
  const increment = () => {
    if (selected < 8) {
      onUpdate(selected + 1);
    }
  };

  const decrement = () => {
    if (selected > 1) {
      onUpdate(selected - 1);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-600 text-center">
        How many servings per recipe would you prefer?
      </p>
      
      <div className="flex items-center justify-center">
        <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2 shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={decrement}
            disabled={selected <= 1}
            className="h-12 w-12 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <Minus className="h-5 w-5 text-blue-600" />
          </Button>
          
          <div className="w-16 text-center">
            <span className="text-2xl font-semibold text-gray-900">{selected}</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={increment}
            disabled={selected >= 8}
            className="h-12 w-12 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <Plus className="h-5 w-5 text-blue-600" />
          </Button>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 text-center">
        Choose between 1-8 servings
      </p>
    </div>
  );
};

export default ServingSize;