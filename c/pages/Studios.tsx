import { ArrowLeft, Play, Camera, Edit, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Studios = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            GigFly Studios
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Professional video production services for brands and creators
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3">
            Start Your Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <Camera className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Video Production</h3>
            <p className="text-gray-600">End-to-end video creation services</p>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <Edit className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Post-Production</h3>
            <p className="text-gray-600">Professional editing and effects</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Creative Teams</h3>
            <p className="text-gray-600">Dedicated project teams</p>
          </div>
          <div className="text-center p-6 bg-orange-50 rounded-lg">
            <Play className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">All Formats</h3>
            <p className="text-gray-600">Commercials, social media, and more</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Our Services
            </h2>
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Commercial Production
                </h3>
                <p className="text-gray-600 mb-3">
                  High-quality commercials for TV, web, and social media
                  platforms
                </p>
                <div className="text-sm text-gray-500">Starting at $5,000</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Explainer Videos
                </h3>
                <p className="text-gray-600 mb-3">
                  Engaging animated and live-action explainer videos
                </p>
                <div className="text-sm text-gray-500">Starting at $2,500</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Social Media Content
                </h3>
                <p className="text-gray-600 mb-3">
                  Tailored content for Instagram, TikTok, YouTube, and more
                </p>
                <div className="text-sm text-gray-500">Starting at $1,000</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Documentary Production
                </h3>
                <p className="text-gray-600 mb-3">
                  Professional documentary filming and post-production
                </p>
                <div className="text-sm text-gray-500">Starting at $10,000</div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Why Choose Studios
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Professional Quality
                  </h3>
                  <p className="text-gray-600">
                    Cinema-grade equipment and experienced crews
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Full-Service Production
                  </h3>
                  <p className="text-gray-600">
                    From concept to final delivery, we handle everything
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibual">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Global Reach
                  </h3>
                  <p className="text-gray-600">
                    Production teams available worldwide
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Fast Turnaround
                  </h3>
                  <p className="text-gray-600">
                    Efficient workflows for quick project completion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-8 text-white text-center mb-12">
          <h2 className="text-2xl font-semibold mb-4">Featured Work</h2>
          <p className="text-gray-300 mb-6">
            See how we've helped brands tell their stories through video
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="aspect-video bg-gray-700 rounded mb-3 flex items-center justify-center">
                <Play className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-1">Tech Startup Commercial</h3>
              <p className="text-sm text-gray-400">2.5M views • Award winner</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="aspect-video bg-gray-700 rounded mb-3 flex items-center justify-center">
                <Play className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-1">Fashion Brand Campaign</h3>
              <p className="text-sm text-gray-400">5M views • Viral success</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="aspect-video bg-gray-700 rounded mb-3 flex items-center justify-center">
                <Play className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-1">Product Launch Video</h3>
              <p className="text-sm text-gray-400">
                1.2M views • High conversion
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-gray-600 mb-6">
            Let's bring your vision to life with professional video production
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Get Started
            </Button>
            <Button variant="outline">View Portfolio</Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Studios;
