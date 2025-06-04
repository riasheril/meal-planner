import { Button } from "@/components/ui/button";
import { ChefHat, Calendar, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
const Hero = () => {
  return <section className="pt-24 pb-16 px-6 gradient-bg min-h-screen flex items-center">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Meal planning,{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                re-invented
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              More flavor, less fuss. Efficiently explore new recipes and generate grocery lists 
              with customizable criteria that avoids recipe repetition.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/signup">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Start Planning
                </Button>
              </Link>
              
            </div>
          </div>
          
          {/* Feature Icons */}
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl hero-shadow animate-float">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Discover Recipes</h3>
              <p className="text-gray-600 text-center">Find new flavors and avoid repetition with smart recipe suggestions</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl hero-shadow animate-float" style={{
            animationDelay: '0.2s'
          }}>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Plan Your Week</h3>
              <p className="text-gray-600 text-center">Effortlessly organize your meals with customizable planning tools</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl hero-shadow animate-float" style={{
            animationDelay: '0.4s'
          }}>
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Grocery Lists</h3>
              <p className="text-gray-600 text-center">Auto-generate organized shopping lists from your meal plans</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;