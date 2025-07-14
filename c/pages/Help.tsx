import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Help = () => {
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
            Help & Support
          </h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    How do I place an order?
                  </h3>
                  <p className="text-gray-600">
                    Browse through services, select a seller, choose your
                    package, and proceed to checkout. You'll receive order
                    confirmation and can track progress in your dashboard.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    How does payment work?
                  </h3>
                  <p className="text-gray-600">
                    We accept all major credit cards and PayPal. Payment is
                    processed securely, and funds are released to sellers upon
                    successful delivery.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    What if I'm not satisfied?
                  </h3>
                  <p className="text-gray-600">
                    We offer revision requests and our Resolution Center helps
                    resolve any issues. If you're still not satisfied, you may
                    be eligible for a refund.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Support
              </h2>
              <p className="text-gray-600 mb-4">
                Need more help? Our support team is available 24/7 to assist
                you.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Email: support@GigFly.com</li>
                <li>Live Chat: Available in your dashboard</li>
                <li>Phone: 1-800-GigFly-1</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Help;
