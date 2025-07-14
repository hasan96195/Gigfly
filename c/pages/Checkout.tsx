import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const mockGig = {
    id: id || "1",
    title: "I will create a professional logo design for your business",
    seller: "John Design Pro",
    sellerAvatar: "/placeholder.svg",
    image: "/placeholder.svg",
    packages: [
      {
        name: "Basic",
        price: 25,
        deliveryTime: "3 days",
        revisions: 2,
        features: [
          "Logo transparency",
          "Printable resolution file",
          "Include source file",
        ],
      },
      {
        name: "Standard",
        price: 50,
        deliveryTime: "2 days",
        revisions: 3,
        features: [
          "Logo transparency",
          "Printable resolution file",
          "Include source file",
          "Vector file",
          "3D mockup",
        ],
      },
      {
        name: "Premium",
        price: 100,
        deliveryTime: "1 day",
        revisions: "Unlimited",
        features: [
          "Logo transparency",
          "Printable resolution file",
          "Include source file",
          "Vector file",
          "3D mockup",
          "Social media kit",
          "Stationery designs",
        ],
      },
    ],
  };

  const selectedPackage = mockGig.packages[1]; // Standard package
  const serviceFee = Math.round(selectedPackage.price * 0.05);
  const total = selectedPackage.price + serviceFee;

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate payment processing
    toast({
      title: "Processing Payment...",
      description: "Please wait while we process your payment.",
    });

    // Simulate payment delay and redirect to success page
    setTimeout(() => {
      navigate("/payment-success");
    }, 2000);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Link
            to={`/gig/${id}`}
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to gig
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <img
                      src={mockGig.image}
                      alt={mockGig.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm line-clamp-2">
                        {mockGig.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        by {mockGig.seller}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">
                        {selectedPackage.name} Package
                      </span>
                      <span className="font-medium">
                        ${selectedPackage.price}
                      </span>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {selectedPackage.features.map((feature, index) => (
                        <li key={index}>✓ {feature}</li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${selectedPackage.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>${serviceFee}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="h-4 w-4 mr-2" />
                    Orders are protected by GigFly
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleOrderSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" required />
                    </div>

                    <Separator />

                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM/YY" required />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                    >
                      Confirm & Pay ${total}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      By clicking "Confirm & Pay", you agree to GigFly's Terms
                      of Service and acknowledge our Privacy Policy.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Checkout;
