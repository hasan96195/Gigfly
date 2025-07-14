import { ArrowLeft, DollarSign, Users, TrendingUp, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Affiliates = () => {
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
            GigFly Affiliate Program
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Earn money by referring new users to GigFly
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3">
            Join the Program
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">High Commissions</h3>
            <p className="text-gray-600">
              Earn up to $150 per qualified referral
            </p>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Global Reach</h3>
            <p className="text-gray-600">
              Promote to millions of potential users worldwide
            </p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Growing Market</h3>
            <p className="text-gray-600">
              Freelance economy growing 15% year over year
            </p>
          </div>
          <div className="text-center p-6 bg-orange-50 rounded-lg">
            <Gift className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Bonus Rewards</h3>
            <p className="text-gray-600">
              Exclusive bonuses for top performers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              How It Works
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Sign Up</h3>
                  <p className="text-gray-600">
                    Join our affiliate program and get approved within 24 hours
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Promote</h3>
                  <p className="text-gray-600">
                    Share your unique referral links on your website, blog, or
                    social media
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Earn</h3>
                  <p className="text-gray-600">
                    Get paid for every qualified user who signs up and makes a
                    purchase
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Commission Structure
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">First Purchase (Buyers)</span>
                  <span className="font-semibold text-green-600">
                    $15 - $50
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">First Sale (Sellers)</span>
                  <span className="font-semibold text-green-600">
                    $50 - $150
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">GigFly Pro Referrals</span>
                  <span className="font-semibold text-green-600">
                    $100 - $200
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">GigFly Business</span>
                  <span className="font-semibold text-green-600">
                    $200 - $500
                  </span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-100 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Bonus:</strong> Earn 10% extra commission for
                  referring 50+ users per month
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Why Partner With GigFly?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">
                Trusted Brand
              </h3>
              <p className="text-gray-600">
                GigFly is a recognized leader in the freelance marketplace
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">
                Marketing Support
              </h3>
              <p className="text-gray-600">
                Access to banners, landing pages, and promotional materials
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">
                Real-time Tracking
              </h3>
              <p className="text-gray-600">
                Monitor your performance with detailed analytics and reporting
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of affiliates who are already earning with GigFly
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3">
            Apply Now
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Affiliates;
