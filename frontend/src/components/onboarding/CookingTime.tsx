
import { Button } from "@/components/ui/button";

interface CookingTimeProps {
  selected: string;
  onUpdate: (selected: string) => void;
}

const CookingTime = ({ selected, onUpdate }: CookingTimeProps) => {
  const timeOptions = [
    { label: "Hangry (20 mins or less)", value: "Hangry", emoji: "😡" },
    { label: "Hungry (20 - 40 mins)", value: "Hungry", emoji: "😊" },
    { label: "Patient (40 mins or more)", value: "Patient", emoji: "😇" }
  ];

  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-center">
        How much time do you usually have for cooking?
      </p>
      
      <div className="grid grid-cols-1 gap-3">
        {timeOptions.map((option) => (
          <Button
            key={option.value}
            variant={selected === option.value ? "default" : "outline"}
            onClick={() => onUpdate(option.value)}
            className={`h-16 text-left ${
              selected === option.value 
                ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                : "hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{option.emoji}</span>
              <span>{option.label}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CookingTime;
