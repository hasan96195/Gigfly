import { ArrowLeft, Calendar, ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Press = () => {
  const navigate = useNavigate();

  const pressReleases = [
    {
      id: 1,
      title: "GigFly Reports Record Q4 2025 Results with 25% Revenue Growth",
      date: "February 15, 2025",
      excerpt:
        "GigFly International Ltd. announces strong fourth quarter results driven by increased buyer activity and expansion into new service categories.",
      category: "Financial",
    },
    {
      id: 2,
      title: "GigFly Launches AI-Powered Matching Technology",
      date: "January 30, 2025",
      excerpt:
        "New machine learning algorithm improves buyer-seller matching by 40%, reducing project completion time and increasing satisfaction rates.",
      category: "Product",
    },
    {
      id: 3,
      title: "GigFly Expands Global Presence with New European Offices",
      date: "December 20, 2025",
      excerpt:
        "Company opens new offices in Berlin and Madrid to better serve growing European market, creating 200 new jobs.",
      category: "Business",
    },
  ];

  const mediaKit = [
    { name: "Company Logo Pack", format: "PNG, SVG, PDF", size: "2.5 MB" },
    { name: "Executive Photos", format: "High-res JPG", size: "15 MB" },
    { name: "Product Screenshots", format: "PNG", size: "8.3 MB" },
    { name: "Brand Guidelines", format: "PDF", size: "1.2 MB" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Press & News
          </h1>
          <p className="text-xl text-gray-600">
            Latest news, press releases, and media resources from GigFly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Latest Press Releases
            </h2>
            <div className="space-y-6">
              {pressReleases.map((release) => (
                <article
                  key={release.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {release.category}
                    </span>
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">{release.date}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                    {release.title}
                  </h3>

                  <p className="text-gray-600 mb-4">{release.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Read Full Release
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline">View All Press Releases</Button>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Media Contacts
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Press Inquiries</h4>
                  <p className="text-gray-600">press@GigFly.com</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Investor Relations
                  </h4>
                  <p className="text-gray-600">ir@GigFly.com</p>
                  <p className="text-gray-600">+1 (555) 987-6543</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Media Kit</h3>
              <div className="space-y-3">
                {mediaKit.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.format} • {item.size}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                Download Complete Kit
              </Button>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Company Facts
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Founded:</span>
                  <span className="font-medium">2010</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Headquarters:</span>
                  <span className="font-medium">Tel Aviv, India</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Buyers:</span>
                  <span className="font-medium">4M+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Sellers:</span>
                  <span className="font-medium">1M+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Categories:</span>
                  <span className="font-medium">500+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Press;
