
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Clock, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CategoryDetails = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const categoryData = {
    "graphic-design": {
      title: "Graphics & Design",
      description: "Create stunning visual content that captivates your audience",
      stats: {
        sellers: "125K+",
        avgPrice: "$45",
        deliveryTime: "2-3 days",
        satisfaction: "4.8/5"
      },
      services: [
        "Logo Design",
        "Brand Identity",
        "Business Cards",
        "Flyers & Brochures",
        "Social Media Graphics",
        "Web Design",
        "Packaging Design",
        "Illustration"
      ],
      topSellers: [
        {
          name: "Alex_Designer",
          rating: 4.9,
          reviews: 2847,
          startingPrice: 25,
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        },
        {
          name: "Creative_Studio",
          rating: 5.0,
          reviews: 1923,
          startingPrice: 35,
          image: "https://images.unsplash.com/photo-1494790108755-2616b2e37caf?w=100&h=100&fit=crop&crop=face"
        },
        {
          name: "Design_Pro",
          rating: 4.8,
          reviews: 3156,
          startingPrice: 20,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        }
      ]
    },
    "programming": {
      title: "Programming & Tech",
      description: "Build powerful applications and technical solutions",
      stats: {
        sellers: "85K+",
        avgPrice: "$120",
        deliveryTime: "5-7 days",
        satisfaction: "4.9/5"
      },
      services: [
        "Website Development",
        "Mobile Apps",
        "WordPress",
        "E-commerce",
        "Database",
        "DevOps & Cloud",
        "Cybersecurity",
        "Data Science"
      ],
      topSellers: [
        {
          name: "CodeMaster_JS",
          rating: 4.9,
          reviews: 1847,
          startingPrice: 150,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        },
        {
          name: "WebDev_Expert",
          rating: 5.0,
          reviews: 923,
          startingPrice: 200,
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        }
      ]
    },
    "digital-marketing": {
      title: "Digital Marketing",
      description: "Grow your business with effective marketing strategies",
      stats: {
        sellers: "95K+",
        avgPrice: "$75",
        deliveryTime: "3-5 days",
        satisfaction: "4.7/5"
      },
      services: [
        "Social Media Marketing",
        "SEO",
        "Content Marketing",
        "PPC Advertising",
        "Email Marketing",
        "Influencer Marketing",
        "Market Research",
        "Brand Strategy"
      ],
      topSellers: [
        {
          name: "Marketing_Guru",
          rating: 4.8,
          reviews: 2156,
          startingPrice: 50,
          image: "https://images.unsplash.com/photo-1494790108755-2616b2e37caf?w=100&h=100&fit=crop&crop=face"
        }
      ]
    },
    "video-animation": {
      title: "Video & Animation",
      description: "Create engaging video content and stunning animations",
      stats: {
        sellers: "75K+",
        avgPrice: "$85",
        deliveryTime: "4-6 days",
        satisfaction: "4.9/5"
      },
      services: [
        "Video Editing",
        "Animation",
        "Motion Graphics",
        "Whiteboard Animation",
        "Video Production",
        "3D Animation",
        "Video Ads",
        "Explainer Videos"
      ],
      topSellers: [
        {
          name: "VideoMaster_Pro",
          rating: 4.9,
          reviews: 1456,
          startingPrice: 75,
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face"
        },
        {
          name: "AnimationStudio",
          rating: 5.0,
          reviews: 892,
          startingPrice: 120,
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        }
      ]
    },
    "writing": {
      title: "Writing & Translation",
      description: "Professional writing and accurate translation services",
      stats: {
        sellers: "65K+",
        avgPrice: "$35",
        deliveryTime: "2-4 days",
        satisfaction: "4.8/5"
      },
      services: [
        "Content Writing",
        "Copywriting",
        "Technical Writing",
        "Translation",
        "Proofreading",
        "Creative Writing",
        "Resume Writing",
        "Grant Writing"
      ],
      topSellers: [
        {
          name: "WordSmith_Expert",
          rating: 4.9,
          reviews: 2341,
          startingPrice: 25,
          image: "https://images.unsplash.com/photo-1494790108755-2616b2e37caf?w=100&h=100&fit=crop&crop=face"
        },
        {
          name: "Translation_Pro",
          rating: 4.8,
          reviews: 1567,
          startingPrice: 40,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        }
      ]
    },
    "music": {
      title: "Music & Audio",
      description: "Create amazing music and professional audio content",
      stats: {
        sellers: "45K+",
        avgPrice: "$65",
        deliveryTime: "3-5 days",
        satisfaction: "4.8/5"
      },
      services: [
        "Music Production",
        "Audio Editing",
        "Voice Over",
        "Sound Design",
        "Mixing & Mastering",
        "Podcast Editing",
        "Jingles & Intros",
        "Audio Transcription"
      ],
      topSellers: [
        {
          name: "AudioMaster_Studio",
          rating: 4.9,
          reviews: 1234,
          startingPrice: 50,
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        },
        {
          name: "VoiceOver_Pro",
          rating: 4.8,
          reviews: 987,
          startingPrice: 75,
          image: "https://images.unsplash.com/photo-1494790108755-2616b2e37caf?w=100&h=100&fit=crop&crop=face"
        }
      ]
    },
    "business": {
      title: "Business",
      description: "Professional business services to grow your company",
      stats: {
        sellers: "55K+",
        avgPrice: "$95",
        deliveryTime: "4-7 days",
        satisfaction: "4.7/5"
      },
      services: [
        "Business Plans",
        "Market Research",
        "Financial Planning",
        "Legal Consulting",
        "Virtual Assistant",
        "Business Cards",
        "Presentations",
        "Data Analysis"
      ],
      topSellers: [
        {
          name: "Business_Expert",
          rating: 4.9,
          reviews: 1876,
          startingPrice: 80,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        },
        {
          name: "Strategy_Consultant",
          rating: 4.8,
          reviews: 1345,
          startingPrice: 120,
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        }
      ]
    },
    "consulting": {
      title: "Consulting",
      description: "Expert consulting services for your business needs",
      stats: {
        sellers: "35K+",
        avgPrice: "$125",
        deliveryTime: "5-8 days",
        satisfaction: "4.9/5"
      },
      services: [
        "Strategy Consulting",
        "Management Consulting",
        "IT Consulting",
        "HR Consulting",
        "Marketing Consulting",
        "Financial Consulting",
        "Operations Consulting",
        "Change Management"
      ],
      topSellers: [
        {
          name: "ConsultPro_Expert",
          rating: 5.0,
          reviews: 967,
          startingPrice: 150,
          image: "https://images.unsplash.com/photo-1494790108755-2616b2e37caf?w=100&h=100&fit=crop&crop=face"
        },
        {
          name: "Strategy_Advisor",
          rating: 4.9,
          reviews: 743,
          startingPrice: 100,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        }
      ]
    }
  };

  const currentCategory = categoryData[category as keyof typeof categoryData];

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Button onClick={() => navigate("/")} className="bg-green-600 hover:bg-green-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{currentCategory.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{currentCategory.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{currentCategory.stats.sellers}</p>
                <p className="text-sm text-gray-600">Active Sellers</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{currentCategory.stats.deliveryTime}</p>
                <p className="text-sm text-gray-600">Avg Delivery</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{currentCategory.stats.satisfaction}</p>
                <p className="text-sm text-gray-600">Satisfaction</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{currentCategory.stats.avgPrice}</p>
                <p className="text-sm text-gray-600">Starting Price</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Popular Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {currentCategory.services.map((service, index) => (
                  <div key={index} className="bg-gray-100 p-3 rounded-lg text-center">
                    <span className="text-sm font-medium text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Rated Sellers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentCategory.topSellers.map((seller, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <img 
                      src={seller.image} 
                      alt={seller.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{seller.name}</h4>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">
                          {seller.rating} ({seller.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Starting at</p>
                      <p className="font-bold text-gray-900">${seller.startingPrice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryDetails;
