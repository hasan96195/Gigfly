import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Blog = () => {
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Creating a Winning Freelance Profile",
      excerpt:
        "Learn how to craft a profile that attracts clients and showcases your expertise effectively.",
      author: "Sarah Johnson",
      date: "Dec 15, 2025",
      category: "Freelancing",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "The Future of Remote Work and Freelancing",
      excerpt:
        "Explore emerging trends and opportunities in the rapidly evolving freelance economy.",
      author: "Mike Chen",
      date: "Dec 12, 2025",
      category: "Industry Trends",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      title: "How to Price Your Services Competitively",
      excerpt:
        "Master the art of pricing to maximize your earnings while staying competitive.",
      author: "Emily Davis",
      date: "Dec 10, 2025",
      category: "Business Tips",
      image: "/placeholder.svg",
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">GigFly Blog</h1>
          <p className="text-xl text-gray-600">
            Insights, tips, and stories from the freelance community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <Tag className="h-4 w-4 mr-1 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    {post.category}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-green-600 cursor-pointer">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <Button
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  Read More
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Load More Posts
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
