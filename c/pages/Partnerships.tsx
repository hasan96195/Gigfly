import { ArrowLeft, Handshake, Globe, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Partnerships = () => {
  const navigate = useNavigate();

  const partnershipTypes = [
    {
      title: "Technology Partners",
      description:
        "Integrate with our platform through our robust API ecosystem",
      icon: Globe,
      benefits: [
        "API access",
        "Co-marketing opportunities",
        "Technical support",
      ],
    },
    {
      title: "Referral Partners",
      description: "Earn commissions by referring businesses to GigFly",
      icon: Users,
      benefits: [
        "Competitive commissions",
        "Marketing materials",
        "Dedicated support",
      ],
    },
    {
      title: "Enterprise Partners",
      description:
        "White-label solutions and custom integrations for large organizations",
      icon: TrendingUp,
      benefits: ["Custom solutions", "Revenue sharing", "Joint go-to-market"],
    },
    {
      title: "Strategic Alliances",
      description:
        "Long-term partnerships with industry leaders and innovators",
      icon: Handshake,
      benefits: ["Co-innovation", "Market expansion", "Thought leadership"],
    },
  ];

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
            Partnerships
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join forces with GigFly to unlock new opportunities and drive mutual
            growth
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3">
            Become a Partner
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {partnershipTypes.map((type, index) => {
            const IconComponent = type.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <IconComponent className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {type.title}
                  </h3>
                </div>

                <p className="text-gray-600 mb-6">{type.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Key Benefits:
                  </h4>
                  <ul className="space-y-2">
                    {type.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant="outline"
                  className="w-full text-green-600 border-green-600 hover:bg-green-50"
                >
                  Learn More
                </Button>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Why Partner with GigFly?
            </h2>
            <p className="text-gray-600">
              Join a thriving ecosystem that connects millions of businesses
              with talented professionals worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">4M+</div>
              <p className="text-gray-600">Active Buyers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">190+</div>
              <p className="text-gray-600">Countries Served</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$1B+</div>
              <p className="text-gray-600">Annual GMV</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Partnership Process
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Application
                  </h3>
                  <p className="text-gray-600">
                    Submit your partnership proposal through our online form
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Evaluation
                  </h3>
                  <p className="text-gray-600">
                    Our partnerships team reviews your application and business
                    model
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Discussion
                  </h3>
                  <p className="text-gray-600">
                    We schedule a call to discuss mutual opportunities and fit
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Agreement
                  </h3>
                  <p className="text-gray-600">
                    Finalize partnership terms and begin collaboration
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Tell us about your business and how you'd like to partner with
              GigFly. Our partnerships team will get back to you within 48
              hours.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Partnership Type
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Technology Integration</option>
                  <option>Referral Program</option>
                  <option>Enterprise Partnership</option>
                  <option>Strategic Alliance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Submit Application
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Questions About Partnerships?
          </h2>
          <p className="text-gray-600 mb-6">
            Our partnerships team is here to help you explore opportunities
          </p>
          <Button variant="outline">Contact Partnerships Team</Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Partnerships;
