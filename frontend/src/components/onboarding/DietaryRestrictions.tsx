import { Button } from "@/components/ui/button";

interface DietaryRestrictionsProps {
  selected: string[];
  onUpdate: (selected: string[]) => void;
}

const DietaryRestrictions = ({ selected, onUpdate }: DietaryRestrictionsProps) => {
  const restrictionOptions = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30",
    "No Restrictions"
  ];

  const toggleSelection = (restriction: string) => {
    const restrictionFormatted = restriction.toLowerCase().replace(/\s+/g, '-');
    
    // Special handling for "No Restrictions"
    if (restriction === "No Restrictions") {
      if (selected.includes(restrictionFormatted)) {
        // If "No Restrictions" is being deselected, just remove it
        onUpdate(selected.filter(r => r !== restrictionFormatted));
      } else {
        // If "No Restrictions" is being selected, clear all other restrictions
        onUpdate([restrictionFormatted]);
      }
      return;
    }
    
    // For other restrictions
    if (selected.includes(restrictionFormatted)) {
      // Remove this restriction and "No Restrictions" if it exists
      onUpdate(selected.filter(r => r !== restrictionFormatted && r !== 'no-restrictions'));
    } else {
      // Add this restriction and remove "No Restrictions" if it exists
      onUpdate([...selected.filter(r => r !== 'no-restrictions'), restrictionFormatted]);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-center">
        Select any dietary restrictions or preferences you have:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {restrictionOptions.map((restriction) => (
          <Button
            key={restriction}
            variant={selected.includes(restriction.toLowerCase().replace(/\s+/g, '-')) ? "default" : "outline"}
            onClick={() => toggleSelection(restriction)}
            className={`h-12 ${
              selected.includes(restriction.toLowerCase().replace(/\s+/g, '-')) 
                ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                : "hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
            }`}
          >
            {restriction}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DietaryRestrictions;
