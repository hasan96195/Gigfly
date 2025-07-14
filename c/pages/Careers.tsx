import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Careers = () => {
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
            Careers at GigFly
          </h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Join Our Team
              </h2>
              <p className="text-gray-600 mb-4">
                At GigFly, we're building the future of work. We're looking for
                passionate, innovative individuals who want to make a real
                impact on how people collaborate and get things done.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Open Positions
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-gray-900">
                    Senior Frontend Developer
                  </h3>
                  <p className="text-gray-600">Tel Aviv, India | Remote</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Full-time • Engineering
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-gray-900">
                    Product Manager
                  </h3>
                  <p className="text-gray-600">New York, NY | Hybrid</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Full-time • Product
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-gray-900">
                    UX Designer
                  </h3>
                  <p className="text-gray-600">Remote</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Full-time • Design
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Why GigFly?
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Competitive salary and equity packages</li>
                <li>Comprehensive health benefits</li>
                <li>Flexible work arrangements</li>
                <li>Professional development opportunities</li>
                <li>Collaborative and inclusive culture</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Careers;
