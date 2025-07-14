import { ArrowLeft, BookOpen, Users, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Guides = () => {
  const navigate = useNavigate();

  const guides = [
    {
      id: 1,
      title: "The Complete Guide to Freelancing Success",
      description:
        "Everything you need to know to build a thriving freelance career",
      category: "Getting Started",
      readTime: "15 min read",
      rating: 4.9,
      readers: "25.4K",
    },
    {
      id: 2,
      title: "Pricing Your Services: A Strategic Approach",
      description:
        "Master the art of pricing to maximize your earnings and attract quality clients",
      category: "Business",
      readTime: "12 min read",
      rating: 4.8,
      readers: "18.7K",
    },
    {
      id: 3,
      title: "Building Your Personal Brand as a Freelancer",
      description:
        "Stand out in the marketplace with a strong, authentic personal brand",
      category: "Marketing",
      readTime: "10 min read",
      rating: 4.7,
      readers: "22.1K",
    },
    {
      id: 4,
      title: "Client Communication Best Practices",
      description:
        "Build lasting relationships and ensure project success with effective communication",
      category: "Client Relations",
      readTime: "8 min read",
      rating: 4.9,
      readers: "19.3K",
    },
    {
      id: 5,
      title: "Scaling Your Freelance Business",
      description: "Transform from solo freelancer to successful agency owner",
      category: "Growth",
      readTime: "20 min read",
      rating: 4.6,
      readers: "12.8K",
    },
    {
      id: 6,
      title: "Portfolio Optimization for Maximum Impact",
      description:
        "Showcase your work effectively to win more clients and higher-paying projects",
      category: "Portfolio",
      readTime: "11 min read",
      rating: 4.8,
      readers: "16.5K",
    },
  ];

  const categories = [
    { name: "Getting Started", count: 15, icon: BookOpen },
    { name: "Business", count: 23, icon: TrendingUp },
    { name: "Marketing", count: 18, icon: Users },
    { name: "Client Relations", count: 12, icon: Star },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            GigFly Guides
          </h1>
          <p className="text-xl text-gray-600">
            Expert insights and practical advice to grow your freelance business
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {guides.map((guide) => (
                <article
                  key={guide.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                        {guide.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {guide.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-green-600 cursor-pointer">
                      {guide.title}
                    </h2>

                    <p className="text-gray-600 mb-4">{guide.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span>{guide.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{guide.readers}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        Read Guide
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Load More Guides
              </Button>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Browse by Category
              </h3>
              <div className="space-y-3">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <div
                      key={category.name}
                      className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-gray-900">
                          {category.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {category.count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Free Resources
              </h3>
              <p className="text-gray-600 mb-4">
                Download our comprehensive freelancer toolkit with templates,
                checklists, and more.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Download Toolkit
              </Button>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Join Our Community
              </h3>
              <p className="text-gray-600 mb-4">
                Connect with thousands of freelancers sharing tips, experiences,
                and support.
              </p>
              <Button
                variant="outline"
                className="w-full text-blue-600 border-blue-600 hover:bg-blue-100"
              >
                Join Forum
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Guides;
