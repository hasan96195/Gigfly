import { ArrowLeft, Palette, Download, Edit, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const LogoMaker = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isCreatingLogo, setIsCreatingLogo] = useState(false);

  const handleMakeYourLogo = () => {
    setIsCreatingLogo(true);
    toast({
      title: "Logo Creation Started!",
      description: "Our AI is generating logo concepts for you...",
    });

    // Simulate logo creation process
    setTimeout(() => {
      setIsCreatingLogo(false);
      toast({
        title: "Logo Concepts Ready!",
        description:
          "We've generated several logo options for you to choose from.",
      });
    }, 3000);
  };

  const handleStartCreating = () => {
    toast({
      title: "Welcome to Logo Maker!",
      description: "Let's start by telling us about your business.",
    });
    // In a real app, this would open a business info form
  };

  const handleSeeExamples = () => {
    toast({
      title: "Logo Examples",
      description: "Browse our gallery of professionally designed logos.",
    });
    // In a real app, this would show a gallery modal
  };

  const handlePlanSelect = (planName: string, price: string) => {
    setSelectedPlan(planName);
    toast({
      title: `${planName} Plan Selected`,
      description: `${price} plan selected. Redirecting to checkout...`,
    });

    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: "Success!",
        description: `You're now subscribed to the ${planName} plan!`,
      });
    }, 2000);
  };

  const handleGetStartedBasic = () => {
    handlePlanSelect("Basic", "$20");
  };

  const handleGetMostPopular = () => {
    handlePlanSelect("Premium", "$65");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            GigFly Logo Maker
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create a professional logo in minutes with our AI-powered design
            tool
          </p>
          <Button
            onClick={handleMakeYourLogo}
            disabled={isCreatingLogo}
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 transition-colors disabled:opacity-50"
          >
            {isCreatingLogo ? "Creating Your Logo..." : "Make Your Logo"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer group">
            <Zap className="h-12 w-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-lg mb-2">Instant Creation</h3>
            <p className="text-gray-600">
              Generate professional logos in seconds
            </p>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer group">
            <Palette className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-lg mb-2">Customizable</h3>
            <p className="text-gray-600">
              Thousands of templates and design options
            </p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer group">
            <Edit className="h-12 w-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-lg mb-2">Easy Editor</h3>
            <p className="text-gray-600">
              Intuitive tools for perfect customization
            </p>
          </div>
          <div className="text-center p-6 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer group">
            <Download className="h-12 w-12 text-orange-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-lg mb-2">High Quality</h3>
            <p className="text-gray-600">
              Download in multiple formats and resolutions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              How It Works
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Enter Your Business Name
                  </h3>
                  <p className="text-gray-600">
                    Tell us about your business and industry
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Choose Your Style
                  </h3>
                  <p className="text-gray-600">
                    Select from hundreds of AI-generated logo concepts
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Customize & Download
                  </h3>
                  <p className="text-gray-600">
                    Fine-tune colors, fonts, and layout, then download your logo
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Pricing
            </h2>
            <div className="space-y-4">
              <div
                className={`bg-white border rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedPlan === "Basic"
                    ? "border-green-600 ring-2 ring-green-200"
                    : "border-gray-200 hover:border-green-300"
                }`}
                onClick={() => setSelectedPlan("Basic")}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Basic
                </h3>
                <p className="text-3xl font-bold text-green-600 mb-2">$20</p>
                <ul className="text-gray-600 space-y-1 mb-4">
                  <li>• Logo files (PNG, JPG)</li>
                  <li>• Standard resolution</li>
                  <li>• Basic customization</li>
                </ul>
                <Button
                  variant={selectedPlan === "Basic" ? "default" : "outline"}
                  className="w-full transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGetStartedBasic();
                  }}
                >
                  {selectedPlan === "Basic" ? "Selected" : "Get Started"}
                </Button>
              </div>
              <div
                className={`bg-green-50 border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedPlan === "Premium"
                    ? "border-green-600 ring-2 ring-green-300"
                    : "border-green-600 hover:shadow-xl"
                }`}
                onClick={() => setSelectedPlan("Premium")}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Premium
                </h3>
                <p className="text-3xl font-bold text-green-600 mb-2">$65</p>
                <ul className="text-gray-600 space-y-1 mb-4">
                  <li>• All file formats (PNG, JPG, SVG, PDF)</li>
                  <li>• High resolution & vector files</li>
                  <li>• Full customization tools</li>
                  <li>• Brand kit included</li>
                </ul>
                <Button
                  className={`w-full transition-colors ${
                    selectedPlan === "Premium"
                      ? "bg-green-700 hover:bg-green-800"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGetMostPopular();
                  }}
                >
                  {selectedPlan === "Premium"
                    ? "Selected - Most Popular"
                    : "Most Popular"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-8 text-white text-center mb-12">
          <h2 className="text-2xl font-semibold mb-4">Logo Showcase</h2>
          <p className="text-gray-300 mb-8">
            See what others have created with GigFly Logo Maker
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-4 aspect-square flex items-center justify-center cursor-pointer hover:scale-105 transition-transform group"
                onClick={() => {
                  toast({
                    title: `Logo Design ${i}`,
                    description: "Click to view this logo design in detail.",
                  });
                }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                  L{i}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to Create Your Logo?
          </h2>
          <p className="text-gray-600 mb-6">
            Join over 500,000 businesses who've created their brand identity
            with GigFly Logo Maker
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleStartCreating}
              className="bg-green-600 hover:bg-green-700 text-white transition-colors"
            >
              Start Creating
            </Button>
            <Button
              variant="outline"
              onClick={handleSeeExamples}
              className="hover:bg-gray-100 transition-colors"
            >
              See Examples
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LogoMaker;
