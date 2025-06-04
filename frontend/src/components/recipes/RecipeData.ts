
export interface Recipe {
    id: number;
    name: string;
    description: string;
    prepTime: string;
    servings: string;
    difficulty: "Easy" | "Medium" | "Hard";
    mealType: "breakfast" | "lunch" | "dinner";
    ingredients: string[];
    instructions: string[];
  }
  
  const recipeTemplates = [
    // Breakfast recipes
    { 
      name: "Avocado Toast with Eggs", 
      description: "Creamy avocado on sourdough with perfectly poached eggs", 
      difficulty: "Easy", 
      mealType: "breakfast",
      ingredients: ["2 slices sourdough bread", "1 ripe avocado", "2 eggs", "Salt and pepper", "Lemon juice"],
      instructions: ["Toast bread slices", "Mash avocado with lemon juice", "Poach eggs", "Spread avocado on toast", "Top with eggs"]
    },
    { 
      name: "Overnight Oats", 
      description: "Nutritious oats soaked overnight with fresh berries", 
      difficulty: "Easy", 
      mealType: "breakfast",
      ingredients: ["1/2 cup rolled oats", "1/2 cup milk", "1 tbsp chia seeds", "1 tbsp honey", "Fresh berries"],
      instructions: ["Mix oats, milk, and chia seeds", "Add honey", "Refrigerate overnight", "Top with berries", "Serve cold"]
    },
    { 
      name: "Greek Yogurt Parfait", 
      description: "Layered yogurt with granola and seasonal fruits", 
      difficulty: "Easy", 
      mealType: "breakfast",
      ingredients: ["1 cup Greek yogurt", "1/4 cup granola", "Mixed berries", "Honey", "Chopped nuts"],
      instructions: ["Layer yogurt in glass", "Add granola", "Top with berries", "Drizzle with honey", "Sprinkle nuts"]
    },
    { 
      name: "Vegetable Scramble", 
      description: "Fluffy eggs scrambled with seasonal vegetables", 
      difficulty: "Easy", 
      mealType: "breakfast",
      ingredients: ["3 eggs", "Bell peppers", "Onions", "Spinach", "Cheese", "Salt and pepper"],
      instructions: ["Chop vegetables", "Scramble eggs", "Add vegetables", "Cook until tender", "Top with cheese"]
    },
    { 
      name: "Smoothie Bowl", 
      description: "Thick smoothie topped with nuts, seeds, and fruit", 
      difficulty: "Easy", 
      mealType: "breakfast",
      ingredients: ["Frozen berries", "Banana", "Greek yogurt", "Granola", "Chia seeds", "Coconut flakes"],
      instructions: ["Blend frozen fruits", "Pour into bowl", "Add toppings", "Arrange decoratively", "Serve immediately"]
    },
    { 
      name: "Pancakes", 
      description: "Fluffy homemade pancakes with maple syrup", 
      difficulty: "Medium", 
      mealType: "breakfast",
      ingredients: ["2 cups flour", "2 eggs", "1.5 cups milk", "Baking powder", "Sugar", "Maple syrup"],
      instructions: ["Mix dry ingredients", "Combine wet ingredients", "Fold together", "Cook on griddle", "Serve with syrup"]
    },
    { 
      name: "French Toast", 
      description: "Classic French toast with cinnamon and vanilla", 
      difficulty: "Medium", 
      mealType: "breakfast",
      ingredients: ["Thick bread slices", "3 eggs", "Milk", "Cinnamon", "Vanilla", "Butter"],
      instructions: ["Beat eggs with milk", "Add cinnamon and vanilla", "Dip bread slices", "Cook in butter", "Serve warm"]
    },
    { 
      name: "Breakfast Burrito", 
      description: "Scrambled eggs, cheese, and vegetables wrapped in tortilla", 
      difficulty: "Medium", 
      mealType: "breakfast",
      ingredients: ["Flour tortillas", "Eggs", "Cheese", "Bell peppers", "Onions", "Salsa"],
      instructions: ["Scramble eggs", "Sauté vegetables", "Warm tortillas", "Fill and wrap", "Serve with salsa"]
    },
  
    // Lunch recipes
    { 
      name: "Mediterranean Salad", 
      description: "Fresh vegetables with feta cheese and olive oil", 
      difficulty: "Easy", 
      mealType: "lunch",
      ingredients: ["Mixed greens", "Tomatoes", "Cucumbers", "Feta cheese", "Olives", "Olive oil"],
      instructions: ["Chop vegetables", "Toss with greens", "Add feta and olives", "Drizzle with oil", "Season and serve"]
    },
    { 
      name: "Grilled Chicken Wrap", 
      description: "Tender chicken with vegetables in a soft tortilla", 
      difficulty: "Medium", 
      mealType: "lunch",
      ingredients: ["Chicken breast", "Tortillas", "Lettuce", "Tomatoes", "Avocado", "Ranch dressing"],
      instructions: ["Grill chicken", "Slice chicken", "Warm tortillas", "Add fillings", "Roll and serve"]
    },
    { 
      name: "Quinoa Bowl", 
      description: "Nutritious quinoa with roasted vegetables and tahini", 
      difficulty: "Easy", 
      mealType: "lunch",
      ingredients: ["Quinoa", "Mixed vegetables", "Tahini", "Lemon juice", "Chickpeas", "Fresh herbs"],
      instructions: ["Cook quinoa", "Roast vegetables", "Make tahini dressing", "Combine in bowl", "Garnish with herbs"]
    },
    { 
      name: "Turkey Sandwich", 
      description: "Artisan bread with turkey, cheese, and fresh vegetables", 
      difficulty: "Easy", 
      mealType: "lunch",
      ingredients: ["Artisan bread", "Turkey slices", "Cheese", "Lettuce", "Tomatoes", "Mayo"],
      instructions: ["Toast bread", "Layer turkey", "Add cheese", "Top with vegetables", "Slice and serve"]
    },
    { 
      name: "Soup and Salad", 
      description: "Seasonal soup paired with a fresh garden salad", 
      difficulty: "Medium", 
      mealType: "lunch",
      ingredients: ["Seasonal vegetables", "Broth", "Mixed greens", "Vinaigrette", "Bread", "Herbs"],
      instructions: ["Prepare soup base", "Add vegetables", "Simmer until tender", "Prepare salad", "Serve together"]
    },
    { 
      name: "Pasta Salad", 
      description: "Cold pasta with vegetables and herb dressing", 
      difficulty: "Easy", 
      mealType: "lunch",
      ingredients: ["Pasta", "Cherry tomatoes", "Bell peppers", "Herbs", "Olive oil", "Vinegar"],
      instructions: ["Cook pasta", "Cool completely", "Chop vegetables", "Make dressing", "Toss and chill"]
    },
    { 
      name: "Buddha Bowl", 
      description: "Colorful bowl with grains, proteins, and vegetables", 
      difficulty: "Medium", 
      mealType: "lunch",
      ingredients: ["Brown rice", "Roasted vegetables", "Protein of choice", "Seeds", "Tahini", "Greens"],
      instructions: ["Cook grains", "Roast vegetables", "Prepare protein", "Arrange in bowl", "Drizzle with dressing"]
    },
    { 
      name: "Caprese Salad", 
      description: "Fresh mozzarella, tomatoes, and basil with balsamic", 
      difficulty: "Easy", 
      mealType: "lunch",
      ingredients: ["Fresh mozzarella", "Tomatoes", "Fresh basil", "Balsamic vinegar", "Olive oil", "Salt"],
      instructions: ["Slice mozzarella", "Slice tomatoes", "Arrange alternating", "Add basil leaves", "Drizzle and season"]
    },
  
    // Dinner recipes
    { 
      name: "Herb-Crusted Salmon", 
      description: "Fresh salmon with herbs and lemon, served with vegetables", 
      difficulty: "Medium", 
      mealType: "dinner",
      ingredients: ["Salmon fillets", "Fresh herbs", "Lemon", "Garlic", "Olive oil", "Seasonal vegetables"],
      instructions: ["Make herb crust", "Season salmon", "Bake with vegetables", "Serve with lemon", "Garnish with herbs"]
    },
    { 
      name: "Chicken Stir-Fry", 
      description: "Tender chicken with mixed vegetables in savory sauce", 
      difficulty: "Medium", 
      mealType: "dinner",
      ingredients: ["Chicken breast", "Mixed vegetables", "Soy sauce", "Garlic", "Ginger", "Rice"],
      instructions: ["Cut chicken and vegetables", "Heat oil in wok", "Stir-fry chicken", "Add vegetables", "Serve over rice"]
    },
    { 
      name: "Beef Tacos", 
      description: "Seasoned ground beef in corn tortillas with fresh toppings", 
      difficulty: "Easy", 
      mealType: "dinner",
      ingredients: ["Ground beef", "Corn tortillas", "Lettuce", "Tomatoes", "Cheese", "Sour cream"],
      instructions: ["Brown ground beef", "Season with spices", "Warm tortillas", "Fill with beef", "Top with garnishes"]
    },
    { 
      name: "Vegetable Curry", 
      description: "Aromatic curry with seasonal vegetables and coconut milk", 
      difficulty: "Medium", 
      mealType: "dinner",
      ingredients: ["Mixed vegetables", "Coconut milk", "Curry powder", "Onions", "Garlic", "Rice"],
      instructions: ["Sauté aromatics", "Add vegetables", "Pour coconut milk", "Simmer with spices", "Serve over rice"]
    },
    { 
      name: "Pasta Primavera", 
      description: "Fresh pasta with seasonal vegetables and parmesan", 
      difficulty: "Easy", 
      mealType: "dinner",
      ingredients: ["Pasta", "Seasonal vegetables", "Parmesan cheese", "Olive oil", "Garlic", "Fresh herbs"],
      instructions: ["Cook pasta", "Sauté vegetables", "Toss with oil", "Add cheese", "Garnish with herbs"]
    },
    { 
      name: "Grilled Portobello", 
      description: "Marinated portobello mushrooms with quinoa and vegetables", 
      difficulty: "Medium", 
      mealType: "dinner",
      ingredients: ["Portobello mushrooms", "Quinoa", "Marinade", "Grilled vegetables", "Fresh herbs", "Lemon"],
      instructions: ["Marinate mushrooms", "Cook quinoa", "Grill mushrooms", "Prepare vegetables", "Plate and serve"]
    },
    { 
      name: "Fish and Chips", 
      description: "Crispy battered fish with homemade potato chips", 
      difficulty: "Hard", 
      mealType: "dinner",
      ingredients: ["White fish", "Potatoes", "Flour", "Beer", "Oil for frying", "Mushy peas"],
      instructions: ["Make batter", "Cut potatoes", "Fry chips", "Batter and fry fish", "Serve hot"]
    },
    { 
      name: "Stuffed Bell Peppers", 
      description: "Bell peppers filled with rice, vegetables, and herbs", 
      difficulty: "Medium", 
      mealType: "dinner",
      ingredients: ["Bell peppers", "Rice", "Ground meat", "Onions", "Herbs", "Cheese"],
      instructions: ["Hollow out peppers", "Cook filling", "Stuff peppers", "Bake until tender", "Top with cheese"]
    },
  ];
  
  const prepTimes = ["25 mins", "30 mins", "35 mins", "40 mins"];
  
  export const generateRecipes = (setNumber: number = 0): Recipe[] => {
    const shuffled = [...recipeTemplates].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 12).map((template, index) => ({
      id: setNumber * 100 + index + 1,
      name: template.name,
      description: template.description,
      prepTime: prepTimes[Math.floor(Math.random() * prepTimes.length)],
      servings: "2",
      difficulty: template.difficulty as "Easy" | "Medium" | "Hard",
      mealType: template.mealType as "breakfast" | "lunch" | "dinner",
      ingredients: template.ingredients,
      instructions: template.instructions,
    }));
  };
  