import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import {
  User,
  ShoppingBag,
  Heart,
  MessageSquare,
  Star,
  Calendar,
  DollarSign,
  Eye,
  CheckCircle,
  Search,
  Filter,
  Download,
  Edit3,
  Trash2,
  Plus,
  Send,
  RefreshCw,
  Settings,
  TrendingUp,
  Activity,
  Clock,
  Package,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  FileText,
  CreditCard,
  Bell,
  HelpCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Enhanced state management
  const [activeOrders, setActiveOrders] = useState(3);
  const [completedOrders, setCompletedOrders] = useState(12);
  const [totalSpent, setTotalSpent] = useState(850);
  const [favoriteGigs, setFavoriteGigs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newMessageText, setNewMessageText] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState<number | null>(null);
  const [notifications, setNotifications] = useState(3);
  const [pendingReviews, setPendingReviews] = useState(2);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favoriteGigsData") || "[]"
    );
    setFavoriteGigs(savedFavorites);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setNotifications((prev) =>
        Math.max(0, prev + Math.floor(Math.random() * 2) - 1)
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Enhanced orders data with more realistic information
  const recentOrders = [
    {
      id: 1,
      title: "Professional Logo Design for Tech Startup",
      seller: "john_designer",
      status: "In Progress",
      price: 150,
      dueDate: "2025-01-15",
      progress: 75,
      orderDate: "2025-01-10",
      description: "Modern logo design with brand guidelines",
      deliverables: [
        "Logo files (AI, PNG, SVG)",
        "Brand guidelines",
        "Color palette",
      ],
      timeline: "5 days",
      revisions: 2,
      remainingRevisions: 1,
    },
    {
      id: 2,
      title: "E-commerce Website Development",
      seller: "sarah_dev",
      status: "Delivered",
      price: 500,
      dueDate: "2025-01-10",
      progress: 100,
      orderDate: "2025-01-05",
      description: "Full-stack e-commerce website with admin panel",
      deliverables: ["Complete website", "Admin dashboard", "Documentation"],
      timeline: "10 days",
      revisions: 0,
      remainingRevisions: 2,
    },
    {
      id: 3,
      title: "SEO Blog Content Writing Package",
      seller: "mike_content",
      status: "In Review",
      price: 75,
      dueDate: "2025-01-12",
      progress: 90,
      orderDate: "2025-01-08",
      description: "10 SEO-optimized blog posts",
      deliverables: ["10 blog posts", "SEO keywords", "Meta descriptions"],
      timeline: "7 days",
      revisions: 1,
      remainingRevisions: 1,
    },
    {
      id: 4,
      title: "Social Media Marketing Strategy",
      seller: "emma_marketing",
      status: "Completed",
      price: 200,
      dueDate: "2025-01-08",
      progress: 100,
      orderDate: "2025-01-03",
      description: "Complete social media strategy and content calendar",
      deliverables: ["Strategy document", "Content calendar", "Templates"],
      timeline: "3 days",
      revisions: 0,
      remainingRevisions: 0,
    },
  ];

  const recentMessages = [
    {
      id: 1,
      seller: "john_designer",
      message:
        "I've uploaded the initial logo concepts for your review. Please check the delivery section and let me know your thoughts!",
      time: "2 hours ago",
      unread: true,
      orderId: 1,
      type: "update",
    },
    {
      id: 2,
      seller: "sarah_dev",
      message:
        "Your website is ready for final testing. I've sent you the login credentials via email.",
      time: "1 day ago",
      unread: false,
      orderId: 2,
      type: "delivery",
    },
    {
      id: 3,
      seller: "mike_content",
      message:
        "Please review the first draft of your blog posts. I've implemented all your requested keywords.",
      time: "2 days ago",
      unread: true,
      orderId: 3,
      type: "revision",
    },
  ];

  // Enhanced filtering logic
  const filteredOrders = recentOrders.filter((order) => {
    const matchesSearch =
      order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      order.status.toLowerCase().includes(filterStatus.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  // Enhanced refresh functionality
  const handleRefreshData = async () => {
    setIsRefreshing(true);

    try {
      // Simulate API calls with realistic delays
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update stats with more realistic variations
      setActiveOrders((prev) =>
        Math.max(0, prev + Math.floor(Math.random() * 3) - 1)
      );
      setCompletedOrders((prev) => prev + Math.floor(Math.random() * 2));
      setTotalSpent((prev) => prev + Math.floor(Math.random() * 50));
      setNotifications((prev) =>
        Math.max(0, prev + Math.floor(Math.random() * 2))
      );

      toast({
        title: "Dashboard Refreshed",
        description:
          "All data has been updated successfully with the latest information.",
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Unable to refresh data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  // Enhanced order actions with more functionality
  const handleOrderAction = (orderId: number, action: string) => {
    const order = recentOrders.find((o) => o.id === orderId);

    switch (action) {
      case "view":
        setShowOrderDetails(orderId);
        toast({
          title: "Order Details",
          description: `Viewing details for: ${order?.title}`,
        });
        break;
      case "message":
        setSelectedOrderId(orderId);
        break;
      case "download":
        // Simulate download process
        toast({
          title: "Download Started",
          description: "Preparing your files for download...",
        });
        setTimeout(() => {
          toast({
            title: "Download Complete",
            description: "Your files have been downloaded successfully.",
          });
        }, 2000);
        break;
      case "cancel":
        toast({
          title: "Order Cancellation",
          description: "Please contact support to cancel this order.",
          variant: "destructive",
        });
        break;
      case "reorder":
        toast({
          title: "Reorder Placed",
          description: "A new order has been placed with the same seller.",
        });
        setActiveOrders((prev) => prev + 1);
        break;
      case "approve":
        toast({
          title: "Delivery Approved",
          description: "Order marked as completed successfully.",
        });
        setCompletedOrders((prev) => prev + 1);
        setActiveOrders((prev) => Math.max(0, prev - 1));
        break;
      case "request_revision":
        toast({
          title: "Revision Requested",
          description: "Your revision request has been sent to the seller.",
        });
        break;
      case "leave_review":
        navigate("/reviews/create");
        break;
      default:
        console.log(`Action ${action} on order ${orderId}`);
    }
  };

  // Enhanced message functionality
  const handleSendMessage = () => {
    if (!newMessageText.trim()) {
      toast({
        title: "Empty Message",
        description: "Please enter a message before sending.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent",
      description: "Your message has been sent to the seller successfully.",
    });
    setNewMessageText("");
    setSelectedOrderId(null);
  };

  const handleMessageReply = (messageId: number) => {
    const message = recentMessages.find((m) => m.id === messageId);
    setSelectedOrderId(message?.orderId || null);
    toast({
      title: "Reply Started",
      description: `Replying to ${message?.seller}`,
    });
  };

  // Enhanced stat interactions
  const handleStatClick = (statType: string) => {
    switch (statType) {
      case "active":
        navigate("/orders?status=active");
        break;
      case "completed":
        navigate("/orders?status=completed");
        break;
      case "spent":
        navigate("/billing-history");
        break;
      case "favorites":
        navigate("/favorites");
        break;
    }
  };

  // Enhanced export functionality
  const exportOrdersData = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Order ID,Title,Seller,Status,Price,Due Date,Progress,Order Date,Timeline,Revisions\n" +
      filteredOrders
        .map(
          (order) =>
            `${order.id},"${order.title}",${order.seller},${order.status},$${order.price},${order.dueDate},${order.progress}%,${order.orderDate},${order.timeline},${order.revisions}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `orders_export_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: `${filteredOrders.length} orders exported to CSV file.`,
    });
  };

  const removeFavorite = (gigId: number) => {
    const updatedFavorites = favoriteGigs.filter((gig) => gig.id !== gigId);
    setFavoriteGigs(updatedFavorites);
    localStorage.setItem("favoriteGigsData", JSON.stringify(updatedFavorites));

    // Update favorites count in localStorage
    const currentFavoriteIds = JSON.parse(
      localStorage.getItem("favoriteGigs") || "[]"
    );
    const filteredIds = currentFavoriteIds.filter((id: number) => id !== gigId);
    localStorage.setItem("favoriteGigs", JSON.stringify(filteredIds));

    // Dispatch event for other components
    window.dispatchEvent(new Event("favoritesUpdated"));

    toast({
      title: "Removed from Favorites",
      description: "The gig has been removed from your favorites.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "in review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back! Here's your activity overview and order management.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleRefreshData}
              variant="outline"
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
            <Button
              onClick={() => navigate("/notifications")}
              variant="outline"
              className="relative"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {notifications}
                </Badge>
              )}
            </Button>
            <Link to="/account/settings">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card
            className="hover:shadow-lg transition-all cursor-pointer transform hover:scale-105 border-l-4 border-l-blue-500"
            onClick={() => handleStatClick("")}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Orders
              </CardTitle>
              <div className="p-2 bg-blue-100 rounded-full">
                <ShoppingBag className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {activeOrders}
              </div>
              <p className="text-xs text-muted-foreground">
                Orders in progress
              </p>
              <div className="mt-2 flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2 from last week
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 w-full text-blue-600 hover:bg-blue-50"
              >
                View All Active
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-all cursor-pointer transform hover:scale-105 border-l-4 border-l-green-500"
            onClick={() => handleStatClick("")}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Orders
              </CardTitle>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {completedOrders}
              </div>
              <p className="text-xs text-muted-foreground">
                Successfully completed
              </p>
              <div className="mt-2 flex items-center text-xs text-green-600">
                <Activity className="h-3 w-3 mr-1" />
                100% satisfaction rate
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 w-full text-green-600 hover:bg-green-50"
              >
                View History
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-all cursor-pointer transform hover:scale-105 border-l-4 border-l-purple-500"
            onClick={() => handleStatClick("")}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <div className="p-2 bg-purple-100 rounded-full">
                <DollarSign className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                ${totalSpent}
              </div>
              <p className="text-xs text-muted-foreground">All time spending</p>
              <div className="mt-2 flex items-center text-xs text-purple-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                Avg: ${Math.round(
                  totalSpent / Math.max(completedOrders, 1)
                )}{" "}
                per order
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 w-full text-purple-600 hover:bg-purple-50"
              >
                View Billing
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-all cursor-pointer transform hover:scale-105 border-l-4 border-l-red-500"
            onClick={() => handleStatClick("")}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Gigs</CardTitle>
              <div className="p-2 bg-red-100 rounded-full">
                <Heart className="h-4 w-4 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {favoriteGigs.length}
              </div>
              <p className="text-xs text-muted-foreground">Favorite services</p>
              <div className="mt-2 flex items-center text-xs text-red-600">
                <Heart className="h-3 w-3 mr-1" />
                Ready to order
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 w-full text-red-600 hover:bg-red-50"
              >
                Browse Saved
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders" className="relative">
              My Orders
              {activeOrders > 0 && (
                <Badge className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-blue-500 text-white text-xs">
                  {activeOrders}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="messages" className="relative">
              Messages
              {recentMessages.filter((m) => m.unread).length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-red-500 text-white text-xs">
                  {recentMessages.filter((m) => m.unread).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="favorites">
              Favorites ({favoriteGigs.length})
            </TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Order Management
                    <Badge variant="outline">
                      {filteredOrders.length} orders
                    </Badge>
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={exportOrdersData}
                      variant="outline"
                      size="sm"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Export CSV
                    </Button>
                    <Link to="/all-services">
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        New Order
                      </Button>
                    </Link>
                    <Link to="/order-history">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View All
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Enhanced Search and Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search orders by title, seller, or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="progress">In Progress</option>
                    <option value="delivered">Delivered</option>
                    <option value="completed">Completed</option>
                    <option value="review">In Review</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 text-lg">
                                {order.title}
                              </h3>
                              <p className="text-sm text-gray-600 font-medium">
                                by {order.seller}
                              </p>
                              <p className="text-xs text-gray-500 mt-1 max-w-md">
                                {order.description}
                              </p>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-2xl font-bold text-gray-900">
                                ${order.price}
                              </div>
                              <p className="text-xs text-gray-500">
                                Order #{order.id}
                              </p>
                            </div>
                          </div>

                          {/* Enhanced Order Info */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-xs text-gray-500">Timeline</p>
                              <p className="text-sm font-medium">
                                {order.timeline}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Revisions</p>
                              <p className="text-sm font-medium">
                                {order.remainingRevisions} remaining
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Order Date
                              </p>
                              <p className="text-sm font-medium">
                                {new Date(order.orderDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Due Date</p>
                              <p className="text-sm font-medium">
                                {new Date(order.dueDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center mt-4 space-x-4">
                            <Badge
                              className={`${getStatusColor(
                                order.status
                              )} border`}
                            >
                              {order.status}
                            </Badge>
                            <div className="flex items-center text-sm text-gray-600 flex-1">
                              <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                                <div
                                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${order.progress}%` }}
                                ></div>
                              </div>
                              <span className="font-medium">
                                {order.progress}%
                              </span>
                            </div>
                          </div>

                          {/* Enhanced Action Buttons */}
                          <div className="flex flex-wrap gap-2 mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleOrderAction(order.id, "view")
                              }
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleOrderAction(order.id, "message")
                              }
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message Seller
                            </Button>

                            {order.status === "Delivered" && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleOrderAction(order.id, "download")
                                  }
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Download Files
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleOrderAction(order.id, "approve")
                                  }
                                  className="text-green-600 hover:text-green-700 border-green-200"
                                >
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleOrderAction(
                                      order.id,
                                      "request_revision"
                                    )
                                  }
                                  className="text-orange-600 hover:text-orange-700 border-orange-200"
                                >
                                  <Edit3 className="h-4 w-4 mr-1" />
                                  Request Revision
                                </Button>
                              </>
                            )}

                            {order.status === "Completed" && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleOrderAction(order.id, "reorder")
                                  }
                                  className="text-blue-600 hover:text-blue-700 border-blue-200"
                                >
                                  <RefreshCw className="h-4 w-4 mr-1" />
                                  Reorder
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleOrderAction(order.id, "leave_review")
                                  }
                                  className="text-yellow-600 hover:text-yellow-700 border-yellow-200"
                                >
                                  <Star className="h-4 w-4 mr-1" />
                                  Leave Review
                                </Button>
                              </>
                            )}

                            {order.status === "In Progress" && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 border-red-200"
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Cancel Order
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Cancel Order
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to cancel this
                                      order? This action cannot be undone and
                                      you may need to contact support for a
                                      refund.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Keep Order
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleOrderAction(order.id, "cancel")
                                      }
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Cancel Order
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredOrders.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No orders found
                    </h3>
                    <p className="text-sm mb-4">
                      {searchTerm || filterStatus !== "all"
                        ? "Try adjusting your search or filter criteria"
                        : "You haven't placed any orders yet"}
                    </p>
                    <Link to="/all-services">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Browse Services
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Message Center
                    <Badge variant="outline">
                      {recentMessages.filter((m) => m.unread).length} unread
                    </Badge>
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.reload()}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Refresh
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-1" />
                      Settings
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {recentMessages.length > 0 ? (
                  <div className="space-y-4">
                    {recentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 border rounded-lg ${
                          message.unread
                            ? "bg-blue-50 border-blue-200"
                            : "hover:bg-gray-50"
                        } transition-colors`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium text-gray-900">
                                {message.seller}
                              </h4>
                              {message.unread && (
                                <Badge className="bg-blue-500 text-white text-xs">
                                  New
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {message.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                              {message.message}
                            </p>
                            <div className="flex items-center text-xs text-gray-500 gap-4">
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {message.time}
                              </span>
                              <span className="flex items-center">
                                <Package className="h-3 w-3 mr-1" />
                                Order #{message.orderId}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMessageReply(message.id)}
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Reply
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleOrderAction(message.orderId, "view")
                              }
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View Order
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No messages yet
                    </h3>
                    <p className="text-sm">
                      Your conversations with sellers will appear here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Favorite Gigs
                    <Badge variant="outline">{favoriteGigs.length} saved</Badge>
                  </CardTitle>
                  <div className="flex gap-2">
                    <Link to="/all-services">
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Browse More
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate("/favorites")}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {favoriteGigs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoriteGigs.slice(0, 6).map((gig) => (
                      <div
                        key={gig.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <Link to={`/gig/${gig.id}`} className="flex-1">
                            <div className="flex items-start space-x-3">
                              {gig.images && gig.images[0] && (
                                <img
                                  src={gig.images[0]}
                                  alt={gig.title}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 line-clamp-2 mb-1">
                                  {gig.title}
                                </h4>
                                <p className="text-sm text-gray-600 mb-2">
                                  by {gig.seller?.name || gig.seller}
                                </p>
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="flex items-center">
                                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                    <span className="text-xs text-gray-600 ml-1">
                                      {gig.seller?.rating || 5.0}
                                    </span>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {gig.category}
                                  </Badge>
                                </div>
                                <p className="text-sm font-semibold text-green-600">
                                  Starting at $
                                  {gig.packages?.[0]?.price || gig.price}
                                </p>
                              </div>
                            </div>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFavorite(gig.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Link to={`/gig/${gig.id}`} className="flex-1">
                            <Button size="sm" className="w-full">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedOrderId(gig.id)}
                          >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No favorite gigs yet
                    </h3>
                    <p className="text-sm mb-4">
                      Save gigs you like to see them here
                    </p>
                    <Link to="/all-services">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Browse Services
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        Your Profile
                      </h3>
                      <p className="text-sm text-gray-600">
                        Manage your account settings and preferences
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="outline">Verified User</Badge>
                        <span className="text-xs text-green-600 flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Account Active
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link to="/profile/edit">
                      <Button
                        variant="outline"
                        className="justify-start h-16 w-full hover:bg-green-50 flex flex-col items-start p-4"
                      >
                        <div className="flex items-center">
                          <Edit3 className="h-4 w-4 mr-2" />
                          <span className="font-medium">Edit Profile</span>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">
                          Update your personal information
                        </span>
                      </Button>
                    </Link>
                    <Link to="/account/settings">
                      <Button
                        variant="outline"
                        className="justify-start h-16 w-full hover:bg-blue-50 flex flex-col items-start p-4"
                      >
                        <div className="flex items-center">
                          <Settings className="h-4 w-4 mr-2" />
                          <span className="font-medium">Account Settings</span>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">
                          Privacy, security, and preferences
                        </span>
                      </Button>
                    </Link>
                    <Link to="/notifications">
                      <Button
                        variant="outline"
                        className="justify-start h-16 w-full hover:bg-purple-50 flex flex-col items-start p-4"
                      >
                        <div className="flex items-center">
                          <Bell className="h-4 w-4 mr-2" />
                          <span className="font-medium">Notifications</span>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">
                          Email and push notification settings
                        </span>
                      </Button>
                    </Link>
                    <Link to="/order-history">
                      <Button
                        variant="outline"
                        className="justify-start h-16 w-full hover:bg-yellow-50 flex flex-col items-start p-4"
                      >
                        <div className="flex items-center">
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          <span className="font-medium">Order History</span>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">
                          View all your past orders
                        </span>
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="justify-start h-16 w-full hover:bg-indigo-50 flex flex-col items-start p-4"
                    >
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2" />
                        <span className="font-medium">Payment Methods</span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        Manage your payment options
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start h-16 w-full hover:bg-orange-50 flex flex-col items-start p-4"
                    >
                      <div className="flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        <span className="font-medium">Help & Support</span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        Get help and contact support
                      </span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Enhanced Message Dialog */}
      <Dialog
        open={selectedOrderId !== null}
        onOpenChange={() => setSelectedOrderId(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Message to Seller</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here... Be specific about your requirements or questions."
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                rows={4}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                {newMessageText.length}/500 characters
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setSelectedOrderId(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!newMessageText.trim()}
              >
                <Send className="h-4 w-4 mr-1" />
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Details Dialog */}
      <Dialog
        open={showOrderDetails !== null}
        onOpenChange={() => setShowOrderDetails(null)}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {showOrderDetails &&
            (() => {
              const order = recentOrders.find((o) => o.id === showOrderDetails);
              return order ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Order ID</Label>
                      <p className="font-mono text-sm">#{order.id}</p>
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Label>Title</Label>
                    <p className="font-medium">{order.title}</p>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <p className="text-sm text-gray-600">{order.description}</p>
                  </div>

                  <div>
                    <Label>Deliverables</Label>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {order.deliverables.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Progress</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Progress value={order.progress} className="flex-1" />
                        <span className="text-sm font-medium">
                          {order.progress}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <Label>Amount</Label>
                      <p className="text-lg font-bold text-green-600">
                        ${order.price}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null;
            })()}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Dashboard;
