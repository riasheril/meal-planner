export interface Recipe {
    id: number;
    name: string;
    description: string;
    prepTime: string;
    servings: string;
    mealType: "breakfast" | "lunch" | "dinner";
    ingredients: string[];
    instructions: string[];
}
  
const recipeTemplates = [
    // Breakfast recipes
    { 
      name: "Avocado Toast with Eggs", 
      description: "Creamy avocado on sourdough with perfectly poached eggs", 
      mealType: "breakfast",
      ingredients: ["2 slices sourdough bread", "1 ripe avocado", "2 eggs", "Salt and pepper", "Lemon juice"],
      instructions: ["Toast bread slices", "Mash avocado with lemon juice", "Poach eggs", "Spread avocado on toast", "Top with eggs"]
    },
    { 
      name: "Overnight Oats", 
      description: "Nutritious oats soaked overnight with fresh berries", 
      mealType: "breakfast",
      ingredients: ["1/2 cup rolled oats", "1/2 cup milk", "1 tbsp chia seeds", "1 tbsp honey", "Fresh berries"],
      instructions: ["Mix oats, milk, and chia seeds", "Add honey", "Refrigerate overnight", "Top with berries", "Serve cold"]
    },
    { 
      name: "Greek Yogurt Parfait", 
      description: "Layered yogurt with granola and seasonal fruits", 
      mealType: "breakfast",
      ingredients: ["1 cup Greek yogurt", "1/4 cup granola", "Mixed berries", "Honey", "Chopped nuts"],
      instructions: ["Layer yogurt in glass", "Add granola", "Top with berries", "Drizzle with honey", "Sprinkle nuts"]
    },
    { 
      name: "Vegetable Scramble", 
      description: "Fluffy eggs scrambled with seasonal vegetables", 
      mealType: "breakfast",
      ingredients: ["3 eggs", "Bell peppers", "Onions", "Spinach", "Cheese", "Salt and pepper"],
      instructions: ["Chop vegetables", "Scramble eggs", "Add vegetables", "Cook until tender", "Top with cheese"]
    },
    { 
      name: "Smoothie Bowl", 
      description: "Thick smoothie topped with nuts, seeds, and fruit", 
      mealType: "breakfast",
      ingredients: ["Frozen berries", "Banana", "Greek yogurt", "Granola", "Chia seeds", "Coconut flakes"],
      instructions: ["Blend frozen fruits", "Pour into bowl", "Add toppings", "Arrange decoratively", "Serve immediately"]
    },
    { 
      name: "Pancakes", 
      description: "Fluffy homemade pancakes with maple syrup", 
      mealType: "breakfast",
      ingredients: ["2 cups flour", "2 eggs", "1.5 cups milk", "Baking powder", "Sugar", "Maple syrup"],
      instructions: ["Mix dry ingredients", "Combine wet ingredients", "Fold together", "Cook on griddle", "Serve with syrup"]
    },
    { 
      name: "French Toast", 
      description: "Classic French toast with cinnamon and vanilla", 
      mealType: "breakfast",
      ingredients: ["Thick bread slices", "3 eggs", "Milk", "Cinnamon", "Vanilla", "Butter"],
      instructions: ["Beat eggs with milk", "Add cinnamon and vanilla", "Dip bread slices", "Cook in butter", "Serve warm"]
    },
    { 
      name: "Breakfast Burrito", 
      description: "Scrambled eggs, cheese, and vegetables wrapped in tortilla", 
      mealType: "breakfast",
      ingredients: ["Flour tortillas", "Eggs", "Cheese", "Bell peppers", "Onions", "Salsa"],
      instructions: ["Scramble eggs", "Sauté vegetables", "Warm tortillas", "Fill and wrap", "Serve with salsa"]
    },
  
    // Lunch recipes
    { 
      name: "Mediterranean Salad", 
      description: "Fresh vegetables with feta cheese and olive oil", 
      mealType: "lunch",
      ingredients: ["Mixed greens", "Tomatoes", "Cucumbers", "Feta cheese", "Olives", "Olive oil"],
      instructions: ["Chop vegetables", "Toss with greens", "Add feta and olives", "Drizzle with oil", "Season and serve"]
    },
    { 
      name: "Grilled Chicken Wrap", 
      description: "Tender chicken with vegetables in a soft tortilla", 
      mealType: "lunch",
      ingredients: ["Chicken breast", "Tortillas", "Lettuce", "Tomatoes", "Avocado", "Ranch dressing"],
      instructions: ["Grill chicken", "Slice chicken", "Warm tortillas", "Add fillings", "Roll and serve"]
    },
    { 
      name: "Quinoa Bowl", 
      description: "Nutritious quinoa with roasted vegetables and tahini", 
      mealType: "lunch",
      ingredients: ["Quinoa", "Mixed vegetables", "Tahini", "Lemon juice", "Chickpeas", "Fresh herbs"],
      instructions: ["Cook quinoa", "Roast vegetables", "Make tahini dressing", "Combine in bowl", "Garnish with herbs"]
    },
    { 
      name: "Turkey Sandwich", 
      description: "Artisan bread with turkey, cheese, and fresh vegetables", 
      mealType: "lunch",
      ingredients: ["Artisan bread", "Turkey slices", "Cheese", "Lettuce", "Tomatoes", "Mayo"],
      instructions: ["Toast bread", "Layer turkey", "Add cheese", "Top with vegetables", "Slice and serve"]
    },
    { 
      name: "Soup and Salad", 
      description: "Seasonal soup paired with a fresh garden salad", 
      mealType: "lunch",
      ingredients: ["Seasonal vegetables", "Broth", "Mixed greens", "Vinaigrette", "Bread", "Herbs"],
      instructions: ["Prepare soup base", "Add vegetables", "Simmer until tender", "Prepare salad", "Serve together"]
    },
    { 
      name: "Pasta Salad", 
      description: "Cold pasta with vegetables and herb dressing", 
      mealType: "lunch",
      ingredients: ["Pasta", "Cherry tomatoes", "Bell peppers", "Herbs", "Olive oil", "Vinegar"],
      instructions: ["Cook pasta", "Cool completely", "Chop vegetables", "Make dressing", "Toss and chill"]
    },
    { 
      name: "Buddha Bowl", 
      description: "Colorful bowl with grains, proteins, and vegetables", 
      mealType: "lunch",
      ingredients: ["Brown rice", "Roasted vegetables", "Protein of choice", "Seeds", "Tahini", "Greens"],
      instructions: ["Cook grains", "Roast vegetables", "Prepare protein", "Arrange in bowl", "Drizzle with dressing"]
    },
    { 
      name: "Caprese Salad", 
      description: "Fresh mozzarella, tomatoes, and basil with balsamic", 
      mealType: "lunch",
      ingredients: ["Fresh mozzarella", "Tomatoes", "Fresh basil", "Balsamic vinegar", "Olive oil", "Salt"],
      instructions: ["Slice mozzarella", "Slice tomatoes", "Arrange alternating", "Add basil leaves", "Drizzle and season"]
    },
  
    // Dinner recipes
    { 
      name: "Herb-Crusted Salmon", 
      description: "Fresh salmon with herbs and lemon, served with vegetables", 
      mealType: "dinner",
      ingredients: ["Salmon fillets", "Fresh herbs", "Lemon", "Garlic", "Olive oil", "Seasonal vegetables"],
      instructions: ["Make herb crust", "Season salmon", "Bake with vegetables", "Serve with lemon", "Garnish with herbs"]
    },
    { 
      name: "Chicken Stir-Fry", 
      description: "Tender chicken with mixed vegetables in savory sauce", 
      mealType: "dinner",
      ingredients: ["Chicken breast", "Mixed vegetables", "Soy sauce", "Garlic", "Ginger", "Rice"],
      instructions: ["Cut chicken and vegetables", "Heat oil in wok", "Stir-fry chicken", "Add vegetables", "Serve over rice"]
    },
    { 
      name: "Beef Tacos", 
      description: "Seasoned ground beef in corn tortillas with fresh toppings", 
      mealType: "dinner",
      ingredients: ["Ground beef", "Corn tortillas", "Lettuce", "Tomatoes", "Cheese", "Sour cream"],
      instructions: ["Brown ground beef", "Season with spices", "Warm tortillas", "Fill with beef", "Top with garnishes"]
    },
    { 
      name: "Vegetable Curry", 
      description: "Aromatic curry with seasonal vegetables and coconut milk", 
      mealType: "dinner",
      ingredients: ["Mixed vegetables", "Coconut milk", "Curry powder", "Onions", "Garlic", "Rice"],
      instructions: ["Sauté aromatics", "Add vegetables", "Pour coconut milk", "Simmer with spices", "Serve over rice"]
    },
    { 
      name: "Pasta Primavera", 
      description: "Fresh pasta with seasonal vegetables and parmesan", 
      mealType: "dinner",
      ingredients: ["Pasta", "Seasonal vegetables", "Parmesan cheese", "Olive oil", "Garlic", "Fresh herbs"],
      instructions: ["Cook pasta", "Sauté vegetables", "Toss with oil", "Add cheese", "Garnish with herbs"]
    },
    { 
      name: "Grilled Portobello", 
      description: "Marinated portobello mushrooms with quinoa and vegetables", 
      mealType: "dinner",
      ingredients: ["Portobello mushrooms", "Quinoa", "Marinade", "Grilled vegetables", "Fresh herbs", "Lemon"],
      instructions: ["Marinate mushrooms", "Cook quinoa", "Grill mushrooms", "Prepare vegetables", "Plate and serve"]
    },
    { 
      name: "Fish and Chips", 
      description: "Crispy battered fish with homemade potato chips", 
      mealType: "dinner",
      ingredients: ["White fish", "Potatoes", "Flour", "Beer", "Oil for frying", "Mushy peas"],
      instructions: ["Make batter", "Cut potatoes", "Fry chips", "Batter and fry fish", "Serve hot"]
    },
    { 
      name: "Stuffed Bell Peppers", 
      description: "Bell peppers filled with rice, vegetables, and herbs", 
      mealType: "dinner",
      ingredients: ["Bell peppers", "Rice", "Ground meat", "Onions", "Herbs", "Cheese"],
      instructions: ["Hollow out peppers", "Cook filling", "Stuff peppers", "Bake until tender", "Top with cheese"]
    },
    // --- DUMMY RECIPES FOR TESTING FILTERS ---
    {
      name: "Jollof Rice",
      description: "Classic West African rice dish with tomatoes and spices (African & Caribbean, Gluten Free)",
      mealType: "dinner",
      ingredients: ["Rice", "Tomatoes", "Bell peppers", "Onions", "Spices"],
      instructions: ["Cook rice", "Prepare sauce", "Mix and simmer", "Serve hot"],
      prepTime: "40 mins",
      servings: "4"
    },
    {
      name: "Sushi Rolls",
      description: "Japanese rice rolls with fish and vegetables (Asian, Pescetarian)",
      mealType: "lunch",
      ingredients: ["Sushi rice", "Nori", "Fish", "Vegetables", "Soy sauce"],
      instructions: ["Prepare rice", "Lay nori", "Add fillings", "Roll and slice"],
      prepTime: "35 mins",
      servings: "3"
    },
    {
      name: "Ratatouille",
      description: "French stewed vegetables (European, Vegan)",
      mealType: "dinner",
      ingredients: ["Eggplant", "Zucchini", "Tomatoes", "Bell peppers", "Herbs"],
      instructions: ["Chop vegetables", "Layer in pan", "Bake until tender"],
      prepTime: "40 mins",
      servings: "2"
    },
    {
      name: "Tacos al Pastor",
      description: "Mexican pork tacos with pineapple (Latin American, Paleo)",
      mealType: "dinner",
      ingredients: ["Pork", "Pineapple", "Corn tortillas", "Onion", "Cilantro"],
      instructions: ["Marinate pork", "Grill", "Assemble tacos"],
      prepTime: "30 mins",
      servings: "5"
    },
    {
      name: "Falafel Bowl",
      description: "Middle Eastern falafel with salad and tahini (Middle Eastern, Vegetarian)",
      mealType: "lunch",
      ingredients: ["Chickpeas", "Herbs", "Spices", "Salad", "Tahini"],
      instructions: ["Blend chickpeas", "Form balls", "Fry", "Serve with salad"],
      prepTime: "25 mins",
      servings: "3"
    },
    {
      name: "No-Preference Stir Fry",
      description: "Quick stir fry for any diet (No Preference, Low FODMAP)",
      mealType: "dinner",
      ingredients: ["Protein of choice", "Mixed vegetables", "Soy sauce", "Rice"],
      instructions: ["Stir fry protein", "Add vegetables", "Serve with rice"],
      prepTime: "20 mins",
      servings: "2"
    },
    {
      name: "Keto Breakfast Plate",
      description: "Eggs, avocado, and bacon (Ketogenic, Primal)",
      mealType: "breakfast",
      ingredients: ["Eggs", "Avocado", "Bacon"],
      instructions: ["Fry bacon", "Cook eggs", "Slice avocado", "Plate and serve"],
      prepTime: "15 mins",
      servings: "2"
    },
    {
      name: "Whole30 Chicken Salad",
      description: "Chicken salad with greens and vinaigrette (Whole30, Gluten Free)",
      mealType: "lunch",
      ingredients: ["Chicken breast", "Mixed greens", "Vinaigrette", "Tomatoes"],
      instructions: ["Grill chicken", "Slice", "Toss with greens and dressing"],
      prepTime: "25 mins",
      servings: "4"
    },
    {
      name: "Vegan Buddha Bowl",
      description: "Grains, greens, and roasted veggies (Vegan, Low FODMAP)",
      mealType: "lunch",
      ingredients: ["Quinoa", "Spinach", "Roasted sweet potato", "Chickpeas", "Tahini"],
      instructions: ["Cook quinoa", "Roast veggies", "Assemble bowl"],
      prepTime: "30 mins",
      servings: "3"
    },
    {
      name: "Pescetarian Paella",
      description: "Spanish rice with seafood (European, Pescetarian)",
      mealType: "dinner",
      ingredients: ["Rice", "Shrimp", "Mussels", "Peas", "Saffron"],
      instructions: ["Cook rice", "Add seafood", "Simmer with spices"],
      prepTime: "40 mins",
      servings: "5"
    },
    {
      name: "Primal Steak & Veggies",
      description: "Grilled steak with seasonal vegetables (Primal, Paleo)",
      mealType: "dinner",
      ingredients: ["Steak", "Zucchini", "Bell peppers", "Olive oil", "Herbs"],
      instructions: ["Grill steak", "Sauté veggies", "Serve together"],
      prepTime: "35 mins",
      servings: "4"
    },
    {
      name: "Lacto-Vegetarian Paneer Curry",
      description: "Indian curry with paneer and peas (Asian, Lacto-Vegetarian)",
      mealType: "dinner",
      ingredients: ["Paneer", "Peas", "Tomato sauce", "Spices", "Rice"],
      instructions: ["Cook paneer", "Simmer sauce", "Add peas", "Serve with rice"],
      prepTime: "30 mins",
      servings: "3"
    },
    {
      name: "Ovo-Vegetarian Frittata",
      description: "Egg frittata with spinach and cheese (Ovo-Vegetarian, European)",
      mealType: "breakfast",
      ingredients: ["Eggs", "Spinach", "Cheese", "Onion"],
      instructions: ["Beat eggs", "Add veggies", "Bake until set"],
      prepTime: "25 mins",
      servings: "4"
    },
    // --- END DUMMY RECIPES ---
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
      mealType: template.mealType as "breakfast" | "lunch" | "dinner",
      ingredients: template.ingredients,
      instructions: template.instructions,
    }));
};
  