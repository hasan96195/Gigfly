import { ArrowLeft, Lightbulb, Heart, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Inspiration = () => {
  const navigate = useNavigate();

  const stories = [
    {
      id: 1,
      title: "From $5 Gigs to $100K Agency",
      author: "Maria Rodriguez",
      category: "Success Story",
      image: "/placeholder.svg",
      excerpt:
        "How one freelancer built a thriving design agency starting with simple logo designs on GigFly.",
      likes: 234,
      featured: true,
    },
    {
      id: 2,
      title: "The Writer Who Quit Her Day Job",
      author: "Sarah Chen",
      category: "Career Change",
      image: "/placeholder.svg",
      excerpt:
        "From corporate lawyer to full-time freelance writer earning six figures.",
      likes: 189,
      featured: false,
    },
    {
      id: 3,
      title: "Building a Global Remote Team",
      author: "Ahmed Hassan",
      category: "Business Growth",
      image: "/placeholder.svg",
      excerpt:
        "How one developer scaled from solo freelancer to managing a team of 15 across 8 countries.",
      likes: 156,
      featured: true,
    },
    {
      id: 4,
      title: "The Creative Comeback Story",
      author: "Lisa Park",
      category: "Inspiration",
      image: "/placeholder.svg",
      excerpt:
        "Rebuilding a career in graphic design after a 10-year break from the industry.",
      likes: 278,
      featured: false,
    },
  ];

  const categories = [
    { name: "Success Stories", count: 24, icon: Award },
    { name: "Career Changes", count: 18, icon: TrendingUp },
    { name: "Creative Journey", count: 15, icon: Lightbulb },
    { name: "Business Growth", count: 12, icon: Heart },
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
            Get Inspired
          </h1>
          <p className="text-xl text-gray-600">
            Real stories from freelancers who turned their dreams into reality
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Featured Stories */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Featured Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stories
                  .filter((story) => story.featured)
                  .map((story) => (
                    <article
                      key={story.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                            {story.category}
                          </span>
                          <div className="flex items-center text-gray-500">
                            <Heart className="h-4 w-4 mr-1" />
                            <span className="text-sm">{story.likes}</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-purple-600 cursor-pointer">
                          {story.title}
                        </h3>

                        <p className="text-gray-600 mb-4">{story.excerpt}</p>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            by {story.author}
                          </span>
                          <Button
                            variant="outline"
                            className="text-purple-600 border-purple-600 hover:bg-purple-50"
                          >
                            Read Story
                          </Button>
                        </div>
                      </div>
                    </article>
                  ))}
              </div>
            </div>

            {/* All Stories */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                More Stories
              </h2>
              <div className="space-y-6">
                {stories
                  .filter((story) => !story.featured)
                  .map((story) => (
                    <article
                      key={story.id}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={story.image}
                          alt={story.title}
                          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                              {story.category}
                            </span>
                            <div className="flex items-center text-gray-500">
                              <Heart className="h-4 w-4 mr-1" />
                              <span className="text-sm">{story.likes}</span>
                            </div>
                          </div>

                          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-green-600 cursor-pointer">
                            {story.title}
                          </h3>

                          <p className="text-gray-600 mb-3">{story.excerpt}</p>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              by {story.author}
                            </span>
                            <Button
                              variant="outline"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                            >
                              Read Story
                            </Button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Load More Stories
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
                        <IconComponent className="h-5 w-5 text-purple-600" />
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

            <div className="bg-purple-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Share Your Story
              </h3>
              <p className="text-gray-600 mb-4">
                Have an inspiring freelance journey? We'd love to feature your
                story and inspire others.
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Submit Your Story
              </Button>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Weekly Newsletter
              </h3>
              <p className="text-gray-600 mb-4">
                Get weekly inspiration and success stories delivered to your
                inbox.
              </p>
              <Button
                variant="outline"
                className="w-full text-green-600 border-green-600 hover:bg-green-100"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Inspiration;
