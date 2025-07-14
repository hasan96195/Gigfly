import { ArrowLeft, Shield, Users, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TrustSafety = () => {
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
            Trust & Safety
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Secure Platform</h3>
              <p className="text-gray-600">
                Protected transactions and verified users
              </p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">
                Community Standards
              </h3>
              <p className="text-gray-600">Clear guidelines for all users</p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <AlertTriangle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Report Issues</h3>
              <p className="text-gray-600">24/7 support and safety team</p>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Our Commitment to Safety
              </h2>
              <p className="text-gray-600 mb-4">
                At GigFly, we're committed to maintaining a safe and trustworthy
                platform for all users. Our comprehensive safety measures
                include identity verification, secure payment processing, and
                continuous monitoring of all transactions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Safety Guidelines
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Always communicate through GigFly's messaging system</li>
                <li>
                  Never share personal contact information or payment details
                </li>
                <li>Report suspicious behavior immediately</li>
                <li>Use our Resolution Center for any disputes</li>
                <li>Keep all work-related files within the platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                How to Report Issues
              </h2>
              <p className="text-gray-600 mb-4">
                If you encounter any safety concerns, inappropriate behavior, or
                violations of our Terms of Service, please report them
                immediately:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-600 space-y-2">
                  <li>Use the "Report" button on any gig or profile</li>
                  <li>Contact our Safety Team at safety@GigFly.com</li>
                  <li>Use the live chat support for urgent issues</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Account Verification
              </h2>
              <p className="text-gray-600 mb-4">
                We use multiple verification methods to ensure the authenticity
                of our users:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Email verification for all accounts</li>
                <li>Phone number verification</li>
                <li>Identity verification for Pro sellers</li>
                <li>Payment method verification</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TrustSafety;
