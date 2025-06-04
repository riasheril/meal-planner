
import { Recipe } from "@/types/meal-plan";

export const mockSelectedRecipes: Recipe[] = [
  {
    id: 1,
    name: "Mediterranean Chickpea Salad",
    description: "Fresh and vibrant salad with chickpeas, cucumber, tomatoes, and feta cheese in a lemon herb dressing.",
    prepTime: "15 min",
    servings: "4",
    difficulty: "Easy",
    mealType: "lunch",
    ingredients: [
      "2 cans chickpeas, drained and rinsed",
      "1 cucumber, diced",
      "1 cup cherry tomatoes, halved",
      "1/2 cup feta cheese, crumbled",
      "1/4 red onion, thinly sliced",
      "2 tbsp olive oil",
      "1 lemon, juiced",
      "2 tsp dried oregano",
      "Salt and pepper to taste"
    ],
    instructions: [
      "In a large bowl, combine chickpeas, cucumber, tomatoes, feta, and red onion.",
      "In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper.",
      "Pour dressing over salad and toss to combine.",
      "Let sit for 10 minutes before serving to allow flavors to meld.",
      "Serve chilled or at room temperature."
    ]
  },
  {
    id: 2,
    name: "Honey Garlic Salmon",
    description: "Pan-seared salmon with a sweet and savory honey garlic glaze, served with steamed vegetables.",
    prepTime: "25 min",
    servings: "4",
    difficulty: "Medium",
    mealType: "dinner",
    ingredients: [
      "4 salmon fillets",
      "3 cloves garlic, minced",
      "1/4 cup honey",
      "2 tbsp soy sauce",
      "1 tbsp olive oil",
      "1 tsp ginger, grated",
      "Salt and pepper to taste",
      "Green onions for garnish"
    ],
    instructions: [
      "Season salmon fillets with salt and pepper.",
      "Heat olive oil in a large skillet over medium-high heat.",
      "Cook salmon for 4-5 minutes per side until golden brown.",
      "In a small bowl, mix honey, soy sauce, garlic, and ginger.",
      "Pour glaze over salmon and cook for 2 more minutes.",
      "Garnish with green onions and serve immediately."
    ]
  },
  {
    id: 3,
    name: "Creamy Mushroom Risotto",
    description: "Rich and creamy arborio rice cooked with wild mushrooms and finished with parmesan cheese.",
    prepTime: "35 min",
    servings: "4",
    difficulty: "Medium",
    mealType: "dinner",
    ingredients: [
      "1 cup arborio rice",
      "4 cups warm chicken broth",
      "1 lb mixed mushrooms, sliced",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "1/2 cup white wine",
      "1/2 cup parmesan cheese, grated",
      "2 tbsp butter",
      "2 tbsp olive oil"
    ],
    instructions: [
      "Heat olive oil in a large pan and sauté mushrooms until golden.",
      "In another pan, melt butter and sauté onion and garlic.",
      "Add rice and stir for 2 minutes until coated.",
      "Add wine and stir until absorbed.",
      "Add warm broth one ladle at a time, stirring constantly.",
      "Cook for 18-20 minutes until rice is creamy.",
      "Stir in mushrooms and parmesan cheese."
    ]
  }
];
