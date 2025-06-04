import { ChefHat } from "lucide-react";
import { Link } from "react-router-dom";
const Header = () => {
  return <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">MealMap</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Features
            </a>
            
            <Link to="/login" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Log In
            </Link>
          </nav>
        </div>
      </div>
    </header>;
};
export default Header;