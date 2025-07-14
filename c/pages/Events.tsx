import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Events = () => {
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      title: "GigFly Freelance Summit 2025",
      date: "March 15-16, 2025",
      location: "Virtual Event",
      description:
        "Join thousands of freelancers for networking, workshops, and industry insights.",
      attendees: "5,000+",
      type: "Conference",
    },
    {
      id: 2,
      title: "Design Masterclass with Top Sellers",
      date: "February 20, 2025",
      location: "New York, NY",
      description:
        "Learn from GigFly's top-rated graphic designers in this exclusive workshop.",
      attendees: "150",
      type: "Workshop",
    },
    {
      id: 3,
      title: "Digital Marketing Bootcamp",
      date: "January 30, 2025",
      location: "Virtual Event",
      description: "Master the latest digital marketing strategies and tools.",
      attendees: "1,000+",
      type: "Training",
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

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            GigFly Events
          </h1>
          <p className="text-xl text-gray-600">
            Connect, learn, and grow with the GigFly community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    {event.type}
                  </span>
                  <div className="flex items-center text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm">{event.attendees}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{event.description}</p>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Register Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-6">
            Be the first to know about upcoming events and exclusive
            opportunities
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Subscribe to Event Updates
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Events;
