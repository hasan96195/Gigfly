
import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  ShoppingBag, 
  MessageSquare, 
  Settings, 
  LogOut,
  BarChart3,
  Shield,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import AdminUserManagement from '@/components/admin/AdminUserManagement';
import AdminGigManagement from '@/components/admin/AdminGigManagement';
import AdminOrderManagement from '@/components/admin/AdminOrderManagement';
import AdminSettings from '@/components/admin/AdminSettings';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { adminUser, logout, loading } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalGigs: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !adminUser) {
      console.log('No admin user found, redirecting to login');
      navigate('/admin/login');
    }
  }, [adminUser, loading, navigate]);

  useEffect(() => {
    if (adminUser) {
      fetchStats();
    }
  }, [adminUser]);

  const fetchStats = async () => {
    try {
      console.log('Fetching admin dashboard stats...');
      setStatsLoading(true);
      setError(null);
      
      // Create a temporary admin session for data access
      const adminSessionToken = localStorage.getItem('admin_session_token');
      console.log('Admin session token:', adminSessionToken);

      // Fetch total users count
      console.log('Fetching users count...');
      const { count: usersCount, error: usersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      console.log('Users count result:', { usersCount, usersError });

      // Fetch total gigs count
      console.log('Fetching gigs count...');
      const { count: gigsCount, error: gigsError } = await supabase
        .from('gigs')
        .select('*', { count: 'exact', head: true });

      console.log('Gigs count result:', { gigsCount, gigsError });

      // Fetch total orders count
      console.log('Fetching orders count...');
      const { count: ordersCount, error: ordersError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });

      console.log('Orders count result:', { ordersCount, ordersError });

      // Fetch total revenue
      console.log('Fetching revenue data...');
      const { data: revenueData, error: revenueError } = await supabase
        .from('orders')
        .select('amount')
        .eq('status', 'completed');

      console.log('Revenue data result:', { revenueData, revenueError });

      if (usersError || gigsError || ordersError || revenueError) {
        const errors = [usersError, gigsError, ordersError, revenueError].filter(Boolean);
        console.error('Errors fetching stats:', errors);
        setError(`Failed to fetch some statistics: ${errors.map(e => e?.message).join(', ')}`);
      }

      const totalRevenue = revenueData?.reduce((sum, order) => {
        const amount = Number(order.amount) || 0;
        return sum + amount;
      }, 0) || 0;

      console.log('Final stats:', {
        users: usersCount || 0,
        gigs: gigsCount || 0,
        orders: ordersCount || 0,
        revenue: totalRevenue
      });

      setStats({
        totalUsers: usersCount || 0,
        totalGigs: gigsCount || 0,
        totalOrders: ordersCount || 0,
        totalRevenue: totalRevenue
      });

      if (!error) {
        toast({
          title: "Dashboard updated",
          description: "Statistics have been refreshed successfully."
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch dashboard statistics';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setStatsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully."
      });
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!adminUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {adminUser.full_name || adminUser.username}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-700">{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchStats}
              className="ml-auto"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold">
                    {statsLoading ? '...' : stats.totalUsers}
                  </p>
                  <p className="text-gray-600">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold">
                    {statsLoading ? '...' : stats.totalGigs}
                  </p>
                  <p className="text-gray-600">Total Gigs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold">
                    {statsLoading ? '...' : stats.totalOrders}
                  </p>
                  <p className="text-gray-600">Total Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold">
                    ${statsLoading ? '...' : stats.totalRevenue.toFixed(2)}
                  </p>
                  <p className="text-gray-600">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Management Panel
              <Button
                variant="outline"
                size="sm"
                onClick={fetchStats}
                disabled={statsLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${statsLoading ? 'animate-spin' : ''}`} />
                Refresh Stats
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="gigs">Gigs</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="users" className="mt-6">
                <AdminUserManagement />
              </TabsContent>
              
              <TabsContent value="gigs" className="mt-6">
                <AdminGigManagement />
              </TabsContent>
              
              <TabsContent value="orders" className="mt-6">
                <AdminOrderManagement />
              </TabsContent>
              
              <TabsContent value="settings" className="mt-6">
                <AdminSettings />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
