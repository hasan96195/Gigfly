import {
  ArrowLeft,
  MessageSquare,
  Users,
  TrendingUp,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Forum = () => {
  const navigate = useNavigate();

  const forumCategories = [
    {
      id: 1,
      title: "Getting Started",
      description:
        "New to GigFly? Ask questions and get help from the community",
      posts: 2847,
      members: 15673,
      icon: Star,
    },
    {
      id: 2,
      title: "Seller Discussion",
      description: "Tips, strategies, and experiences from fellow sellers",
      posts: 5621,
      members: 8934,
      icon: TrendingUp,
    },
    {
      id: 3,
      title: "Buyer Discussion",
      description: "Share experiences and get advice on buying services",
      posts: 3456,
      members: 12456,
      icon: Users,
    },
    {
      id: 4,
      title: "Feature Requests",
      description: "Suggest new features and improvements for GigFly",
      posts: 1234,
      members: 5678,
      icon: MessageSquare,
    },
  ];

  const recentTopics = [
    {
      id: 1,
      title: "How to optimize gig descriptions for better visibility?",
      author: "DesignPro22",
      replies: 24,
      views: 345,
      lastActivity: "2 hours ago",
    },
    {
      id: 2,
      title: "Best practices for client communication",
      author: "WriterExpert",
      replies: 18,
      views: 267,
      lastActivity: "4 hours ago",
    },
    {
      id: 3,
      title: "Pricing strategies that actually work",
      author: "MarketingGuru",
      replies: 31,
      views: 523,
      lastActivity: "6 hours ago",
    },
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
            GigFly Community Forum
          </h1>
          <p className="text-xl text-gray-600">
            Connect with fellow freelancers, share experiences, and get expert
            advice
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Forum Categories
            </h2>
            <div className="space-y-4">
              {forumCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <div
                    key={category.id}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <IconComponent className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {category.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {category.description}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span>{category.posts.toLocaleString()} posts</span>
                          <span>
                            {category.members.toLocaleString()} members
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Recent Topics
            </h2>
            <div className="space-y-4">
              {recentTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                    {topic.title}
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>by {topic.author}</p>
                    <div className="flex items-center justify-between">
                      <span>
                        {topic.replies} replies • {topic.views} views
                      </span>
                    </div>
                    <p className="text-gray-500">{topic.lastActivity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Join the Discussion
              </h3>
              <p className="text-gray-600 mb-4">
                Connect with over 50,000 freelancers worldwide
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Forum;
