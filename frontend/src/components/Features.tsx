
import { Sparkles, RotateCcw, Target, Clock } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Recipe Discovery",
      description: "Explore thousands of recipes with intelligent filtering based on your preferences, dietary restrictions, and cooking skills.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: RotateCcw,
      title: "No Repetition",
      description: "Our smart algorithm ensures you never get stuck in a meal rut by tracking what you've cooked and suggesting fresh alternatives.",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Target,
      title: "Customizable Criteria",
      description: "Set your preferences for prep time, serving size, cuisine type, and ingredients to get perfectly tailored meal suggestions.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Clock,
      title: "Time-Saving",
      description: "Streamline your weekly routine with automated meal planning and grocery list generation that saves hours of planning time.",
      color: "from-blue-500 to-blue-600"
    }
  ];

  return (
    <section id="features" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why choose <span className="text-emerald-600">MealMap</span>?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Take the guesswork out of meal planning with features designed to make cooking more enjoyable and less stressful.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
