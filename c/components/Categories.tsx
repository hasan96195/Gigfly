
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  Palette, 
  Code, 
  Megaphone, 
  Video, 
  PenTool, 
  Music, 
  Briefcase, 
  Lightbulb 
} from "lucide-react";

const categories = [
  {
    name: "Graphics & Design",
    icon: Palette,
    color: "bg-orange-100 text-orange-600",
    route: "graphic-design"
  },
  {
    name: "Programming & Tech",
    icon: Code,
    color: "bg-blue-100 text-blue-600",
    route: "programming"
  },
  {
    name: "Digital Marketing",
    icon: Megaphone,
    color: "bg-green-100 text-green-600",
    route: "digital-marketing"
  },
  {
    name: "Video & Animation",
    icon: Video,
    color: "bg-purple-100 text-purple-600",
    route: "video-animation"
  },
  {
    name: "Writing & Translation",
    icon: PenTool,
    color: "bg-yellow-100 text-yellow-600",
    route: "writing"
  },
  {
    name: "Music & Audio",
    icon: Music,
    color: "bg-pink-100 text-pink-600",
    route: "music"
  },
  {
    name: "Business",
    icon: Briefcase,
    color: "bg-indigo-100 text-indigo-600",
    route: "business"
  },
  {
    name: "Consulting",
    icon: Lightbulb,
    color: "bg-teal-100 text-teal-600",
    route: "consulting"
  }
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (route: string) => {
    navigate(`/category/${route}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Browse services by category
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleCategoryClick(category.route)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
