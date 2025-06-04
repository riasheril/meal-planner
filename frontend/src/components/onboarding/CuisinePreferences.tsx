
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CuisinePreferencesProps {
  selected: string[];
  onUpdate: (selected: string[]) => void;
}

const CuisinePreferences = ({ selected, onUpdate }: CuisinePreferencesProps) => {
  const cuisineOptions = [
    "African & Caribbean",
    "American", 
    "Asian",
    "European",
    "Latin American",
    "Mediterranean",
    "Middle Eastern",
    "No Preference"
  ];

  const toggleSelection = (cuisine: string) => {
    if (selected.includes(cuisine)) {
      onUpdate(selected.filter(c => c !== cuisine));
    } else {
      onUpdate([...selected, cuisine]);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-center">
        Select the cuisines that appeal to you (select at least one):
      </p>
      
      <ScrollArea className="h-80 w-full rounded-md border p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cuisineOptions.map((cuisine) => (
            <Button
              key={cuisine}
              variant={selected.includes(cuisine) ? "default" : "outline"}
              onClick={() => toggleSelection(cuisine)}
              className={`h-12 ${
                selected.includes(cuisine) 
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                  : "hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
              }`}
            >
              {cuisine}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CuisinePreferences;
