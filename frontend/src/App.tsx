import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Recipes from "./pages/Recipes";
import MealPlan from "./pages/MealPlan";
import NotFound from "./pages/NotFound";
import { useAuth0 } from '@auth0/auth0-react';

const queryClient = new QueryClient();

const App = () => {
  const { loginWithRedirect, isAuthenticated, user, logout, getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    const token = await getAccessTokenSilently();
    const response = await fetch('http://localhost:3000/api/recipes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/meal-plan" element={<MealPlan />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <div>
          {!isAuthenticated ? (
            <button onClick={() => loginWithRedirect()}>Log In</button>
          ) : (
            <div>
              <p>Welcome, {user?.name}</p>
              <button onClick={() => logout()}>Log Out</button>
            </div>
          )}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
