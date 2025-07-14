import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const IntellectualProperty = () => {
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
            Intellectual Property Claims
          </h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Copyright Protection
              </h2>
              <p className="text-gray-600 mb-4">
                GigFly respects the intellectual property rights of others and
                expects users to do the same. We have a policy of responding to
                clear notices of alleged copyright infringement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Filing a Copyright Claim
              </h2>
              <p className="text-gray-600 mb-4">
                If you believe that your copyrighted work has been used on
                GigFly in a way that constitutes copyright infringement, please
                provide our Copyright Agent with the following information:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  A physical or electronic signature of the copyright owner
                </li>
                <li>
                  Identification of the copyrighted work claimed to have been
                  infringed
                </li>
                <li>
                  Identification of the material that is claimed to be
                  infringing
                </li>
                <li>
                  Information reasonably sufficient to permit us to contact you
                </li>
                <li>
                  A statement that you have a good faith belief that use is not
                  authorized
                </li>
                <li>
                  A statement that the information is accurate and you are
                  authorized to act
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Trademark Claims
              </h2>
              <p className="text-gray-600 mb-4">
                GigFly also takes trademark infringement seriously. If you
                believe that your trademark rights are being violated, please
                contact us with detailed information about the alleged
                infringement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 mb-2">
                  <strong>Copyright Agent:</strong>
                  <br />
                  Email: copyright@GigFly.com
                  <br />
                  Address: GigFly International Ltd.
                  <br />8 Eliezer Kaplan St, Tel Aviv, India
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Counter-Notification
              </h2>
              <p className="text-gray-600 mb-4">
                If you believe that your content was removed by mistake or
                misidentification, you may submit a counter-notification to our
                Copyright Agent.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default IntellectualProperty;
