import { ArrowLeft, Play, Calendar, Clock, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Podcast = () => {
  const navigate = useNavigate();

  const episodes = [
    {
      id: 1,
      title: "Building a Million Dollar Freelance Business",
      guest: "Sarah Johnson, Top-Rated Seller",
      duration: "45 min",
      date: "Dec 15, 2025",
      description:
        "Learn how Sarah built her graphic design business from zero to seven figures on GigFly.",
      listens: "25.4K",
    },
    {
      id: 2,
      title: "The Future of Remote Work and Freelancing",
      guest: "Dr. Michael Chen, Work Futurist",
      duration: "38 min",
      date: "Dec 8, 2025",
      description:
        "Exploring emerging trends and predictions for the future of freelance work.",
      listens: "18.7K",
    },
    {
      id: 3,
      title: "Mastering Client Relationships",
      guest: "Emma Davis, Business Coach",
      duration: "42 min",
      date: "Dec 1, 2025",
      description:
        "Expert tips on building lasting relationships with clients and growing your business.",
      listens: "22.1K",
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
            The GigFly Podcast
          </h1>
          <p className="text-xl text-gray-600">
            Stories, insights, and advice from successful freelancers and
            industry experts
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-8 mb-8 text-white">
          <div className="flex items-center mb-4">
            <Headphones className="h-8 w-8 mr-3" />
            <span className="text-lg font-semibold">Latest Episode</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">{episodes[0].title}</h2>
          <p className="text-green-100 mb-4">with {episodes[0].guest}</p>
          <div className="flex items-center space-x-6 mb-6">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{episodes[0].duration}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{episodes[0].date}</span>
            </div>
            <div className="flex items-center">
              <Headphones className="h-4 w-4 mr-1" />
              <span>{episodes[0].listens} listens</span>
            </div>
          </div>
          <Button className="bg-white text-green-600 hover:bg-gray-100">
            <Play className="h-4 w-4 mr-2" />
            Listen Now
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Recent Episodes
            </h2>
            <div className="space-y-6">
              {episodes.slice(1).map((episode) => (
                <div
                  key={episode.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                      <Play className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {episode.title}
                      </h3>
                      <p className="text-green-600 font-medium mb-2">
                        with {episode.guest}
                      </p>
                      <p className="text-gray-600 mb-4">
                        {episode.description}
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{episode.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{episode.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Headphones className="h-4 w-4 mr-1" />
                          <span>{episode.listens} listens</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Listen
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Subscribe</h3>
              <p className="text-gray-600 mb-4">
                Never miss an episode. Get the latest freelancing insights
                delivered to your favorite podcast app.
              </p>
              <div className="space-y-2">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Apple Podcasts
                </Button>
                <Button variant="outline" className="w-full">
                  Spotify
                </Button>
                <Button variant="outline" className="w-full">
                  Google Podcasts
                </Button>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Be a Guest</h3>
              <p className="text-gray-600 mb-4">
                Have an inspiring freelance story to share? We'd love to feature
                you on our podcast.
              </p>
              <Button
                variant="outline"
                className="w-full text-blue-600 border-blue-600 hover:bg-blue-100"
              >
                Apply to be a Guest
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Podcast;
