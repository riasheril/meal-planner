export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  _id: string;
}

export interface Instruction {
  step: number;
  text: string;
  _id: string;
}

export interface Recipe {
  _id: string;
  apiId: string;
  title: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  tags: string[];
  cuisine: string;
  cookingTime: number;
  servingSize: number;
  image: string;
  sourceUrl: string;
}

const recipeTemplates: Recipe[] = [
  // Avocado Toast with Eggs
  {
    _id: "avocado-toast-1",
    apiId: "100001",
    title: "Avocado Toast with Eggs",
    ingredients: [
      { name: "sourdough bread", quantity: 2, unit: "slices", _id: "avocado-toast-ing-1" },
      { name: "ripe avocado", quantity: 1, unit: "", _id: "avocado-toast-ing-2" },
      { name: "eggs", quantity: 2, unit: "", _id: "avocado-toast-ing-3" },
      { name: "salt and pepper", quantity: 1, unit: "to taste", _id: "avocado-toast-ing-4" },
      { name: "lemon juice", quantity: 1, unit: "splash", _id: "avocado-toast-ing-5" }
    ],
    instructions: [
      { step: 1, text: "Toast bread slices", _id: "avocado-toast-step-1" },
      { step: 2, text: "Mash avocado with lemon juice", _id: "avocado-toast-step-2" },
      { step: 3, text: "Poach eggs", _id: "avocado-toast-step-3" },
      { step: 4, text: "Spread avocado on toast", _id: "avocado-toast-step-4" },
      { step: 5, text: "Top with eggs", _id: "avocado-toast-step-5" }
    ],
    tags: ["breakfast", "vegetarian", "quick", "easy"],
    cuisine: "American",
    cookingTime: 10,
    servingSize: 1,
    image: "https://example.com/avocado-toast.jpg",
    sourceUrl: "https://yourblog.com/avocado-toast-recipe"
  },
  {
    _id: "overnight-oats-1",
    apiId: "100002",
    title: "Overnight Oats",
    ingredients: [
      { name: "rolled oats", quantity: 0.5, unit: "cup", _id: "overnight-oats-ing-1" },
      { name: "milk", quantity: 0.5, unit: "cup", _id: "overnight-oats-ing-2" },
      { name: "chia seeds", quantity: 1, unit: "tbsp", _id: "overnight-oats-ing-3" },
      { name: "honey", quantity: 1, unit: "tbsp", _id: "overnight-oats-ing-4" },
      { name: "fresh berries", quantity: 0, unit: "to taste", _id: "overnight-oats-ing-5" }
    ],
    instructions: [
      { step: 1, text: "Mix oats, milk, and chia seeds", _id: "overnight-oats-step-1" },
      { step: 2, text: "Add honey", _id: "overnight-oats-step-2" },
      { step: 3, text: "Refrigerate overnight", _id: "overnight-oats-step-3" },
      { step: 4, text: "Top with berries", _id: "overnight-oats-step-4" },
      { step: 5, text: "Serve cold", _id: "overnight-oats-step-5" }
    ],
    tags: ["breakfast", "vegetarian", "make-ahead"],
    cuisine: "American",
    cookingTime: 5,
    servingSize: 1,
    image: "https://example.com/overnight-oats.jpg",
    sourceUrl: "https://yourblog.com/overnight-oats-recipe"
  },
  {
    _id: "greek-parfait-1",
    apiId: "100003",
    title: "Greek Yogurt Parfait",
    ingredients: [
      { name: "Greek yogurt", quantity: 1, unit: "cup", _id: "greek-parfait-ing-1" },
      { name: "granola", quantity: 0.25, unit: "cup", _id: "greek-parfait-ing-2" },
      { name: "mixed berries", quantity: 0, unit: "to taste", _id: "greek-parfait-ing-3" },
      { name: "honey", quantity: 0, unit: "to taste", _id: "greek-parfait-ing-4" },
      { name: "chopped nuts", quantity: 0, unit: "to taste", _id: "greek-parfait-ing-5" }
    ],
    instructions: [
      { step: 1, text: "Layer yogurt in glass", _id: "greek-parfait-step-1" },
      { step: 2, text: "Add granola", _id: "greek-parfait-step-2" },
      { step: 3, text: "Top with berries", _id: "greek-parfait-step-3" },
      { step: 4, text: "Drizzle with honey", _id: "greek-parfait-step-4" },
      { step: 5, text: "Sprinkle nuts", _id: "greek-parfait-step-5" }
    ],
    tags: ["breakfast", "vegetarian", "quick"],
    cuisine: "Greek",
    cookingTime: 5,
    servingSize: 1,
    image: "https://example.com/greek-parfait.jpg",
    sourceUrl: "https://yourblog.com/greek-yogurt-parfait"
  },
  {
    _id: "vegetable-scramble-1",
    apiId: "100004",
    title: "Vegetable Scramble",
    ingredients: [
      { name: "eggs", quantity: 3, unit: "", _id: "vegetable-scramble-ing-1" },
      { name: "bell peppers", quantity: 0.5, unit: "cup", _id: "vegetable-scramble-ing-2" },
      { name: "onions", quantity: 0.25, unit: "cup", _id: "vegetable-scramble-ing-3" },
      { name: "spinach", quantity: 0.5, unit: "cup", _id: "vegetable-scramble-ing-4" },
      { name: "cheese", quantity: 0.25, unit: "cup", _id: "vegetable-scramble-ing-5" },
      { name: "salt and pepper", quantity: 1, unit: "to taste", _id: "vegetable-scramble-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Chop vegetables", _id: "vegetable-scramble-step-1" },
      { step: 2, text: "Scramble eggs", _id: "vegetable-scramble-step-2" },
      { step: 3, text: "Add vegetables", _id: "vegetable-scramble-step-3" },
      { step: 4, text: "Cook until tender", _id: "vegetable-scramble-step-4" },
      { step: 5, text: "Top with cheese", _id: "vegetable-scramble-step-5" }
    ],
    tags: ["breakfast", "vegetarian", "quick"],
    cuisine: "American",
    cookingTime: 10,
    servingSize: 1,
    image: "https://example.com/vegetable-scramble.jpg",
    sourceUrl: "https://yourblog.com/vegetable-scramble-recipe"
  },
  {
    _id: "smoothie-bowl-1",
    apiId: "100005",
    title: "Smoothie Bowl",
    ingredients: [
      { name: "frozen berries", quantity: 1, unit: "cup", _id: "smoothie-bowl-ing-1" },
      { name: "banana", quantity: 1, unit: "", _id: "smoothie-bowl-ing-2" },
      { name: "Greek yogurt", quantity: 0.5, unit: "cup", _id: "smoothie-bowl-ing-3" },
      { name: "granola", quantity: 0.25, unit: "cup", _id: "smoothie-bowl-ing-4" },
      { name: "chia seeds", quantity: 1, unit: "tbsp", _id: "smoothie-bowl-ing-5" },
      { name: "coconut flakes", quantity: 1, unit: "tbsp", _id: "smoothie-bowl-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Blend frozen fruits", _id: "smoothie-bowl-step-1" },
      { step: 2, text: "Pour into bowl", _id: "smoothie-bowl-step-2" },
      { step: 3, text: "Add toppings", _id: "smoothie-bowl-step-3" },
      { step: 4, text: "Arrange decoratively", _id: "smoothie-bowl-step-4" },
      { step: 5, text: "Serve immediately", _id: "smoothie-bowl-step-5" }
    ],
    tags: ["breakfast", "vegetarian", "quick"],
    cuisine: "American",
    cookingTime: 7,
    servingSize: 1,
    image: "https://example.com/smoothie-bowl.jpg",
    sourceUrl: "https://yourblog.com/smoothie-bowl-recipe"
  },
  {
    _id: "pancakes-1",
    apiId: "100006",
    title: "Pancakes",
    ingredients: [
      { name: "flour", quantity: 2, unit: "cups", _id: "pancakes-ing-1" },
      { name: "eggs", quantity: 2, unit: "", _id: "pancakes-ing-2" },
      { name: "milk", quantity: 1.5, unit: "cups", _id: "pancakes-ing-3" },
      { name: "baking powder", quantity: 2, unit: "tsp", _id: "pancakes-ing-4" },
      { name: "sugar", quantity: 2, unit: "tbsp", _id: "pancakes-ing-5" },
      { name: "maple syrup", quantity: 0, unit: "to serve", _id: "pancakes-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Mix dry ingredients", _id: "pancakes-step-1" },
      { step: 2, text: "Combine wet ingredients", _id: "pancakes-step-2" },
      { step: 3, text: "Fold together", _id: "pancakes-step-3" },
      { step: 4, text: "Cook on griddle", _id: "pancakes-step-4" },
      { step: 5, text: "Serve with syrup", _id: "pancakes-step-5" }
    ],
    tags: ["breakfast", "vegetarian"],
    cuisine: "American",
    cookingTime: 20,
    servingSize: 2,
    image: "https://example.com/pancakes.jpg",
    sourceUrl: "https://yourblog.com/pancakes-recipe"
  },
  {
    _id: "french-toast-1",
    apiId: "100007",
    title: "French Toast",
    ingredients: [
      { name: "thick bread slices", quantity: 2, unit: "", _id: "french-toast-ing-1" },
      { name: "eggs", quantity: 3, unit: "", _id: "french-toast-ing-2" },
      { name: "milk", quantity: 0.5, unit: "cup", _id: "french-toast-ing-3" },
      { name: "cinnamon", quantity: 1, unit: "tsp", _id: "french-toast-ing-4" },
      { name: "vanilla", quantity: 1, unit: "tsp", _id: "french-toast-ing-5" },
      { name: "butter", quantity: 1, unit: "tbsp", _id: "french-toast-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Beat eggs with milk", _id: "french-toast-step-1" },
      { step: 2, text: "Add cinnamon and vanilla", _id: "french-toast-step-2" },
      { step: 3, text: "Dip bread slices", _id: "french-toast-step-3" },
      { step: 4, text: "Cook in butter", _id: "french-toast-step-4" },
      { step: 5, text: "Serve warm", _id: "french-toast-step-5" }
    ],
    tags: ["breakfast", "vegetarian"],
    cuisine: "French",
    cookingTime: 15,
    servingSize: 2,
    image: "https://example.com/french-toast.jpg",
    sourceUrl: "https://yourblog.com/french-toast-recipe"
  },
  {
    _id: "breakfast-burrito-1",
    apiId: "100008",
    title: "Breakfast Burrito",
    ingredients: [
      { name: "flour tortillas", quantity: 2, unit: "", _id: "breakfast-burrito-ing-1" },
      { name: "eggs", quantity: 2, unit: "", _id: "breakfast-burrito-ing-2" },
      { name: "cheese", quantity: 0.25, unit: "cup", _id: "breakfast-burrito-ing-3" },
      { name: "bell peppers", quantity: 0.25, unit: "cup", _id: "breakfast-burrito-ing-4" },
      { name: "onions", quantity: 0.25, unit: "cup", _id: "breakfast-burrito-ing-5" },
      { name: "salsa", quantity: 2, unit: "tbsp", _id: "breakfast-burrito-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Scramble eggs", _id: "breakfast-burrito-step-1" },
      { step: 2, text: "Sauté vegetables", _id: "breakfast-burrito-step-2" },
      { step: 3, text: "Warm tortillas", _id: "breakfast-burrito-step-3" },
      { step: 4, text: "Fill and wrap", _id: "breakfast-burrito-step-4" },
      { step: 5, text: "Serve with salsa", _id: "breakfast-burrito-step-5" }
    ],
    tags: ["breakfast", "vegetarian"],
    cuisine: "Mexican",
    cookingTime: 15,
    servingSize: 1,
    image: "https://example.com/breakfast-burrito.jpg",
    sourceUrl: "https://yourblog.com/breakfast-burrito-recipe"
  },
  // Lunch recipes
  {
    _id: "mediterranean-salad-1",
    apiId: "100009",
    title: "Mediterranean Salad",
    ingredients: [
      { name: "mixed greens", quantity: 0, unit: "to taste", _id: "mediterranean-salad-ing-1" },
      { name: "tomatoes", quantity: 0, unit: "to taste", _id: "mediterranean-salad-ing-2" },
      { name: "cucumbers", quantity: 0, unit: "to taste", _id: "mediterranean-salad-ing-3" },
      { name: "feta cheese", quantity: 0, unit: "to taste", _id: "mediterranean-salad-ing-4" },
      { name: "olives", quantity: 0, unit: "to taste", _id: "mediterranean-salad-ing-5" },
      { name: "olive oil", quantity: 0, unit: "to taste", _id: "mediterranean-salad-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Chop vegetables", _id: "mediterranean-salad-step-1" },
      { step: 2, text: "Toss with greens", _id: "mediterranean-salad-step-2" },
      { step: 3, text: "Add feta and olives", _id: "mediterranean-salad-step-3" },
      { step: 4, text: "Drizzle with oil", _id: "mediterranean-salad-step-4" },
      { step: 5, text: "Season and serve", _id: "mediterranean-salad-step-5" }
    ],
    tags: ["lunch"],
    cuisine: "Mediterranean",
    cookingTime: 10,
    servingSize: 1,
    image: "https://example.com/mediterranean-salad.jpg",
    sourceUrl: "https://yourblog.com/mediterranean-salad-recipe"
  },
  {
    _id: "grilled-chicken-wrap-1",
    apiId: "100010",
    title: "Grilled Chicken Wrap",
    ingredients: [
      { name: "chicken breast", quantity: 0, unit: "to taste", _id: "grilled-chicken-wrap-ing-1" },
      { name: "tortillas", quantity: 0, unit: "to taste", _id: "grilled-chicken-wrap-ing-2" },
      { name: "lettuce", quantity: 0, unit: "to taste", _id: "grilled-chicken-wrap-ing-3" },
      { name: "tomatoes", quantity: 0, unit: "to taste", _id: "grilled-chicken-wrap-ing-4" },
      { name: "avocado", quantity: 0, unit: "to taste", _id: "grilled-chicken-wrap-ing-5" },
      { name: "ranch dressing", quantity: 0, unit: "to taste", _id: "grilled-chicken-wrap-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Grill chicken", _id: "grilled-chicken-wrap-step-1" },
      { step: 2, text: "Slice chicken", _id: "grilled-chicken-wrap-step-2" },
      { step: 3, text: "Warm tortillas", _id: "grilled-chicken-wrap-step-3" },
      { step: 4, text: "Add fillings", _id: "grilled-chicken-wrap-step-4" },
      { step: 5, text: "Roll and serve", _id: "grilled-chicken-wrap-step-5" }
    ],
    tags: ["lunch"],
    cuisine: "American",
    cookingTime: 15,
    servingSize: 1,
    image: "https://example.com/grilled-chicken-wrap.jpg",
    sourceUrl: "https://yourblog.com/grilled-chicken-wrap-recipe"
  },
  {
    _id: "quinoa-bowl-1",
    apiId: "100011",
    title: "Quinoa Bowl",
    ingredients: [
      { name: "quinoa", quantity: 0, unit: "to taste", _id: "quinoa-bowl-ing-1" },
      { name: "mixed vegetables", quantity: 0, unit: "to taste", _id: "quinoa-bowl-ing-2" },
      { name: "tahini", quantity: 0, unit: "to taste", _id: "quinoa-bowl-ing-3" },
      { name: "lemon juice", quantity: 0, unit: "to taste", _id: "quinoa-bowl-ing-4" },
      { name: "chickpeas", quantity: 0, unit: "to taste", _id: "quinoa-bowl-ing-5" },
      { name: "fresh herbs", quantity: 0, unit: "to taste", _id: "quinoa-bowl-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Cook quinoa", _id: "quinoa-bowl-step-1" },
      { step: 2, text: "Roast vegetables", _id: "quinoa-bowl-step-2" },
      { step: 3, text: "Make tahini dressing", _id: "quinoa-bowl-step-3" },
      { step: 4, text: "Combine in bowl", _id: "quinoa-bowl-step-4" },
      { step: 5, text: "Garnish with herbs", _id: "quinoa-bowl-step-5" }
    ],
    tags: ["lunch"],
    cuisine: "American",
    cookingTime: 15,
    servingSize: 1,
    image: "https://example.com/quinoa-bowl.jpg",
    sourceUrl: "https://yourblog.com/quinoa-bowl-recipe"
  },
  {
    _id: "turkey-sandwich-1",
    apiId: "100012",
    title: "Turkey Sandwich",
    ingredients: [
      { name: "artisan bread", quantity: 0, unit: "to taste", _id: "turkey-sandwich-ing-1" },
      { name: "turkey slices", quantity: 0, unit: "to taste", _id: "turkey-sandwich-ing-2" },
      { name: "cheese", quantity: 0, unit: "to taste", _id: "turkey-sandwich-ing-3" },
      { name: "lettuce", quantity: 0, unit: "to taste", _id: "turkey-sandwich-ing-4" },
      { name: "tomatoes", quantity: 0, unit: "to taste", _id: "turkey-sandwich-ing-5" },
      { name: "mayo", quantity: 0, unit: "to taste", _id: "turkey-sandwich-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Toast bread", _id: "turkey-sandwich-step-1" },
      { step: 2, text: "Layer turkey", _id: "turkey-sandwich-step-2" },
      { step: 3, text: "Add cheese", _id: "turkey-sandwich-step-3" },
      { step: 4, text: "Top with vegetables", _id: "turkey-sandwich-step-4" },
      { step: 5, text: "Slice and serve", _id: "turkey-sandwich-step-5" }
    ],
    tags: ["lunch"],
    cuisine: "American",
    cookingTime: 10,
    servingSize: 1,
    image: "https://example.com/turkey-sandwich.jpg",
    sourceUrl: "https://yourblog.com/turkey-sandwich-recipe"
  },
  {
    _id: "soup-and-salad-1",
    apiId: "100013",
    title: "Soup and Salad",
    ingredients: [
      { name: "seasonal vegetables", quantity: 0, unit: "to taste", _id: "soup-and-salad-ing-1" },
      { name: "broth", quantity: 0, unit: "to taste", _id: "soup-and-salad-ing-2" },
      { name: "mixed greens", quantity: 0, unit: "to taste", _id: "soup-and-salad-ing-3" },
      { name: "vinaigrette", quantity: 0, unit: "to taste", _id: "soup-and-salad-ing-4" },
      { name: "bread", quantity: 0, unit: "to taste", _id: "soup-and-salad-ing-5" },
      { name: "herbs", quantity: 0, unit: "to taste", _id: "soup-and-salad-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Prepare soup base", _id: "soup-and-salad-step-1" },
      { step: 2, text: "Add vegetables", _id: "soup-and-salad-step-2" },
      { step: 3, text: "Simmer until tender", _id: "soup-and-salad-step-3" },
      { step: 4, text: "Prepare salad", _id: "soup-and-salad-step-4" },
      { step: 5, text: "Serve together", _id: "soup-and-salad-step-5" }
    ],
    tags: ["lunch"],
    cuisine: "American",
    cookingTime: 20,
    servingSize: 1,
    image: "https://example.com/soup-and-salad.jpg",
    sourceUrl: "https://yourblog.com/soup-and-salad-recipe"
  },
  {
    _id: "pasta-salad-1",
    apiId: "100014",
    title: "Pasta Salad",
    ingredients: [
      { name: "pasta", quantity: 0, unit: "to taste", _id: "pasta-salad-ing-1" },
      { name: "cherry tomatoes", quantity: 0, unit: "to taste", _id: "pasta-salad-ing-2" },
      { name: "bell peppers", quantity: 0, unit: "to taste", _id: "pasta-salad-ing-3" },
      { name: "herbs", quantity: 0, unit: "to taste", _id: "pasta-salad-ing-4" },
      { name: "olive oil", quantity: 0, unit: "to taste", _id: "pasta-salad-ing-5" },
      { name: "vinegar", quantity: 0, unit: "to taste", _id: "pasta-salad-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Cook pasta", _id: "pasta-salad-step-1" },
      { step: 2, text: "Cool completely", _id: "pasta-salad-step-2" },
      { step: 3, text: "Chop vegetables", _id: "pasta-salad-step-3" },
      { step: 4, text: "Make dressing", _id: "pasta-salad-step-4" },
      { step: 5, text: "Toss and chill", _id: "pasta-salad-step-5" }
    ],
    tags: ["lunch"],
    cuisine: "American",
    cookingTime: 20,
    servingSize: 1,
    image: "https://example.com/pasta-salad.jpg",
    sourceUrl: "https://yourblog.com/pasta-salad-recipe"
  },
  {
    _id: "buddha-bowl-1",
    apiId: "100015",
    title: "Buddha Bowl",
    ingredients: [
      { name: "brown rice", quantity: 0, unit: "to taste", _id: "buddha-bowl-ing-1" },
      { name: "roasted vegetables", quantity: 0, unit: "to taste", _id: "buddha-bowl-ing-2" },
      { name: "protein of choice", quantity: 0, unit: "to taste", _id: "buddha-bowl-ing-3" },
      { name: "seeds", quantity: 0, unit: "to taste", _id: "buddha-bowl-ing-4" },
      { name: "tahini", quantity: 0, unit: "to taste", _id: "buddha-bowl-ing-5" },
      { name: "greens", quantity: 0, unit: "to taste", _id: "buddha-bowl-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Cook grains", _id: "buddha-bowl-step-1" },
      { step: 2, text: "Roast vegetables", _id: "buddha-bowl-step-2" },
      { step: 3, text: "Prepare protein", _id: "buddha-bowl-step-3" },
      { step: 4, text: "Arrange in bowl", _id: "buddha-bowl-step-4" },
      { step: 5, text: "Drizzle with dressing", _id: "buddha-bowl-step-5" }
    ],
    tags: ["lunch"],
    cuisine: "American",
    cookingTime: 20,
    servingSize: 1,
    image: "https://example.com/buddha-bowl.jpg",
    sourceUrl: "https://yourblog.com/buddha-bowl-recipe"
  },
  {
    _id: "caprese-salad-1",
    apiId: "100016",
    title: "Caprese Salad",
    ingredients: [
      { name: "fresh mozzarella", quantity: 0, unit: "to taste", _id: "caprese-salad-ing-1" },
      { name: "tomatoes", quantity: 0, unit: "to taste", _id: "caprese-salad-ing-2" },
      { name: "fresh basil", quantity: 0, unit: "to taste", _id: "caprese-salad-ing-3" },
      { name: "balsamic vinegar", quantity: 0, unit: "to taste", _id: "caprese-salad-ing-4" },
      { name: "olive oil", quantity: 0, unit: "to taste", _id: "caprese-salad-ing-5" },
      { name: "salt", quantity: 0, unit: "to taste", _id: "caprese-salad-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Slice mozzarella", _id: "caprese-salad-step-1" },
      { step: 2, text: "Slice tomatoes", _id: "caprese-salad-step-2" },
      { step: 3, text: "Arrange alternating", _id: "caprese-salad-step-3" },
      { step: 4, text: "Add basil leaves", _id: "caprese-salad-step-4" },
      { step: 5, text: "Drizzle and season", _id: "caprese-salad-step-5" }
    ],
    tags: ["lunch"],
    cuisine: "Italian",
    cookingTime: 10,
    servingSize: 1,
    image: "https://example.com/caprese-salad.jpg",
    sourceUrl: "https://yourblog.com/caprese-salad-recipe"
  },
  // Dinner recipes
  {
    _id: "herb-crusted-salmon-1",
    apiId: "100017",
    title: "Herb-Crusted Salmon",
    ingredients: [
      { name: "salmon fillets", quantity: 0, unit: "to taste", _id: "herb-crusted-salmon-ing-1" },
      { name: "fresh herbs", quantity: 0, unit: "to taste", _id: "herb-crusted-salmon-ing-2" },
      { name: "lemon", quantity: 0, unit: "to taste", _id: "herb-crusted-salmon-ing-3" },
      { name: "garlic", quantity: 0, unit: "to taste", _id: "herb-crusted-salmon-ing-4" },
      { name: "olive oil", quantity: 0, unit: "to taste", _id: "herb-crusted-salmon-ing-5" },
      { name: "seasonal vegetables", quantity: 0, unit: "to taste", _id: "herb-crusted-salmon-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Make herb crust", _id: "herb-crusted-salmon-step-1" },
      { step: 2, text: "Season salmon", _id: "herb-crusted-salmon-step-2" },
      { step: 3, text: "Bake with vegetables", _id: "herb-crusted-salmon-step-3" },
      { step: 4, text: "Serve with lemon", _id: "herb-crusted-salmon-step-4" },
      { step: 5, text: "Garnish with herbs", _id: "herb-crusted-salmon-step-5" }
    ],
    tags: ["dinner"],
    cuisine: "American",
    cookingTime: 20,
    servingSize: 1,
    image: "https://example.com/herb-crusted-salmon.jpg",
    sourceUrl: "https://yourblog.com/herb-crusted-salmon-recipe"
  },
  {
    _id: "chicken-stir-fry-1",
    apiId: "100018",
    title: "Chicken Stir-Fry",
    ingredients: [
      { name: "chicken breast", quantity: 0, unit: "to taste", _id: "chicken-stir-fry-ing-1" },
      { name: "mixed vegetables", quantity: 0, unit: "to taste", _id: "chicken-stir-fry-ing-2" },
      { name: "soy sauce", quantity: 0, unit: "to taste", _id: "chicken-stir-fry-ing-3" },
      { name: "garlic", quantity: 0, unit: "to taste", _id: "chicken-stir-fry-ing-4" },
      { name: "ginger", quantity: 0, unit: "to taste", _id: "chicken-stir-fry-ing-5" },
      { name: "rice", quantity: 0, unit: "to taste", _id: "chicken-stir-fry-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Cut chicken and vegetables", _id: "chicken-stir-fry-step-1" },
      { step: 2, text: "Heat oil in wok", _id: "chicken-stir-fry-step-2" },
      { step: 3, text: "Stir-fry chicken", _id: "chicken-stir-fry-step-3" },
      { step: 4, text: "Add vegetables", _id: "chicken-stir-fry-step-4" },
      { step: 5, text: "Serve over rice", _id: "chicken-stir-fry-step-5" }
    ],
    tags: ["dinner"],
    cuisine: "American",
    cookingTime: 15,
    servingSize: 1,
    image: "https://example.com/chicken-stir-fry.jpg",
    sourceUrl: "https://yourblog.com/chicken-stir-fry-recipe"
  },
  {
    _id: "beef-tacos-1",
    apiId: "100019",
    title: "Beef Tacos",
    ingredients: [
      { name: "ground beef", quantity: 0, unit: "to taste", _id: "beef-tacos-ing-1" },
      { name: "corn tortillas", quantity: 0, unit: "to taste", _id: "beef-tacos-ing-2" },
      { name: "lettuce", quantity: 0, unit: "to taste", _id: "beef-tacos-ing-3" },
      { name: "tomatoes", quantity: 0, unit: "to taste", _id: "beef-tacos-ing-4" },
      { name: "cheese", quantity: 0, unit: "to taste", _id: "beef-tacos-ing-5" },
      { name: "sour cream", quantity: 0, unit: "to taste", _id: "beef-tacos-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Brown ground beef", _id: "beef-tacos-step-1" },
      { step: 2, text: "Season with spices", _id: "beef-tacos-step-2" },
      { step: 3, text: "Warm tortillas", _id: "beef-tacos-step-3" },
      { step: 4, text: "Fill with beef", _id: "beef-tacos-step-4" },
      { step: 5, text: "Top with garnishes", _id: "beef-tacos-step-5" }
    ],
    tags: ["dinner"],
    cuisine: "Mexican",
    cookingTime: 15,
    servingSize: 1,
    image: "https://example.com/beef-tacos.jpg",
    sourceUrl: "https://yourblog.com/beef-tacos-recipe"
  },
  {
    _id: "vegetable-curry-1",
    apiId: "100020",
    title: "Vegetable Curry",
    ingredients: [
      { name: "mixed vegetables", quantity: 0, unit: "to taste", _id: "vegetable-curry-ing-1" },
      { name: "coconut milk", quantity: 0, unit: "to taste", _id: "vegetable-curry-ing-2" },
      { name: "curry powder", quantity: 0, unit: "to taste", _id: "vegetable-curry-ing-3" },
      { name: "onions", quantity: 0, unit: "to taste", _id: "vegetable-curry-ing-4" },
      { name: "garlic", quantity: 0, unit: "to taste", _id: "vegetable-curry-ing-5" },
      { name: "rice", quantity: 0, unit: "to taste", _id: "vegetable-curry-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Sauté aromatics", _id: "vegetable-curry-step-1" },
      { step: 2, text: "Add vegetables", _id: "vegetable-curry-step-2" },
      { step: 3, text: "Pour coconut milk", _id: "vegetable-curry-step-3" },
      { step: 4, text: "Simmer with spices", _id: "vegetable-curry-step-4" },
      { step: 5, text: "Serve over rice", _id: "vegetable-curry-step-5" }
    ],
    tags: ["dinner"],
    cuisine: "Indian",
    cookingTime: 20,
    servingSize: 1,
    image: "https://example.com/vegetable-curry.jpg",
    sourceUrl: "https://yourblog.com/vegetable-curry-recipe"
  },
  {
    _id: "pasta-primavera-1",
    apiId: "100021",
    title: "Pasta Primavera",
    ingredients: [
      { name: "pasta", quantity: 0, unit: "to taste", _id: "pasta-primavera-ing-1" },
      { name: "seasonal vegetables", quantity: 0, unit: "to taste", _id: "pasta-primavera-ing-2" },
      { name: "parmesan cheese", quantity: 0, unit: "to taste", _id: "pasta-primavera-ing-3" },
      { name: "olive oil", quantity: 0, unit: "to taste", _id: "pasta-primavera-ing-4" },
      { name: "garlic", quantity: 0, unit: "to taste", _id: "pasta-primavera-ing-5" },
      { name: "fresh herbs", quantity: 0, unit: "to taste", _id: "pasta-primavera-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Cook pasta", _id: "pasta-primavera-step-1" },
      { step: 2, text: "Sauté vegetables", _id: "pasta-primavera-step-2" },
      { step: 3, text: "Toss with oil", _id: "pasta-primavera-step-3" },
      { step: 4, text: "Add cheese", _id: "pasta-primavera-step-4" },
      { step: 5, text: "Garnish with herbs", _id: "pasta-primavera-step-5" }
    ],
    tags: ["dinner"],
    cuisine: "Italian",
    cookingTime: 15,
    servingSize: 1,
    image: "https://example.com/pasta-primavera.jpg",
    sourceUrl: "https://yourblog.com/pasta-primavera-recipe"
  },
  {
    _id: "grilled-portobello-1",
    apiId: "100022",
    title: "Grilled Portobello",
    ingredients: [
      { name: "portobello mushrooms", quantity: 0, unit: "to taste", _id: "grilled-portobello-ing-1" },
      { name: "quinoa", quantity: 0, unit: "to taste", _id: "grilled-portobello-ing-2" },
      { name: "marinade", quantity: 0, unit: "to taste", _id: "grilled-portobello-ing-3" },
      { name: "grilled vegetables", quantity: 0, unit: "to taste", _id: "grilled-portobello-ing-4" },
      { name: "fresh herbs", quantity: 0, unit: "to taste", _id: "grilled-portobello-ing-5" },
      { name: "lemon", quantity: 0, unit: "to taste", _id: "grilled-portobello-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Marinate mushrooms", _id: "grilled-portobello-step-1" },
      { step: 2, text: "Cook quinoa", _id: "grilled-portobello-step-2" },
      { step: 3, text: "Grill mushrooms", _id: "grilled-portobello-step-3" },
      { step: 4, text: "Prepare vegetables", _id: "grilled-portobello-step-4" },
      { step: 5, text: "Plate and serve", _id: "grilled-portobello-step-5" }
    ],
    tags: ["dinner"],
    cuisine: "American",
    cookingTime: 20,
    servingSize: 1,
    image: "https://example.com/grilled-portobello.jpg",
    sourceUrl: "https://yourblog.com/grilled-portobello-recipe"
  },
  {
    _id: "fish-and-chips-1",
    apiId: "100023",
    title: "Fish and Chips",
    ingredients: [
      { name: "white fish", quantity: 0, unit: "to taste", _id: "fish-and-chips-ing-1" },
      { name: "potatoes", quantity: 0, unit: "to taste", _id: "fish-and-chips-ing-2" },
      { name: "flour", quantity: 0, unit: "to taste", _id: "fish-and-chips-ing-3" },
      { name: "beer", quantity: 0, unit: "to taste", _id: "fish-and-chips-ing-4" },
      { name: "oil for frying", quantity: 0, unit: "to taste", _id: "fish-and-chips-ing-5" },
      { name: "mushy peas", quantity: 0, unit: "to taste", _id: "fish-and-chips-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Make batter", _id: "fish-and-chips-step-1" },
      { step: 2, text: "Cut potatoes", _id: "fish-and-chips-step-2" },
      { step: 3, text: "Fry chips", _id: "fish-and-chips-step-3" },
      { step: 4, text: "Batter and fry fish", _id: "fish-and-chips-step-4" },
      { step: 5, text: "Serve hot", _id: "fish-and-chips-step-5" }
    ],
    tags: ["dinner"],
    cuisine: "British",
    cookingTime: 30,
    servingSize: 1,
    image: "https://example.com/fish-and-chips.jpg",
    sourceUrl: "https://yourblog.com/fish-and-chips-recipe"
  },
  {
    _id: "stuffed-bell-peppers-1",
    apiId: "100024",
    title: "Stuffed Bell Peppers",
    ingredients: [
      { name: "bell peppers", quantity: 0, unit: "to taste", _id: "stuffed-bell-peppers-ing-1" },
      { name: "rice", quantity: 0, unit: "to taste", _id: "stuffed-bell-peppers-ing-2" },
      { name: "ground meat", quantity: 0, unit: "to taste", _id: "stuffed-bell-peppers-ing-3" },
      { name: "onions", quantity: 0, unit: "to taste", _id: "stuffed-bell-peppers-ing-4" },
      { name: "herbs", quantity: 0, unit: "to taste", _id: "stuffed-bell-peppers-ing-5" },
      { name: "cheese", quantity: 0, unit: "to taste", _id: "stuffed-bell-peppers-ing-6" }
    ],
    instructions: [
      { step: 1, text: "Hollow out peppers", _id: "stuffed-bell-peppers-step-1" },
      { step: 2, text: "Cook filling", _id: "stuffed-bell-peppers-step-2" },
      { step: 3, text: "Stuff peppers", _id: "stuffed-bell-peppers-step-3" },
      { step: 4, text: "Bake until tender", _id: "stuffed-bell-peppers-step-4" },
      { step: 5, text: "Top with cheese", _id: "stuffed-bell-peppers-step-5" }
    ],
    tags: ["dinner"],
    cuisine: "Mexican",
    cookingTime: 30,
    servingSize: 1,
    image: "https://example.com/stuffed-bell-peppers.jpg",
    sourceUrl: "https://yourblog.com/stuffed-bell-peppers-recipe"
  },
  // --- DUMMY RECIPES FOR TESTING FILTERS ---
  {
    _id: "jollof-rice-1",
    apiId: "100025",
    title: "Jollof Rice",
    ingredients: [
      { name: "rice", quantity: 0, unit: "to taste", _id: "jollof-rice-ing-1" },
      { name: "tomatoes", quantity: 0, unit: "to taste", _id: "jollof-rice-ing-2" },
      { name: "bell peppers", quantity: 0, unit: "to taste", _id: "jollof-rice-ing-3" },
      { name: "onions", quantity: 0, unit: "to taste", _id: "jollof-rice-ing-4" },
      { name: "spices", quantity: 0, unit: "to taste", _id: "jollof-rice-ing-5" }
    ],
    instructions: [
      { step: 1, text: "Cook rice", _id: "jollof-rice-step-1" },
      { step: 2, text: "Prepare sauce", _id: "jollof-rice-step-2" },
      { step: 3, text: "Mix and simmer", _id: "jollof-rice-step-3" },
      { step: 4, text: "Serve hot", _id: "jollof-rice-step-4" }
    ],
    tags: ["dinner"],
    cuisine: "West African",
    cookingTime: 40,
    servingSize: 4,
    image: "https://example.com/jollof-rice.jpg",
    sourceUrl: "https://yourblog.com/jollof-rice-recipe"
  },
  {
    _id: "sushi-rolls-1",
    apiId: "100026",
    title: "Sushi Rolls",
    ingredients: [
      { name: "sushi rice", quantity: 0, unit: "to taste", _id: "sushi-rolls-ing-1" },
      { name: "nori", quantity: 0, unit: "to taste", _id: "sushi-rolls-ing-2" },
      { name: "fish", quantity: 0, unit: "to taste", _id: "sushi-rolls-ing-3" },
      { name: "vegetables", quantity: 0, unit: "to taste", _id: "sushi-rolls-ing-4" },
      { name: "soy sauce", quantity: 0, unit: "to taste", _id: "sushi-rolls-ing-5" }
    ],
    instructions: [
      { step: 1, text: "Prepare rice", _id: "sushi-rolls-step-1" },
      { step: 2, text: "Lay nori", _id: "sushi-rolls-step-2" },
      { step: 3, text: "Add fillings", _id: "sushi-rolls-step-3" },
      { step: 4, text: "Roll and slice", _id: "sushi-rolls-step-4" }
    ],
    tags: ["lunch", "pescetarian", "asian"],
    cuisine: "Japanese",
    cookingTime: 35,
    servingSize: 3,
    image: "https://example.com/sushi-rolls.jpg",
    sourceUrl: "https://yourblog.com/sushi-rolls-recipe"
  },
  {
    _id: "ratatouille-1",
    apiId: "100027",
    title: "Ratatouille",
    ingredients: [
      { name: "eggplant", quantity: 0, unit: "to taste", _id: "ratatouille-ing-1" },
      { name: "zucchini", quantity: 0, unit: "to taste", _id: "ratatouille-ing-2" },
      { name: "tomatoes", quantity: 0, unit: "to taste", _id: "ratatouille-ing-3" },
      { name: "bell peppers", quantity: 0, unit: "to taste", _id: "ratatouille-ing-4" },
      { name: "herbs", quantity: 0, unit: "to taste", _id: "ratatouille-ing-5" }
    ],
    instructions: [
      { step: 1, text: "Chop vegetables", _id: "ratatouille-step-1" },
      { step: 2, text: "Layer in pan", _id: "ratatouille-step-2" },
      { step: 3, text: "Bake until tender", _id: "ratatouille-step-3" }
    ],
    tags: ["dinner"],
    cuisine: "French",
    cookingTime: 40,
    servingSize: 2,
    image: "https://example.com/ratatouille.jpg",
    sourceUrl: "https://yourblog.com/ratatouille-recipe"
  },
  {
    _id: "tacos-al-pastor-1",
    apiId: "100028",
    title: "Tacos al Pastor",
    ingredients: [
      { name: "pork", quantity: 0, unit: "to taste", _id: "tacos-al-pastor-ing-1" },
      { name: "pineapple", quantity: 0, unit: "to taste", _id: "tacos-al-pastor-ing-2" },
      { name: "corn tortillas", quantity: 0, unit: "to taste", _id: "tacos-al-pastor-ing-3" },
      { name: "onion", quantity: 0, unit: "to taste", _id: "tacos-al-pastor-ing-4" },
      { name: "cilantro", quantity: 0, unit: "to taste", _id: "tacos-al-pastor-ing-5" }
    ],
    instructions: [
      { step: 1, text: "Marinate pork", _id: "tacos-al-pastor-step-1" },
      { step: 2, text: "Grill", _id: "tacos-al-pastor-step-2" },
      { step: 3, text: "Assemble tacos", _id: "tacos-al-pastor-step-3" }
    ],
    tags: ["dinner"],
    cuisine: "Mexican",
    cookingTime: 30,
    servingSize: 5,
    image: "https://example.com/tacos-al-pastor.jpg",
    sourceUrl: "https://yourblog.com/tacos-al-pastor-recipe"
  },
  {
    _id: "falafel-bowl-1",
    apiId: "100029",
    title: "Falafel Bowl",
    ingredients: [
      { name: "chickpeas", quantity: 0, unit: "to taste", _id: "falafel-bowl-ing-1" },
      { name: "herbs", quantity: 0, unit: "to taste", _id: "falafel-bowl-ing-2" },
      { name: "spices", quantity: 0, unit: "to taste", _id: "falafel-bowl-ing-3" },
      { name: "salad", quantity: 0, unit: "to taste", _id: "falafel-bowl-ing-4" },
      { name: "tahini", quantity: 0, unit: "to taste", _id: "falafel-bowl-ing-5" }
    ],
    instructions: [
      { step: 1, text: "Blend chickpeas", _id: "falafel-bowl-step-1" },
      { step: 2, text: "Form balls", _id: "falafel-bowl-step-2" },
      { step: 3, text: "Fry", _id: "falafel-bowl-step-3" },
      { step: 4, text: "Serve with salad", _id: "falafel-bowl-step-4" }
    ],
    tags: ["lunch"],
    cuisine: "Middle Eastern",
    cookingTime: 25,
    servingSize: 3,
    image: "https://example.com/falafel-bowl.jpg",
    sourceUrl: "https://yourblog.com/falafel-bowl-recipe"
  },
  {
    _id: "no-preference-stir-fry-1",
    apiId: "100030",
    title: "No-Preference Stir Fry",
    ingredients: [
      { name: "protein of choice", quantity: 0, unit: "to taste", _id: "no-preference-stir-fry-ing-1" },
      { name: "mixed vegetables", quantity: 0, unit: "to taste", _id: "no-preference-stir-fry-ing-2" },
      { name: "soy sauce", quantity: 0, unit: "to taste", _id: "no-preference-stir-fry-ing-3" },
      { name: "rice", quantity: 0, unit: "to taste", _id: "no-preference-stir-fry-ing-4" }
    ],
    instructions: [
      { step: 1, text: "Stir fry protein", _id: "no-preference-stir-fry-step-1" },
      { step: 2, text: "Add vegetables", _id: "no-preference-stir-fry-step-2" },
      { step: 3, text: "Serve with rice", _id: "no-preference-stir-fry-step-3" }
    ],
    tags: ["dinner"],
    cuisine: "American",
    cookingTime: 20,
    servingSize: 2,
    image: "https://example.com/no-preference-stir-fry.jpg",
    sourceUrl: "https://yourblog.com/no-preference-stir-fry-recipe"
  },
  {
    _id: "keto-breakfast-plate-1",
    apiId: "100031",
    title: "Keto Breakfast Plate",
    ingredients: [
      { name: "eggs", quantity: 0, unit: "to taste", _id: "keto-breakfast-plate-ing-1" },
      { name: "avocado", quantity: 0, unit: "to taste", _id: "keto-breakfast-plate-ing-2" },
      { name: "bacon", quantity: 0, unit: "to taste", _id: "keto-breakfast-plate-ing-3" }
    ],
    instructions: [
      { step: 1, text: "Fry bacon", _id: "keto-breakfast-plate-step-1" },
      { step: 2, text: "Cook eggs", _id: "keto-breakfast-plate-step-2" },
      { step: 3, text: "Slice avocado", _id: "keto-breakfast-plate-step-3" },
      { step: 4, text: "Plate and serve", _id: "keto-breakfast-plate-step-4" }
    ],
    tags: ["breakfast"],
    cuisine: "American",
    cookingTime: 15,
    servingSize: 2,
    image: "https://example.com/keto-breakfast-plate.jpg",
    sourceUrl: "https://yourblog.com/keto-breakfast-plate-recipe"
  },
  {
    _id: "whole30-chicken-salad-1",
    apiId: "100032",
    title: "Whole30 Chicken Salad",
    ingredients: [
      { name: "chicken breast", quantity: 0, unit: "to taste", _id: "whole30-chicken-salad-ing-1" },
      { name: "mixed greens", quantity: 0, unit: "to taste", _id: "whole30-chicken-salad-ing-2" },
      { name: "vinaigrette", quantity: 0, unit: "to taste", _id: "whole30-chicken-salad-ing-3" },
      { name: "tomatoes", quantity: 0, unit: "to taste", _id: "whole30-chicken-salad-ing-4" }
    ],
    instructions: [
      { step: 1, text: "Grill chicken", _id: "whole30-chicken-salad-step-1" },
      { step: 2, text: "Slice", _id: "whole30-chicken-salad-step-2" },
      { step: 3, text: "Toss with greens and dressing", _id: "whole30-chicken-salad-step-3" }
    ],
    tags: ["lunch"],
    cuisine: "American",
    cookingTime: 25,
    servingSize: 4,
    image: "https://example.com/whole30-chicken-salad.jpg",
    sourceUrl: "https://yourblog.com/whole30-chicken-salad-recipe"
  },
  {
    _id: "vegan-buddha-bowl-1",
    apiId: "100033",
    title: "Vegan Buddha Bowl",
    ingredients: [
      { name: "quinoa", quantity: 0, unit: "to taste", _id: "vegan-buddha-bowl-ing-1" },
      { name: "spinach", quantity: 0, unit: "to taste", _id: "vegan-buddha-bowl-ing-2" },
      { name: "roasted sweet potato", quantity: 0, unit: "to taste", _id: "vegan-buddha-bowl-ing-3" },
      { name: "chickpeas", quantity: 0, unit: "to taste", _id: "vegan-buddha-bowl-ing-4" },
      { name: "tahini", quantity: 0, unit: "to taste", _id: "vegan-buddha-bowl-ing-5" }
    ],
    instructions: [
      { step: 1, text: "Cook quinoa", _id: "vegan-buddha-bowl-step-1" },
      { step: 2, text: "Roast veggies", _id: "vegan-buddha-bowl-step-2" },
      { step: 3, text: "Assemble bowl", _id: "vegan-buddha-bowl-step-3" }
    ],
    tags: ["lunch"],
    cuisine: "American",
    cookingTime: 30,
    servingSize: 3,
    image: "https://example.com/vegan-buddha-bowl.jpg",
    sourceUrl: "https://yourblog.com/vegan-buddha-bowl-recipe"
  },
  {
    _id: "pescetarian-paella-1",
    apiId: "100034",
    title: "Pescetarian Paella",
    ingredients: [
      { name: "rice", quantity: 0, unit: "to taste", _id: "pescetarian-paella-ing-1" },
      { name: "shrimp", quantity: 0, unit: "to taste", _id: "pescetarian-paella-ing-2" },
      { name: "mussels", quantity: 0, unit: "to taste", _id: "pescetarian-paella-ing-3" },
      { name: "peas", quantity: 0, unit: "to taste", _id: "pescetarian-paella-ing-4" },
      { name: "saffron", quantity: 0, unit: "to taste", _id: "pescetarian-paella-ing-5" }
    ],
    instructions: [
      { step: 1, text: "Cook rice", _id: "pescetarian-paella-step-1" },
      { step: 2, text: "Add seafood", _id: "pescetarian-paella-step-2" },
      { step: 3, text: "Simmer with spices", _id: "pescetarian-paella-step-3" }
    ],
    tags: ["dinner"],
    cuisine: "Spanish",
    cookingTime: 40,
    servingSize: 5,
    image: "https://example.com/pescetarian-paella.jpg",
    sourceUrl: "https://yourblog.com/pescetarian-paella-recipe"
  },
  {
    _id: "primal-steak-and-veggies-1",
    apiId: "100035",
    title: "Primal Steak & Veggies",
    ingredients: [
      { name: "steak", quantity: 0, unit: "to taste", _id: "primal-steak-and-veggies-ing-1" },
      { name: "zucchini", quantity: 0, unit: "to taste", _id: "primal-steak-and-veggies-ing-2" },
      { name: "bell peppers", quantity: 0, unit: "to taste", _id: "primal-steak-and-veggies-ing-3" },
      { name: "olive oil", quantity: 0, unit: "to taste", _id: "primal-steak-and-veggies-ing-4" },
      { name: "herbs", quantity: 0, unit: "to taste", _id: "primal-steak-and-veggies-ing-5" }
    ],
    instructions: [
      { step: 1, text: "Grill steak", _id: "primal-steak-and-veggies-step-1" },
      { step: 2, text: "Sauté veggies", _id: "primal-steak-and-veggies-step-2" },
      { step: 3, text: "Serve together", _id: "primal-steak-and-veggies-step-3" }
    ],
    tags: ["dinner"],
    cuisine: "American",
    cookingTime: 35,
    servingSize: 4,
    image: "https://example.com/primal-steak-and-veggies.jpg",
    sourceUrl: "https://yourblog.com/primal-steak-and-veggies-recipe"
  },
  {
    _id: "lacto-vegetarian-paneer-curry-1",
    apiId: "100036",
    title: "Lacto-Vegetarian Paneer Curry",
    ingredients: [
      { name: "paneer", quantity: 0, unit: "to taste", _id: "lacto-vegetarian-paneer-curry-ing-1" },
      { name: "peas", quantity: 0, unit: "to taste", _id: "lacto-vegetarian-paneer-curry-ing-2" },
      { name: "tomato sauce", quantity: 0, unit: "to taste", _id: "lacto-vegetarian-paneer-curry-ing-3" },
      { name: "spices", quantity: 0, unit: "to taste", _id: "lacto-vegetarian-paneer-curry-ing-4" },
      { name: "rice", quantity: 0, unit: "to taste", _id: "lacto-vegetarian-paneer-curry-ing-5" }
    ],
    instructions: [
      { step: 1, text: "Cook paneer", _id: "lacto-vegetarian-paneer-curry-step-1" },
      { step: 2, text: "Simmer sauce", _id: "lacto-vegetarian-paneer-curry-step-2" },
      { step: 3, text: "Add peas", _id: "lacto-vegetarian-paneer-curry-step-3" },
      { step: 4, text: "Serve with rice", _id: "lacto-vegetarian-paneer-curry-step-4" }
    ],
    tags: ["dinner"],
    cuisine: "Indian",
    cookingTime: 30,
    servingSize: 3,
    image: "https://example.com/lacto-vegetarian-paneer-curry.jpg",
    sourceUrl: "https://yourblog.com/lacto-vegetarian-paneer-curry-recipe"
  },
  {
    _id: "ovo-vegetarian-frittata-1",
    apiId: "100037",
    title: "Ovo-Vegetarian Frittata",
    ingredients: [
      { name: "eggs", quantity: 0, unit: "to taste", _id: "ovo-vegetarian-frittata-ing-1" },
      { name: "spinach", quantity: 0, unit: "to taste", _id: "ovo-vegetarian-frittata-ing-2" },
      { name: "cheese", quantity: 0, unit: "to taste", _id: "ovo-vegetarian-frittata-ing-3" },
      { name: "onion", quantity: 0, unit: "to taste", _id: "ovo-vegetarian-frittata-ing-4" }
    ],
    instructions: [
      { step: 1, text: "Beat eggs", _id: "ovo-vegetarian-frittata-step-1" },
      { step: 2, text: "Add veggies", _id: "ovo-vegetarian-frittata-step-2" },
      { step: 3, text: "Bake until set", _id: "ovo-vegetarian-frittata-step-3" }
    ],
    tags: ["breakfast"],
    cuisine: "Italian",
    cookingTime: 25,
    servingSize: 4,
    image: "https://example.com/ovo-vegetarian-frittata.jpg",
    sourceUrl: "https://yourblog.com/ovo-vegetarian-frittata-recipe"
  }
];

export default recipeTemplates;
  