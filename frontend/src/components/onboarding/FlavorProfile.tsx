
import { Button } from "@/components/ui/button";

interface FlavorProfileProps {
  selected: string[];
  onUpdate: (selected: string[]) => void;
}

const FlavorProfile = ({ selected, onUpdate }: FlavorProfileProps) => {
  const flavorOptions = [
    "Spicy", "Sweet", "Savory", "Tangy", "Mild", "Bold", 
    "Fresh", "Smoky", "Herbal", "Citrusy", "Rich", "Light"
  ];

  const toggleSelection = (flavor: string) => {
    if (selected.includes(flavor)) {
      onUpdate(selected.filter(f => f !== flavor));
    } else {
      onUpdate([...selected, flavor]);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-center">
        Choose the flavor profiles that appeal to you (select multiple):
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {flavorOptions.map((flavor) => (
          <Button
            key={flavor}
            variant={selected.includes(flavor) ? "default" : "outline"}
            onClick={() => toggleSelection(flavor)}
            className={`h-12 ${
              selected.includes(flavor) 
                ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                : "hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
            }`}
          >
            {flavor}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FlavorProfile;
