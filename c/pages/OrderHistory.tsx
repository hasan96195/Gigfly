import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  Eye,
  MessageSquare,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const orders = [
    {
      id: 1,
      title: "Professional Logo Design for Tech Startup",
      seller: "john_designer",
      status: "Completed",
      price: 150,
      orderDate: "2025-01-10",
      completedDate: "2025-01-15",
      rating: 5,
      thumbnail: "/placeholder.svg",
    },
    {
      id: 2,
      title: "E-commerce Website Development",
      seller: "sarah_dev",
      status: "Completed",
      price: 500,
      orderDate: "2025-01-05",
      completedDate: "2025-01-20",
      rating: 4,
      thumbnail: "/placeholder.svg",
    },
    {
      id: 3,
      title: "SEO Blog Content Writing Package",
      seller: "mike_content",
      status: "In Progress",
      price: 75,
      orderDate: "2025-01-08",
      completedDate: null,
      rating: null,
      thumbnail: "/placeholder.svg",
    },
    {
      id: 4,
      title: "Social Media Marketing Strategy",
      seller: "emma_marketing",
      status: "Completed",
      price: 200,
      orderDate: "2025-01-03",
      completedDate: "2025-01-08",
      rating: 5,
      thumbnail: "/placeholder.svg",
    },
    {
      id: 5,
      title: "Mobile App UI/UX Design",
      seller: "alex_ui",
      status: "Cancelled",
      price: 300,
      orderDate: "2025-12-20",
      completedDate: null,
      rating: null,
      thumbnail: "/placeholder.svg",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      order.status.toLowerCase().includes(filterStatus.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-gray-400">Not rated</span>;

    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="flex items-center text-green-600 hover:text-green-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600">View and manage all your past orders</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="progress">In Progress</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Time</option>
                <option value="month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="year">Last Year</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex items-start space-x-4">
                    <img
                      src={order.thumbnail}
                      alt={order.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        {order.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        by {order.seller}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Ordered: {order.orderDate}</span>
                        {order.completedDate && (
                          <span>Completed: {order.completedDate}</span>
                        )}
                      </div>
                      {order.status === "Completed" && (
                        <div className="mt-2">{renderStars(order.rating)}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col lg:items-end space-y-3">
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <span className="text-lg font-bold text-gray-900">
                        ${order.price}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {order.status === "Completed" && (
                        <>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        </>
                      )}
                      {order.status === "In Progress" && (
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or browse our services to
                place your first order.
              </p>
              <Link to="/all-services">
                <Button>Browse Services</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
          <Button variant="outline">Load More Orders</Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderHistory;
