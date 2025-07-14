
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import GigDetails from "./pages/GigDetails";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import CategoryDetails from "./pages/CategoryDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Careers from "./pages/Careers";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import AllServices from "./pages/AllServices";
import IntellectualProperty from "./pages/IntellectualProperty";
import TrustSafety from "./pages/TrustSafety";
import SellingGuide from "./pages/SellingGuide";
import BuyingGuide from "./pages/BuyingGuide";
import Blog from "./pages/Blog";
import Events from "./pages/Events";
import Forum from "./pages/Forum";
import CommunityStandards from "./pages/CommunityStandards";
import Podcast from "./pages/Podcast";
import Affiliates from "./pages/Affiliates";
import Business from "./pages/Business";
import Pro from "./pages/Pro";
import Studios from "./pages/Studios";
import LogoMaker from "./pages/LogoMaker";
import Guides from "./pages/Guides";
import Inspiration from "./pages/Inspiration";
import Press from "./pages/Press";
import Partnerships from "./pages/Partnerships";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProfileEdit from "./pages/ProfileEdit";
import AccountSettings from "./pages/AccountSettings";
import OrderHistory from "./pages/OrderHistory";
import Notifications from "./pages/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminAuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/all-services" element={<AllServices />} />
            <Route path="/gig/:id" element={<GigDetails />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/category/:category" element={<CategoryDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/account/settings" element={<AccountSettings />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/help" element={<Help />} />
            <Route path="/intellectual-property" element={<IntellectualProperty />} />
            <Route path="/trust-safety" element={<TrustSafety />} />
            <Route path="/selling-guide" element={<SellingGuide />} />
            <Route path="/buying-guide" element={<BuyingGuide />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/events" element={<Events />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/community-standards" element={<CommunityStandards />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/affiliates" element={<Affiliates />} />
            <Route path="/business" element={<Business />} />
            <Route path="/pro" element={<Pro />} />
            <Route path="/studios" element={<Studios />} />
            <Route path="/logo-maker" element={<LogoMaker />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/inspiration" element={<Inspiration />} />
            <Route path="/press" element={<Press />} />
            <Route path="/partnerships" element={<Partnerships />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
