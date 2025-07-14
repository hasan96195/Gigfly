import { ArrowLeft, Search, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BuyingGuide = () => {
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
            Buying on GigFly
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Search className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Find Services</h3>
              <p className="text-gray-600">
                Browse millions of services from expert freelancers
              </p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
              <p className="text-gray-600">
                Protected payments with money-back guarantee
              </p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Get work done quickly with clear deadlines
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                How to Buy
              </h2>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>Search for the service you need</li>
                <li>Compare sellers, reviews, and portfolios</li>
                <li>Contact sellers with any questions</li>
                <li>Choose your package and place an order</li>
                <li>Collaborate with your seller</li>
                <li>Receive your completed work</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Choosing the Right Seller
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Check Reviews & Ratings
                  </h3>
                  <p className="text-gray-600">
                    Look for sellers with high ratings and positive reviews from
                    previous buyers.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Review Portfolio
                  </h3>
                  <p className="text-gray-600">
                    Examine their previous work samples to ensure they match
                    your quality expectations.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Communication Style
                  </h3>
                  <p className="text-gray-600">
                    Contact sellers before ordering to gauge their
                    responsiveness and understanding.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Order Process
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide clear and detailed requirements</li>
                <li>Include reference materials or examples</li>
                <li>Set realistic deadlines with your seller</li>
                <li>Make payment through GigFly's secure system</li>
                <li>Track progress through the order page</li>
                <li>Request revisions if needed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                After Delivery
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Review the delivered work carefully</li>
                <li>Request revisions within the allowed timeframe</li>
                <li>Accept the delivery once satisfied</li>
                <li>Leave a helpful review for the seller</li>
                <li>Consider hiring the seller again for future projects</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Tips for Success
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Be specific about your requirements</li>
                <li>Communicate openly and frequently</li>
                <li>Respect the seller's expertise and process</li>
                <li>Provide feedback promptly</li>
                <li>Build long-term relationships with quality sellers</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BuyingGuide;
