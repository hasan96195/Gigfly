import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Search, Plus, Eye, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Gig {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  delivery_time: number;
  seller_id: string;
  status?: string;
  created_at: string;
  profiles?: { full_name: string; email: string }[] | null;
}

interface User {
  id: string;
  email: string;
  full_name?: string;
  role: string;
}

const AdminGigManagement = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newGig, setNewGig] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    delivery_time: '',
    seller_id: ''
  });
  const { toast } = useToast();

  const categories = [
    "Graphics & Design",
    "Digital Marketing", 
    "Writing & Translation",
    "Video & Animation",
    "Music & Audio",
    "Programming & Tech",
    "Business",
    "Lifestyle"
  ];

  useEffect(() => {
    fetchGigs();
    fetchUsers();
  }, []);

  const fetchGigs = async () => {
    try {
      const { data, error } = await supabase
        .from('gigs')
        .select(`
          *,
          profiles (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setGigs(data);
      } else {
        console.error('Error fetching gigs:', error);
      }
    } catch (error) {
      console.error('Error fetching gigs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .in('role', ['seller', 'admin']);

      if (!error && data) {
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createGig = async () => {
    try {
      const { error } = await supabase
        .from('gigs')
        .insert({
          title: newGig.title,
          description: newGig.description,
          category: newGig.category,
          price: parseFloat(newGig.price),
          delivery_time: parseInt(newGig.delivery_time),
          seller_id: newGig.seller_id,
          status: 'active'
        });

      if (error) {
        toast({
          title: "Error creating gig",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Gig created successfully",
        description: `Gig "${newGig.title}" has been created`
      });

      setShowCreateDialog(false);
      setNewGig({
        title: '',
        description: '',
        category: '',
        price: '',
        delivery_time: '',
        seller_id: ''
      });
      fetchGigs();
    } catch (error) {
      console.error('Error creating gig:', error);
      toast({
        title: "Error",
        description: "Failed to create gig",
        variant: "destructive"
      });
    }
  };

  const updateGigStatus = async (gigId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('gigs')
        .update({ status })
        .eq('id', gigId);

      if (error) {
        toast({
          title: "Error updating gig",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Gig updated",
        description: `Gig status changed to ${status}`
      });

      fetchGigs();
    } catch (error) {
      console.error('Error updating gig:', error);
    }
  };

  const deleteGig = async (gigId: string) => {
    try {
      const { error } = await supabase
        .from('gigs')
        .delete()
        .eq('id', gigId);

      if (error) {
        toast({
          title: "Error deleting gig",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Gig deleted",
        description: "Gig has been removed"
      });

      fetchGigs();
    } catch (error) {
      console.error('Error deleting gig:', error);
    }
  };

  const filteredGigs = gigs.filter(gig =>
    gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gig.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeColor = (status?: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getSellerName = (profiles?: { full_name: string; email: string }[] | null) => {
    if (!profiles || profiles.length === 0) return 'Unknown';
    const profile = profiles[0];
    return profile.full_name || profile.email;
  };

  if (loading) {
    return <div className="text-center py-8">Loading gigs...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gig Management</h3>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Gig
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Gig</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Gig Title</Label>
                <Input
                  id="title"
                  value={newGig.title}
                  onChange={(e) => setNewGig(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="I will create amazing designs for your business"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newGig.category} onValueChange={(value) => setNewGig(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="seller">Seller</Label>
                <Select value={newGig.seller_id} onValueChange={(value) => setNewGig(prev => ({ ...prev, seller_id: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a seller" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map(user => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.full_name || user.email} ({user.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newGig.price}
                    onChange={(e) => setNewGig(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="50"
                  />
                </div>
                <div>
                  <Label htmlFor="delivery_time">Delivery Time (days)</Label>
                  <Input
                    id="delivery_time"
                    type="number"
                    value={newGig.delivery_time}
                    onChange={(e) => setNewGig(prev => ({ ...prev, delivery_time: e.target.value }))}
                    placeholder="3"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newGig.description}
                  onChange={(e) => setNewGig(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your service in detail..."
                  rows={4}
                />
              </div>
              <Button onClick={createGig} className="w-full">
                Create Gig
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search gigs..."
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
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGigs.map((gig) => (
              <TableRow key={gig.id}>
                <TableCell className="font-medium">{gig.title}</TableCell>
                <TableCell>{gig.category}</TableCell>
                <TableCell>{getSellerName(gig.profiles)}</TableCell>
                <TableCell>${gig.price}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeColor(gig.status)}>
                    {gig.status || 'active'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {gig.status === 'pending' && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-green-600 hover:text-green-700"
                          onClick={() => updateGigStatus(gig.id, 'active')}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => updateGigStatus(gig.id, 'rejected')}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => deleteGig(gig.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredGigs.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No gigs found matching your search.
        </div>
      )}
    </div>
  );
};

export default AdminGigManagement;
