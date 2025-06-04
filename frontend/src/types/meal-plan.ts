
export interface Recipe {
    id: number;
    name: string;
    description: string;
    prepTime: string;
    servings: string;
    difficulty: string;
    mealType?: "breakfast" | "lunch" | "dinner";
    ingredients: string[];
    instructions: string[];
  }
  
  export interface GroceryItem {
    id: number;
    name: string;
    category: string;
    purchased: boolean;
    quantity?: string;
    usedIn?: string[];
  }
  
  export interface MealAssignment {
    day: string;
    meals: {
      breakfast: Recipe;
      lunch: Recipe;
      dinner: Recipe;
    };
  }
  
  export interface MealStatus {
    [key: string]: 'completed' | 'skipped' | null;
  }
  