
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Search, TrendingUp, Users, Award } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  const handlePopularSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const popularSearches = [
    { label: "Website Design", query: "website design", icon: "🎨" },
    { label: "WordPress", query: "wordpress", icon: "💻" },
    { label: "Logo Design", query: "logo design", icon: "🎯" },
    { label: "Video Editing", query: "video editing", icon: "🎬" },
    { label: "Mobile App", query: "mobile app", icon: "📱" },
    { label: "SEO", query: "seo", icon: "📈" }
  ];

  const stats = [
    { icon: Users, label: "Active Freelancers", value: "50K+" },
    { icon: Award, label: "Projects Completed", value: "100K+" },
    { icon: TrendingUp, label: "Success Rate", value: "98%" }
  ];

  return (
    <section className="relative bg-gradient-to-br from-green-600 via-green-500 to-blue-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Find the perfect{" "}
            <span className="relative">
              <em className="text-yellow-300 not-italic">freelance</em>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow-300 rounded-full transform rotate-1"></div>
            </span>
            <br />
            services for your business
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-green-100 max-w-3xl mx-auto leading-relaxed">
            Connect with talented freelancers worldwide and bring your projects to life
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="bg-white rounded-2xl p-3 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex-1 w-full">
                  <SearchBar 
                    placeholder="What service are you looking for today?"
                    size="lg"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
              <span className="text-green-100 font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Popular:
              </span>
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 transform text-sm font-medium flex items-center gap-2 border border-white/20 cursor-pointer"
                  onClick={() => handlePopularSearch(search.query)}
                >
                  <span>{search.icon}</span>
                  {search.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-3">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-green-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-16 fill-white">
          <path d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
