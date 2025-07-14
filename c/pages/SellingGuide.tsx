import { ArrowLeft, DollarSign, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SellingGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="prose max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Selling on GigFly
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Earn Money</h3>
              <p className="text-gray-600">
                Set your own prices and earn up to $10,000+
              </p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Build Reputation</h3>
              <p className="text-gray-600">
                Get reviews and become a top-rated seller
              </p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Grow Your Business</h3>
              <p className="text-gray-600">Scale from freelancer to agency</p>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Getting Started
              </h2>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>
                  Complete your profile with a professional photo and
                  description
                </li>
                <li>Create your first gig with clear title and description</li>
                <li>Set competitive pricing for your market</li>
                <li>Add portfolio samples to showcase your work</li>
                <li>Publish your gig and start promoting it</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Creating Successful Gigs
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Write Clear Titles
                  </h3>
                  <p className="text-gray-600">
                    Use specific keywords that buyers search for. Include your
                    skill and what you deliver.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Detailed Descriptions
                  </h3>
                  <p className="text-gray-600">
                    Explain exactly what you offer, your process, and what
                    buyers can expect.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Professional Images
                  </h3>
                  <p className="text-gray-600">
                    Use high-quality images that represent your service and
                    catch attention.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Pricing Strategies
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Research competitor pricing in your category</li>
                <li>Start with competitive rates to build reviews</li>
                <li>Offer multiple packages (Basic, Standard, Premium)</li>
                <li>Include extras for additional revenue</li>
                <li>Gradually increase prices as you gain experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Best Practices
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Respond to messages within 24 hours</li>
                <li>Deliver work on time or early</li>
                <li>Communicate clearly with buyers</li>
                <li>Ask for reviews after successful deliveries</li>
                <li>Continuously improve your skills</li>
                <li>Stay active and update your gigs regularly</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SellingGuide;
