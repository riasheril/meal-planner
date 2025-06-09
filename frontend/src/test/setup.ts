import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { setupServer } from 'msw/node';
import { http } from 'msw';

// Create MSW server instance
export const server = setupServer();

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Close server after all tests
afterAll(() => server.close());

// Mock Auth0
vi.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    isAuthenticated: true,
    isLoading: false,
    getAccessTokenSilently: vi.fn().mockResolvedValue('mock-token'),
    loginWithRedirect: vi.fn(),
  }),
})); 