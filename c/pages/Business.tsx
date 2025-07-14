import { ArrowLeft, Building, Users, Shield, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Business = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleStartTrial = () => {
    toast({
      title: "Free Trial Started!",
      description:
        "Welcome to GigFly Business! You now have access to enterprise features for 14 days.",
    });
  };

  const handleScheduleDemo = () => {
    toast({
      title: "Demo Scheduled",
      description:
        "Our team will contact you within 24 hours to schedule your personalized demo.",
    });
  };

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
    toast({
      title: `${planName} Plan Selected`,
      description: "Redirecting to checkout...",
    });
    // In a real app, this would redirect to a payment page
    setTimeout(() => {
      toast({
        title: "Success!",
        description: `You're now subscribed to the ${planName} plan!`,
      });
    }, 2000);
  };

  const handleExploreServices = () => {
    navigate("/pro");
  };

  const handleBrowseServices = () => {
    navigate("/all-services");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            GigFly Business
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Scale your business with enterprise-grade freelance solutions
          </p>
          <Button
            onClick={handleStartTrial}
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 transition-colors"
          >
            Start Free Trial
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
            <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Enterprise Ready</h3>
            <p className="text-gray-600">
              Built for teams and organizations of all sizes
            </p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
            <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Team Management</h3>
            <p className="text-gray-600">
              Collaborate seamlessly with advanced team tools
            </p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
            <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Enhanced Security</h3>
            <p className="text-gray-600">
              Enterprise-grade security and compliance
            </p>
          </div>
          <div className="text-center p-6 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer">
            <Zap className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Priority Support</h3>
            <p className="text-gray-600">
              Dedicated account management and 24/7 support
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Key Features
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <Check className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Advanced Analytics
                  </h3>
                  <p className="text-gray-600">
                    Track spending, performance, and ROI across all projects
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <Check className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Bulk Ordering</h3>
                  <p className="text-gray-600">
                    Place multiple orders efficiently with streamlined workflows
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <Check className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Custom Branding
                  </h3>
                  <p className="text-gray-600">
                    White-label solutions with your company branding
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <Check className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Invoicing & Billing
                  </h3>
                  <p className="text-gray-600">
                    Centralized billing with detailed invoicing options
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Pricing Plans
            </h2>
            <div className="space-y-4">
              <div
                className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedPlan === "Starter"
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 hover:border-green-300"
                }`}
                onClick={() => handlePlanSelect("Starter")}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Starter
                </h3>
                <p className="text-3xl font-bold text-green-600 mb-2">
                  $149<span className="text-lg text-gray-600">/month</span>
                </p>
                <p className="text-gray-600 mb-4">
                  Perfect for small teams getting started
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Up to 5 team members</li>
                  <li>• Basic analytics</li>
                  <li>• Email support</li>
                </ul>
                <Button
                  className="w-full mt-4"
                  variant={selectedPlan === "Starter" ? "default" : "outline"}
                >
                  {selectedPlan === "Starter" ? "Selected" : "Select Plan"}
                </Button>
              </div>

              <div
                className={`border-2 rounded-lg p-6 relative cursor-pointer transition-all hover:shadow-lg ${
                  selectedPlan === "Professional"
                    ? "border-green-600 bg-green-50"
                    : "border-green-600 hover:shadow-xl"
                }`}
                onClick={() => handlePlanSelect("Professional")}
              >
                <div className="absolute -top-3 left-6 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                  Most Popular
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Professional
                </h3>
                <p className="text-3xl font-bold text-green-600 mb-2">
                  $499<span className="text-lg text-gray-600">/month</span>
                </p>
                <p className="text-gray-600 mb-4">
                  For growing businesses and agencies
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Up to 25 team members</li>
                  <li>• Advanced analytics</li>
                  <li>• Priority support</li>
                  <li>• Custom branding</li>
                </ul>
                <Button
                  className="w-full mt-4"
                  variant={
                    selectedPlan === "Professional" ? "default" : "outline"
                  }
                >
                  {selectedPlan === "Professional" ? "Selected" : "Select Plan"}
                </Button>
              </div>

              <div
                className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedPlan === "Enterprise"
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 hover:border-green-300"
                }`}
                onClick={() => handlePlanSelect("Enterprise")}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Enterprise
                </h3>
                <p className="text-3xl font-bold text-green-600 mb-2">Custom</p>
                <p className="text-gray-600 mb-4">
                  Tailored solutions for large organizations
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Unlimited team members</li>
                  <li>• Custom integrations</li>
                  <li>• Dedicated account manager</li>
                  <li>• SSO & advanced security</li>
                </ul>
                <Button
                  className="w-full mt-4"
                  variant={
                    selectedPlan === "Enterprise" ? "default" : "outline"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    toast({
                      title: "Contact Sales",
                      description:
                        "Our enterprise team will reach out to discuss custom pricing.",
                    });
                  }}
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to Scale Your Business?
          </h2>
          <p className="text-gray-600 mb-6">
            Join over 1,000 companies using GigFly Business to streamline their
            freelance operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleStartTrial}
              className="bg-green-600 hover:bg-green-700 text-white transition-colors"
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              onClick={handleScheduleDemo}
              className="hover:bg-gray-100 transition-colors"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Business;
