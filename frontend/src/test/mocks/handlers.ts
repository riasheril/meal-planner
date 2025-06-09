import { http, HttpResponse } from 'msw';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const TEST_USER_ID = '68430c508d891d5d74fae043';

interface UserPreferences {
  cuisineTypes: string[];
  dietaryRestrictions: string[];
  cookingTime: number;
  servingSize: number;
}

interface PreferencesRequest {
  preferences: UserPreferences;
}

interface Recipe {
  id: string;
  title: string;
  cuisine: string;
  cookingTime: number;
  servingSize: number;
}

interface RecipeDiscoveryRequest {
  cuisineTypes: string[];
  dietaryRestrictions: string[];
  cookingTime: number;
  servingSize: number;
}

// Mock recipe data
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Chinese Stir Fry',
    cuisine: 'chinese',
    cookingTime: 30,
    servingSize: 4,
    // ... other recipe fields
  },
  {
    id: '2',
    title: 'Greek Salad',
    cuisine: 'greek',
    cookingTime: 15,
    servingSize: 2,
    // ... other recipe fields
  },
  {
    id: '3',
    title: 'Japanese Sushi',
    cuisine: 'japanese',
    cookingTime: 45,
    servingSize: 4,
    // ... other recipe fields
  }
];

// Mock user profile
const mockUserProfile = {
  _id: TEST_USER_ID,
  email: 'testuser@example.com',
  preferences: {
    cuisineTypes: [] as string[],
    dietaryRestrictions: [] as string[],
    cookingTime: 30,
    servingSize: 2
  }
};

// Keep track of API calls for verification
export const apiCalls = {
  preferences: [] as PreferencesRequest[],
  recipeDiscovery: [] as RecipeDiscoveryRequest[]
};

export const handlers = [
  // Update user preferences
  http.put(`${API_URL}/api/users/preferences`, async ({ request }) => {
    const body = await request.json() as PreferencesRequest;
    
    // Verify request structure
    if (!body.preferences || !body.preferences.cuisineTypes) {
      return new HttpResponse(null, { status: 400 });
    }

    // Store API call for verification
    apiCalls.preferences.push(body);

    // Update mock profile
    mockUserProfile.preferences = body.preferences;

    return HttpResponse.json({ 
      success: true, 
      preferences: mockUserProfile.preferences 
    });
  }),

  // Get user preferences
  http.get(`${API_URL}/api/users/preferences`, () => {
    return HttpResponse.json(mockUserProfile.preferences);
  }),

  // Recipe discovery
  http.post(`${API_URL}/api/recipes/discover`, async ({ request }) => {
    const body = await request.json() as RecipeDiscoveryRequest;
    
    // Store API call for verification
    apiCalls.recipeDiscovery.push(body);

    // Filter recipes based on cuisine types
    const filteredRecipes = mockRecipes.filter(recipe => 
      body.cuisineTypes.length === 0 || // No Preference case
      body.cuisineTypes.includes(recipe.cuisine)
    );

    return HttpResponse.json({
      recipes: filteredRecipes,
      total: filteredRecipes.length
    });
  }),

  // Reset test user preferences
  http.post(`${API_URL}/api/users/${TEST_USER_ID}/reset`, () => {
    mockUserProfile.preferences = {
      cuisineTypes: [],
      dietaryRestrictions: [],
      cookingTime: 30,
      servingSize: 2
    };
    apiCalls.preferences = [];
    apiCalls.recipeDiscovery = [];
    return HttpResponse.json({ success: true });
  }),

  // Error handler for testing error scenarios
  http.all('*', () => {
    return new HttpResponse(null, { status: 500 });
  })
]; 