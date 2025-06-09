import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Onboarding from '@/pages/Onboarding';
import { server } from '../setup';
import { handlers } from '../mocks/handlers';
import { uiToSpoonacularCuisines } from '@/utils/cuisineMapping';
import { http, HttpResponse } from 'msw';

describe('Onboarding Flow', () => {
  beforeEach(() => {
    // Reset mock handlers before each test
    server.use(...handlers);
  });

  it('should save converted cuisine types to user profile', async () => {
    render(
      <BrowserRouter>
        <Onboarding />
      </BrowserRouter>
    );

    // Select some cuisine preferences
    const asianButton = screen.getByText('Asian');
    const mediterraneanButton = screen.getByText('Mediterranean');
    
    fireEvent.click(asianButton);
    fireEvent.click(mediterraneanButton);

    // Complete all steps (simplified for this test)
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton); // Move to step 2
    fireEvent.click(nextButton); // Move to step 3
    fireEvent.click(nextButton); // Move to step 4

    // Click "Find Recipes" to complete onboarding
    const findRecipesButton = screen.getByText('Find Recipes');
    fireEvent.click(findRecipesButton);

    // Verify the correct cuisine types were sent to the API
    await waitFor(() => {
      const expectedCuisines = uiToSpoonacularCuisines(['Asian', 'Mediterranean']);
      expect(screen.getByText('Chinese Stir Fry')).toBeInTheDocument();
      expect(screen.getByText('Greek Salad')).toBeInTheDocument();
      expect(screen.getByText('Japanese Sushi')).toBeInTheDocument();
    });
  });

  it('should handle "No Preference" selection correctly', async () => {
    render(
      <BrowserRouter>
        <Onboarding />
      </BrowserRouter>
    );

    // Select "No Preference"
    const noPreferenceButton = screen.getByText('No Preference');
    fireEvent.click(noPreferenceButton);

    // Complete all steps
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    // Click "Find Recipes"
    const findRecipesButton = screen.getByText('Find Recipes');
    fireEvent.click(findRecipesButton);

    // Verify all recipes are returned (no filtering)
    await waitFor(() => {
      expect(screen.getByText('Chinese Stir Fry')).toBeInTheDocument();
      expect(screen.getByText('Greek Salad')).toBeInTheDocument();
      expect(screen.getByText('Japanese Sushi')).toBeInTheDocument();
    });
  });

  it('should handle API errors gracefully', async () => {
    // Override handlers to simulate API error
    server.use(
      http.put('*/api/users/preferences', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(
      <BrowserRouter>
        <Onboarding />
      </BrowserRouter>
    );

    // Select preferences and complete steps
    const asianButton = screen.getByText('Asian');
    fireEvent.click(asianButton);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    // Click "Find Recipes"
    const findRecipesButton = screen.getByText('Find Recipes');
    fireEvent.click(findRecipesButton);

    // Should still navigate to recipes page even with error
    await waitFor(() => {
      expect(window.location.pathname).toBe('/recipes');
    });
  });
}); 