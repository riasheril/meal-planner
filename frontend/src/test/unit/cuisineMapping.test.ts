import { describe, it, expect } from 'vitest';
import { uiToSpoonacularCuisines, spoonacularToUICuisines, UI_CUISINE_CATEGORIES } from '@/utils/cuisineMapping';

describe('Cuisine Mapping Functions', () => {
  describe('uiToSpoonacularCuisines', () => {
    it('should convert single UI category to Spoonacular cuisines', () => {
      expect(uiToSpoonacularCuisines(['Asian'])).toEqual([
        'chinese', 'japanese', 'korean', 'thai', 'vietnamese'
      ]);
    });

    it('should convert multiple UI categories to Spoonacular cuisines', () => {
      expect(uiToSpoonacularCuisines(['Asian', 'Mediterranean'])).toEqual([
        'chinese', 'japanese', 'korean', 'thai', 'vietnamese',
        'mediterranean', 'greek'
      ]);
    });

    it('should handle "No Preference" by returning empty array', () => {
      expect(uiToSpoonacularCuisines(['No Preference'])).toEqual([]);
    });

    it('should handle empty array', () => {
      expect(uiToSpoonacularCuisines([])).toEqual([]);
    });

    it('should handle multiple categories including "No Preference"', () => {
      expect(uiToSpoonacularCuisines(['Asian', 'No Preference'])).toEqual([]);
    });
  });

  describe('spoonacularToUICuisines', () => {
    it('should convert single Spoonacular cuisine to UI category', () => {
      expect(spoonacularToUICuisines(['chinese'])).toEqual(['Asian']);
    });

    it('should convert multiple Spoonacular cuisines to UI categories', () => {
      expect(spoonacularToUICuisines(['chinese', 'greek'])).toEqual(['Asian', 'Mediterranean']);
    });

    it('should handle empty array by returning ["No Preference"]', () => {
      expect(spoonacularToUICuisines([])).toEqual(['No Preference']);
    });

    it('should handle unknown cuisines by filtering them out', () => {
      expect(spoonacularToUICuisines(['unknown', 'chinese'])).toEqual(['Asian']);
    });

    it('should handle case-insensitive cuisine names', () => {
      expect(spoonacularToUICuisines(['CHINESE', 'Greek'])).toEqual(['Asian', 'Mediterranean']);
    });
  });

  describe('UI Categories', () => {
    it('should have all expected categories', () => {
      expect(UI_CUISINE_CATEGORIES).toEqual([
        'African & Caribbean',
        'American',
        'Asian',
        'European',
        'Latin American',
        'Mediterranean',
        'Middle Eastern',
        'No Preference'
      ]);
    });
  });
}); 