// UI categories shown to users
export const UI_CUISINE_CATEGORIES = [
  "African & Caribbean",
  "American", 
  "Asian",
  "European",
  "Latin American",
  "Mediterranean",
  "Middle Eastern",
  "No Preference"
] as const;

// Mapping from UI categories to Spoonacular cuisine types
export const UI_TO_SPOONACULAR_MAP: Record<typeof UI_CUISINE_CATEGORIES[number], string[]> = {
  "African & Caribbean": ["african", "caribbean"],
  "American": ["american"],
  "Asian": ["chinese", "japanese", "korean", "thai", "vietnamese"],
  "European": ["french", "italian", "german", "british"],
  "Latin American": ["mexican", "spanish", "portuguese"],
  "Mediterranean": ["mediterranean", "greek"],
  "Middle Eastern": ["middle eastern", "turkish"],
  "No Preference": []
};

// Reverse mapping from Spoonacular cuisines to UI categories
const SPOONACULAR_TO_UI_MAP: Record<string, typeof UI_CUISINE_CATEGORIES[number]> = {
  // African & Caribbean
  "african": "African & Caribbean",
  "caribbean": "African & Caribbean",
  // American
  "american": "American",
  // Asian
  "chinese": "Asian",
  "japanese": "Asian",
  "korean": "Asian",
  "thai": "Asian",
  "vietnamese": "Asian",
  // European
  "french": "European",
  "italian": "European",
  "german": "European",
  "british": "European",
  // Latin American
  "mexican": "Latin American",
  "spanish": "Latin American",
  "portuguese": "Latin American",
  // Mediterranean
  "mediterranean": "Mediterranean",
  "greek": "Mediterranean",
  // Middle Eastern
  "middle eastern": "Middle Eastern",
  "turkish": "Middle Eastern"
};

// Convert UI categories to Spoonacular cuisines
export function uiToSpoonacularCuisines(uiCategories: string[]): string[] {
  if (uiCategories.includes("No Preference")) {
    return [];
  }
  
  const spoonacularCuisines = new Set<string>();
  uiCategories.forEach(category => {
    const cuisines = UI_TO_SPOONACULAR_MAP[category as typeof UI_CUISINE_CATEGORIES[number]] || [];
    cuisines.forEach(cuisine => spoonacularCuisines.add(cuisine));
  });
  
  return Array.from(spoonacularCuisines);
}

// Convert Spoonacular cuisines to UI categories
export function spoonacularToUICuisines(spoonacularCuisines: string[]): string[] {
  if (!spoonacularCuisines.length) {
    return ["No Preference"];
  }
  
  const uiCategories = new Set<typeof UI_CUISINE_CATEGORIES[number]>();
  spoonacularCuisines.forEach(cuisine => {
    const category = SPOONACULAR_TO_UI_MAP[cuisine.toLowerCase()];
    if (category) {
      uiCategories.add(category);
    }
  });
  
  return Array.from(uiCategories);
} 