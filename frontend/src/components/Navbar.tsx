import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-emerald-600">
            Meal Planner
          </Link>
          
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <>
                <Link to="/recipes">
                  <Button variant="ghost">Recipes</Button>
                </Link>
                <Link to="/meal-plan">
                  <Button variant="ghost">Meal Plan</Button>
                </Link>
                <Button variant="ghost" onClick={() => logout()}>
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 