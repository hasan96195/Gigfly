import { ArrowLeft, Shield, Users, AlertTriangle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CommunityStandards = () => {
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
            Community Standards
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Respect</h3>
              <p className="text-gray-600">
                Treat everyone with dignity and kindness
              </p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Safety</h3>
              <p className="text-gray-600">
                Maintain a secure environment for all
              </p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <AlertTriangle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Integrity</h3>
              <p className="text-gray-600">
                Be honest and transparent in all dealings
              </p>
            </div>
            <div className="text-center p-6 bg-pink-50 rounded-lg">
              <Heart className="h-12 w-12 text-pink-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Support</h3>
              <p className="text-gray-600">Help others succeed and grow</p>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-gray-600 mb-4">
                GigFly is built on the foundation of mutual respect, creativity,
                and collaboration. Our community standards ensure that everyone
                can participate in a safe, welcoming, and productive
                environment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Respectful Communication
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  Use professional and courteous language in all interactions
                </li>
                <li>Respect cultural differences and diverse perspectives</li>
                <li>Avoid discriminatory, hateful, or offensive content</li>
                <li>
                  Give constructive feedback and handle criticism gracefully
                </li>
                <li>Respond promptly and professionally to messages</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Quality and Integrity
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Deliver work that meets or exceeds promised quality</li>
                <li>Be honest about your skills and capabilities</li>
                <li>Provide accurate descriptions of your services</li>
                <li>Use original content and respect intellectual property</li>
                <li>Honor deadlines and communicate any delays promptly</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Prohibited Behavior
              </h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Harassment, bullying, or threatening behavior</li>
                  <li>Spam, unsolicited messages, or promotional content</li>
                  <li>Fraudulent activities or misrepresentation</li>
                  <li>
                    Sharing personal contact information outside the platform
                  </li>
                  <li>Attempting to circumvent GigFly's payment system</li>
                  <li>Creating fake reviews or manipulating ratings</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Reporting Violations
              </h2>
              <p className="text-gray-600 mb-4">
                If you encounter behavior that violates our community standards,
                please report it immediately:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-600 space-y-2">
                  <li>
                    Use the "Report" button on profiles, gigs, or messages
                  </li>
                  <li>Contact our Trust & Safety team at safety@GigFly.com</li>
                  <li>Provide detailed information about the violation</li>
                  <li>Include screenshots or evidence when possible</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Consequences
              </h2>
              <p className="text-gray-600 mb-4">
                Violations of our community standards may result in:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Warning messages and educational resources</li>
                <li>Temporary restrictions on account features</li>
                <li>Gig removal or account suspension</li>
                <li>Permanent account termination for serious violations</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CommunityStandards;
