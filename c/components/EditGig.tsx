
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditGigProps {
  gig: any;
  onUpdate: (updatedGig: any) => void;
}

const EditGig = ({ gig, onUpdate }: EditGigProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: gig.title,
    description: gig.description,
    category: gig.category,
    price: gig.packages?.[0]?.price || 0,
    delivery: gig.packages?.[0]?.delivery || "3 days",
    image: gig.images?.[0] || ""
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedGig = {
      ...gig,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      images: [formData.image],
      packages: [{
        ...gig.packages[0],
        price: Number(formData.price),
        delivery: formData.delivery
      }]
    };

    // Update in localStorage
    const userGigs = JSON.parse(localStorage.getItem('userGigs') || '[]');
    const updatedUserGigs = userGigs.map((g: any) => 
      g.id === gig.id ? updatedGig : g
    );
    localStorage.setItem('userGigs', JSON.stringify(updatedUserGigs));

    // Update favorites if this gig is in favorites
    const favoriteGigs = JSON.parse(localStorage.getItem('favoriteGigsData') || '[]');
    const updatedFavoriteGigs = favoriteGigs.map((g: any) => 
      g.id === gig.id ? updatedGig : g
    );
    localStorage.setItem('favoriteGigsData', JSON.stringify(updatedFavoriteGigs));

    onUpdate(updatedGig);
    setOpen(false);
    
    toast({
      title: "Gig updated successfully!",
      description: "Your gig has been updated and is now live.",
    });

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('gigUpdated', { detail: updatedGig }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-1">
          <Edit className="h-3 w-3" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Gig</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="I will..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
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
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your service..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price ($)</label>
              <Input
                type="number"
                min="5"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Delivery Time</label>
              <Select value={formData.delivery} onValueChange={(value) => setFormData(prev => ({ ...prev, delivery: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 day">1 day</SelectItem>
                  <SelectItem value="2 days">2 days</SelectItem>
                  <SelectItem value="3 days">3 days</SelectItem>
                  <SelectItem value="5 days">5 days</SelectItem>
                  <SelectItem value="7 days">7 days</SelectItem>
                  <SelectItem value="14 days">14 days</SelectItem>
                  <SelectItem value="30 days">30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <Input
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Update Gig
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditGig;
