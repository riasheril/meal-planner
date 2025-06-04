
import { GroceryItem } from "@/types/meal-plan";

export const mockGroceryItems: GroceryItem[] = [
  // Proteins
  { id: 1, name: "Chicken Breast", category: "Proteins", purchased: false, quantity: "2 lbs", usedIn: ["Caesar Wrap", "Thai Green Curry"] },
  { id: 2, name: "Salmon Fillets", category: "Proteins", purchased: false, quantity: "4 pieces", usedIn: ["Honey Garlic Salmon"] },
  { id: 3, name: "Beef Strips", category: "Proteins", purchased: false, quantity: "1 lb", usedIn: ["Beef Stir-Fry"] },
  
  // Vegetables
  { id: 4, name: "Mixed Greens", category: "Vegetables", purchased: false, quantity: "2 bags", usedIn: ["Mediterranean Chickpea Salad", "Caesar Wrap"] },
  { id: 5, name: "Bell Peppers", category: "Vegetables", purchased: false, quantity: "4 pieces", usedIn: ["Thai Green Curry", "Beef Stir-Fry"] },
  { id: 6, name: "Onions", category: "Vegetables", purchased: false, quantity: "3 large", usedIn: ["Creamy Mushroom Risotto", "Beef Stir-Fry"] },
  { id: 7, name: "Garlic", category: "Vegetables", purchased: false, quantity: "2 heads", usedIn: ["Honey Garlic Salmon", "Creamy Mushroom Risotto"] },
  { id: 8, name: "Cucumber", category: "Vegetables", purchased: false, quantity: "2 pieces", usedIn: ["Mediterranean Chickpea Salad"] },
  { id: 9, name: "Cherry Tomatoes", category: "Vegetables", purchased: false, quantity: "1 container", usedIn: ["Mediterranean Chickpea Salad", "Margherita Pizza"] },
  { id: 10, name: "Mixed Mushrooms", category: "Vegetables", purchased: false, quantity: "1 lb", usedIn: ["Creamy Mushroom Risotto"] },
  { id: 11, name: "Fresh Basil", category: "Vegetables", purchased: false, quantity: "1 bunch", usedIn: ["Margherita Pizza", "Thai Green Curry"] },
  { id: 12, name: "Romaine Lettuce", category: "Vegetables", purchased: false, quantity: "2 heads", usedIn: ["Caesar Wrap"] },
  
  // Pantry
  { id: 13, name: "Olive Oil", category: "Pantry", purchased: false, quantity: "1 bottle", usedIn: ["Mediterranean dishes"] },
  { id: 14, name: "Soy Sauce", category: "Pantry", purchased: false, quantity: "1 bottle", usedIn: ["Asian dishes"] },
  { id: 15, name: "Arborio Rice", category: "Pantry", purchased: false, quantity: "2 lbs", usedIn: ["Creamy Mushroom Risotto"] },
  { id: 16, name: "Chickpeas", category: "Pantry", purchased: false, quantity: "2 cans", usedIn: ["Mediterranean Chickpea Salad"] },
  { id: 17, name: "Coconut Milk", category: "Pantry", purchased: false, quantity: "2 cans", usedIn: ["Thai Green Curry"] },
  { id: 18, name: "Green Curry Paste", category: "Pantry", purchased: false, quantity: "1 jar", usedIn: ["Thai Green Curry"] },
  { id: 19, name: "Honey", category: "Pantry", purchased: false, quantity: "1 bottle", usedIn: ["Honey Garlic Salmon"] },
  { id: 20, name: "Fettuccine Pasta", category: "Pantry", purchased: false, quantity: "2 boxes", usedIn: ["Pasta dishes"] },
  
  // Dairy
  { id: 21, name: "Feta Cheese", category: "Dairy", purchased: false, quantity: "1 container", usedIn: ["Mediterranean Chickpea Salad"] },
  { id: 22, name: "Parmesan Cheese", category: "Dairy", purchased: false, quantity: "1 block", usedIn: ["Creamy Mushroom Risotto", "Caesar Wrap"] },
  { id: 23, name: "Mozzarella Cheese", category: "Dairy", purchased: false, quantity: "8 oz", usedIn: ["Margherita Pizza"] },
  { id: 24, name: "Heavy Cream", category: "Dairy", purchased: false, quantity: "1 container", usedIn: ["Creamy Mushroom Risotto"] },
  
  // Bakery
  { id: 25, name: "Tortillas", category: "Bakery", purchased: false, quantity: "1 pack", usedIn: ["Caesar Wrap"] },
  { id: 26, name: "Pizza Dough", category: "Bakery", purchased: false, quantity: "2 pieces", usedIn: ["Margherita Pizza"] }
];
