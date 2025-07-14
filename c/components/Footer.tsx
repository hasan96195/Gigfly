import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ChevronDown,
  Globe,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Footer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "it", name: "Italiano" },
    { code: "pt", name: "Português" },
    { code: "ru", name: "Русский" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
  ];

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "BRL", symbol: "R$", name: "Brazilian Real" },
    { code: "RUB", symbol: "₽", name: "Russian Ruble" },
  ];

  const socialLinks = {
    facebook: "https://facebook.com/",
    twitter: "https://x.com/ashasweb",
    instagram: "https://www.instagram.com/ashasweb/",
    linkedin: "https://www.linkedin.com/company/ashasweb/",
    youtube: "https://www.youtube.com/ashasweb",
  };

  const handleSocialClick = (platform: keyof typeof socialLinks) => {
    window.open(socialLinks[platform], "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  to="/category/graphic-design"
                  className="hover:text-white transition-colors"
                >
                  Graphics & Design
                </Link>
              </li>
              <li>
                <Link
                  to="/category/digital-marketing"
                  className="hover:text-white transition-colors"
                >
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link
                  to="/category/writing"
                  className="hover:text-white transition-colors"
                >
                  Writing & Translation
                </Link>
              </li>
              <li>
                <Link
                  to="/category/video-animation"
                  className="hover:text-white transition-colors"
                >
                  Video & Animation
                </Link>
              </li>
              <li>
                <Link
                  to="/category/music"
                  className="hover:text-white transition-colors"
                >
                  Music & Audio
                </Link>
              </li>
              <li>
                <Link
                  to="/category/programming"
                  className="hover:text-white transition-colors"
                >
                  Programming & Tech
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  to="/careers"
                  className="hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/press"
                  className="hover:text-white transition-colors"
                >
                  Press & News
                </Link>
              </li>
              <li>
                <Link
                  to="/partnerships"
                  className="hover:text-white transition-colors"
                >
                  Partnerships
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/intellectual-property"
                  className="hover:text-white transition-colors"
                >
                  Intellectual Property Claims
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/help" className="hover:text-white transition-colors">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link
                  to="/trust-safety"
                  className="hover:text-white transition-colors"
                >
                  Trust & Safety
                </Link>
              </li>
              <li>
                <Link
                  to="/selling-guide"
                  className="hover:text-white transition-colors"
                >
                  Selling on GigFly
                </Link>
              </li>
              <li>
                <Link
                  to="/buying-guide"
                  className="hover:text-white transition-colors"
                >
                  Buying on GigFly
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  to="/events"
                  className="hover:text-white transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/forum"
                  className="hover:text-white transition-colors"
                >
                  Forum
                </Link>
              </li>
              <li>
                <Link
                  to="/community-standards"
                  className="hover:text-white transition-colors"
                >
                  Community Standards
                </Link>
              </li>
              <li>
                <Link
                  to="/podcast"
                  className="hover:text-white transition-colors"
                >
                  Podcast
                </Link>
              </li>
              <li>
                <Link
                  to="/affiliates"
                  className="hover:text-white transition-colors"
                >
                  Affiliates
                </Link>
              </li>
            </ul>
          </div>

          {/* More From GigFly */}
          <div>
            <h3 className="font-semibold mb-4">More From GigFly</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  to="/business"
                  className="hover:text-white transition-colors"
                >
                  GigFly Business
                </Link>
              </li>
              <li>
                <Link to="/pro" className="hover:text-white transition-colors">
                  GigFly Pro
                </Link>
              </li>
              <li>
                <Link
                  to="/studios"
                  className="hover:text-white transition-colors"
                >
                  GigFly Studios
                </Link>
              </li>
              <li>
                <Link
                  to="/logo-maker"
                  className="hover:text-white transition-colors"
                >
                  GigFly Logo Maker
                </Link>
              </li>
              <li>
                <Link
                  to="/guides"
                  className="hover:text-white transition-colors"
                >
                  GigFly Guides
                </Link>
              </li>
              <li>
                <Link
                  to="/inspiration"
                  className="hover:text-white transition-colors"
                >
                  Get Inspired
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-green-500">GigFly</h2>
            </Link>
            <span className="text-sm text-gray-400">
              © GigFly International Ltd. 2025
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex space-x-4">
              <Facebook
                className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors"
                onClick={() => handleSocialClick("facebook")}
              />
              <Twitter
                className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors"
                onClick={() => handleSocialClick("twitter")}
              />
              <Instagram
                className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors"
                onClick={() => handleSocialClick("instagram")}
              />
              <Linkedin
                className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors"
                onClick={() => handleSocialClick("linkedin")}
              />
              <Youtube
                className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors"
                onClick={() => handleSocialClick("youtube")}
              />
            </div>
            <div className="flex items-center space-x-2 ml-4">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white text-sm h-auto p-1 gap-1"
                  >
                    <Globe className="h-4 w-4" />
                    {selectedLanguage}
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang.name)}
                      className={
                        selectedLanguage === lang.name
                          ? "bg-green-50 text-green-600"
                          : ""
                      }
                    >
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Currency Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white text-sm h-auto p-1 gap-1"
                  >
                    <DollarSign className="h-4 w-4" />
                    {
                      currencies.find((c) => c.code === selectedCurrency)
                        ?.symbol
                    }{" "}
                    {selectedCurrency}
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {currencies.map((currency) => (
                    <DropdownMenuItem
                      key={currency.code}
                      onClick={() => setSelectedCurrency(currency.code)}
                      className={
                        selectedCurrency === currency.code
                          ? "bg-green-50 text-green-600"
                          : ""
                      }
                    >
                      <span className="mr-2">{currency.symbol}</span>
                      {currency.code} - {currency.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
