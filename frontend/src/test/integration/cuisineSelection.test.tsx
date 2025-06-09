import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Onboarding from '@/pages/Onboarding';
import { server } from '../setup';
import { handlers, apiCalls } from '../mocks/handlers';
import { uiToSpoonacularCuisines } from '@/utils/cuisineMapping';

// Mock Auth0 for our test user
vi.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    isAuthenticated: true,
    isLoading: false,
    getAccessTokenSilently: vi.fn().mockResolvedValue('mock-token'),
    loginWithRedirect: vi.fn(),
    user: {
      email: 'testuser@example.com',
      sub: 'auth0|test-user-id'
    }
  }),
}));

describe('Basic Cuisine Selection', () => {
  beforeEach(() => {
    // Reset mock handlers and API calls before each test
    server.use(...handlers);
    apiCalls.preferences = [];
    apiCalls.recipeDiscovery = [];
  });

  it('should save selected cuisines and return matching recipes', async () => {
    // Render the Onboarding component
    render(
      <BrowserRouter>
        <Onboarding />
      </BrowserRouter>
    );

    // Step 1: Select cuisine preferences
    const asianButton = screen.getByText('Asian');
    const mediterraneanButton = screen.getByText('Mediterranean');
    
    // Verify initial state - buttons should have outline variant
    expect(asianButton).toHaveClass('border-input', 'bg-background');
    expect(mediterraneanButton).toHaveClass('border-input', 'bg-background');

    // Select cuisines
    fireEvent.click(asianButton);
    fireEvent.click(mediterraneanButton);

    // Verify selection state - buttons should have default variant and emerald background
    await waitFor(() => {
      expect(asianButton).toHaveClass('bg-emerald-600');
      expect(mediterraneanButton).toHaveClass('bg-emerald-600');
    });

    // Move to next step
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // Step 2: Select dietary restrictions
    const vegetarianButton = screen.getByText('Vegetarian');
    fireEvent.click(vegetarianButton);
    fireEvent.click(nextButton);

    // Step 3: Select cooking time
    const hungryButton = screen.getByText('Hungry (20 - 40 mins)');
    fireEvent.click(hungryButton);
    fireEvent.click(nextButton);

    // Step 4: Set serving size (default is 2, so we can just proceed)
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    fireEvent.click(incrementButton);
    fireEvent.click(nextButton);

    // Wait for and click "Find Recipes" button
    const findRecipesButton = await screen.findByRole('button', { name: /find recipes/i });
    fireEvent.click(findRecipesButton);

    // Verify API calls and results
    await waitFor(() => {
      // Verify preferences were saved correctly
      expect(apiCalls.preferences).toHaveLength(1);
      const savedPreferences = apiCalls.preferences[0].preferences;
      expect(savedPreferences.cuisineTypes).toEqual(
        uiToSpoonacularCuisines(['Asian', 'Mediterranean'])
      );

      // Verify recipe discovery API call
      expect(apiCalls.recipeDiscovery).toHaveLength(1);
      const discoveryRequest = apiCalls.recipeDiscovery[0];
      expect(discoveryRequest.cuisineTypes).toEqual(
        uiToSpoonacularCuisines(['Asian', 'Mediterranean'])
      );

      // Verify recipe results match selected cuisines
      expect(screen.getByText('Chinese Stir Fry')).toBeInTheDocument();
      expect(screen.getByText('Greek Salad')).toBeInTheDocument();
      expect(screen.getByText('Japanese Sushi')).toBeInTheDocument();
    });

    // Verify navigation to recipes page
    expect(window.location.pathname).toBe('/recipes');
  });
}); 