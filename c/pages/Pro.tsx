import { ArrowLeft, Star, Crown, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Pro = () => {
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
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-yellow-500 mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">GigFly Pro</h1>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Access hand-vetted talent and premium services for your most
            important projects
          </p>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg px-8 py-3">
            Explore Pro Services
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-yellow-50 rounded-lg">
            <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Elite Talent</h3>
            <p className="text-gray-600">
              Top 1% of freelancers, thoroughly vetted
            </p>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
            <p className="text-gray-600">
              Exceptional work with guaranteed satisfaction
            </p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Dedicated Support</h3>
            <p className="text-gray-600">
              Priority customer success management
            </p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Quick turnaround without compromising quality
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              What Makes Pro Different
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Rigorous Vetting Process
                  </h3>
                  <p className="text-gray-600">
                    Every Pro seller undergoes background checks, skill
                    assessments, and portfolio reviews
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Enhanced Communication
                  </h3>
                  <p className="text-gray-600">
                    Direct access to sellers with faster response times and
                    clearer project scoping
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Project Management Tools
                  </h3>
                  <p className="text-gray-600">
                    Advanced collaboration tools, milestone tracking, and
                    progress reporting
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Pro Categories
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Logo Design
                </h3>
                <p className="text-sm text-gray-600">500+ Pro designers</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Web Development
                </h3>
                <p className="text-sm text-gray-600">800+ Pro developers</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Digital Marketing
                </h3>
                <p className="text-sm text-gray-600">600+ Pro marketers</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Video Production
                </h3>
                <p className="text-sm text-gray-600">400+ Pro creators</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h3 className="font-semibold text-gray-900 mb-1">Writing</h3>
                <p className="text-sm text-gray-600">700+ Pro writers</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h3 className="font-semibold text-gray-900 mb-1">Consulting</h3>
                <p className="text-sm text-gray-600">300+ Pro consultants</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-8 text-white mb-12">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Success Stories</h2>
            <blockquote className="text-lg italic mb-4">
              "Working with GigFly Pro transformed our brand. The level of
              professionalism and quality exceeded our expectations."
            </blockquote>
            <p className="font-semibold">
              — Sarah Johnson, Marketing Director at TechCorp
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready for Pro-Level Results?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of businesses who trust GigFly Pro for their most
            critical projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Browse Pro Services
            </Button>
            <Button variant="outline">Become a Pro Seller</Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pro;
