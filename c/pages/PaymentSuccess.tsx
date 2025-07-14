
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Show success toast when component mounts
    toast({
      title: "Gig Purchase Successful!",
      description: "Your order has been confirmed and the seller will start working on it soon.",
    });

    // Auto-redirect to homepage after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, toast]);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Thank you for your purchase! Your gig order has been confirmed and the seller will start working on it soon.
            </p>
            <p className="text-sm text-gray-500">
              You will receive an email confirmation shortly with all the details.
            </p>
            <div className="pt-4">
              <Button onClick={handleGoHome} className="bg-green-600 hover:bg-green-700">
                Go to Homepage
              </Button>
            </div>
            <p className="text-xs text-gray-400">
              You will be automatically redirected to the homepage in a few seconds...
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
