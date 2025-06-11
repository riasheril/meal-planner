import { Recipe } from "@/types/meal-plan";

// Define UI categories that will be displayed to users
export type UITagCategory = "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Other" | "DoNotShow";

// UI categories shown to users
export const UI_TAG_CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
  "Other",
  "DoNotShow"
] as const;

// Mapping from Spoonacular tags to our UI categories
export const SPOONACULAR_TO_UI_MAP: Record<string, UITagCategory[]> = {
  // Breakfast category
  "breakfast": ["Breakfast"],
  "beverage": ["Breakfast"], // when combined with breakfast
  
  // Lunch/Dinner category
  "main course": ["Lunch", "Dinner"],
  "side dish": ["Lunch", "Dinner"],
  "salad": ["Lunch", "Dinner"],
  "soup": ["Lunch", "Dinner"],
  "appetizer": ["Dinner"],
  
  // Snack category
  "snack": ["Snack"],
  "fingerfood": ["Snack"],
  
  // Other category
  "bread": ["Other"],
  "dessert": ["Other"],
  "drink": ["Other"],
  
  // DoNotShow category (handled by filtering)
  "sauce": ["DoNotShow"],
  "marinade": ["DoNotShow"]
};

// Convert Spoonacular tags to UI categories
export function spoonacularToUICategories(spoonacularTags: string[] | undefined): UITagCategory[] {
  if (!spoonacularTags || !spoonacularTags.length) {
    return ["Other"];
  }
  
  const uiCategories = new Set<UITagCategory>();
  
  spoonacularTags.forEach(tag => {
    const categories = SPOONACULAR_TO_UI_MAP[tag.toLowerCase()];
    if (categories) {
      categories.forEach(category => uiCategories.add(category));
    }
  });
  
  return Array.from(uiCategories);
}

// Get the primary category for a recipe (used for display purposes)
export function getPrimaryCategory(recipe: Recipe): UITagCategory {
  const categories = spoonacularToUICategories(recipe.tags);
  
  // If no categories found, return "Other"
  if (categories.length === 0) {
    return "Other";
  }

  // Define priority order for categories
  const priorityOrder: UITagCategory[] = ["Breakfast", "Lunch", "Dinner", "Snack", "Other", "DoNotShow"];
  
  // Find the highest priority category that exists in the recipe's categories
  return categories.reduce((highestPriority, currentCategory) => {
    const currentPriority = priorityOrder.indexOf(currentCategory);
    const highestPriorityIndex = priorityOrder.indexOf(highestPriority);
    return currentPriority < highestPriorityIndex ? currentCategory : highestPriority;
  }, categories[0]); // Use first category as initial value
} 