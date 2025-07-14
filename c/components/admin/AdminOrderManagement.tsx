
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, Edit, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  gigs?: { title: string } | null;
  buyer_profiles?: { email: string; full_name?: string } | null;
  seller_profiles?: { email: string; full_name?: string } | null;
}

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      console.log('Fetching orders for admin management...');
      setLoading(true);
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          gigs (title),
          buyer_profiles:profiles!orders_buyer_id_fkey (email, full_name),
          seller_profiles:profiles!orders_seller_id_fkey (email, full_name)
        `)
        .order('created_at', { ascending: false });

      console.log('Orders fetch result:', { data, error });

      if (error) {
        console.error('Error fetching orders:', error);
        // If the join fails, fetch without joins
        const { data: simpleData, error: simpleError } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!simpleError && simpleData) {
          console.log(`Fetched ${simpleData.length} orders (simple query)`);
          setOrders(simpleData);
          toast({
            title: "Orders loaded",
            description: `Loaded ${simpleData.length} orders (limited info due to data constraints)`
          });
        } else {
          toast({
            title: "Error",
            description: `Failed to fetch orders: ${error.message}`,
            variant: "destructive"
          });
        }
      } else if (data) {
        console.log(`Fetched ${data.length} orders with full details`);
        setOrders(data);
        toast({
          title: "Orders loaded",
          description: `Loaded ${data.length} orders successfully`
        });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.id.toLowerCase().includes(searchLower) ||
      order.gigs?.title?.toLowerCase().includes(searchLower) ||
      order.buyer_profiles?.email?.toLowerCase().includes(searchLower) ||
      order.seller_profiles?.email?.toLowerCase().includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower)
    );
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Order Management ({orders.length} orders)</h3>
        <Button onClick={fetchOrders} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Orders
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Gig Title</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id.slice(0, 8)}</TableCell>
                <TableCell>{order.gigs?.title || 'N/A'}</TableCell>
                <TableCell>
                  {order.buyer_profiles?.full_name || order.buyer_profiles?.email || 'N/A'}
                </TableCell>
                <TableCell>
                  {order.seller_profiles?.full_name || order.seller_profiles?.email || 'N/A'}
                </TableCell>
                <TableCell>${Number(order.amount).toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeColor(order.status)}>
                    {order.status?.replace('_', ' ') || 'pending'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(order.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredOrders.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          {orders.length === 0 ? 'No orders found in the database.' : 'No orders found matching your search.'}
        </div>
      )}
    </div>
  );
};

export default AdminOrderManagement;
