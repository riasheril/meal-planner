import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Eye, EyeOff } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently
  } = useAuth0();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const authError = params.get("error_description");
  const { error } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">Welcome {user?.name}!</CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                You are successfully logged in
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl"
            >
              Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome back</CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Sign in to continue your meal planning journey
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          {authError && (
            <div className="text-red-600 text-center mb-4">
              {authError}
            </div>
          )}
          {error && (
            <div className="text-red-600 text-center mb-4">
              {error.message || "Authentication error. Please try again."}
            </div>
          )}
          <Button 
            onClick={() => loginWithRedirect()}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl"
          >
            Sign in with Auth0
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;