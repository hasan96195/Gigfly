
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface GigPackage {
  name: string;
  price: number;
  description: string;
  deliveryTime: number;
  revisions: number;
}

interface CreateGigProps {
  onGigCreated: (gig: any) => void;
  onClose: () => void;
}

const CreateGig = ({ onGigCreated, onClose }: CreateGigProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    images: [] as string[],
  });
  
  const [packages, setPackages] = useState<GigPackage[]>([
    { name: "Basic", price: 0, description: "", deliveryTime: 1, revisions: 1 },
    { name: "Standard", price: 0, description: "", deliveryTime: 3, revisions: 3 },
    { name: "Premium", price: 0, description: "", deliveryTime: 5, revisions: 5 },
  ]);
  
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const categories = [
    "Graphics & Design",
    "Digital Marketing",
    "Writing & Translation",
    "Video & Animation",
    "Music & Audio",
    "Programming & Tech",
    "Business",
    "Lifestyle",
  ];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + imageFiles.length > 5) {
      toast({
        title: "Too many images",
        description: "You can upload maximum 5 images",
        variant: "destructive",
      });
      return;
    }

    const newFiles = files.slice(0, 5 - imageFiles.length);
    
    // Create preview URLs for immediate display
    const previewUrls = newFiles.map(file => URL.createObjectURL(file));
    
    setImageFiles(prev => [...prev, ...newFiles]);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...previewUrls]
    }));
  };

  const removeImage = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newUrls = formData.images.filter((_, i) => i !== index);
    
    setImageFiles(newFiles);
    setFormData(prev => ({
      ...prev,
      images: newUrls
    }));
  };

  const updatePackage = (index: number, field: keyof GigPackage, value: string | number) => {
    setPackages(prev => prev.map((pkg, i) => 
      i === index ? { ...pkg, [field]: value } : pkg
    ));
  };

  const uploadImagesToStorage = async (files: File[]) => {
    const uploadedUrls: string[] = [];
    
    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('gig-images')
        .upload(fileName, file);
      
      if (error) {
        console.error('Upload error:', error);
        continue;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('gig-images')
        .getPublicUrl(data.path);
      
      uploadedUrls.push(publicUrl);
    }
    
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (packages.every(pkg => pkg.price === 0)) {
      toast({
        title: "Set package prices",
        description: "Please set at least one package price",
        variant: "destructive",
      });
      return;
    }

    try {
      // Upload images to Supabase storage
      const uploadedImageUrls = await uploadImagesToStorage(imageFiles);
      
      const finalImages = uploadedImageUrls.length > 0 ? uploadedImageUrls : ["/placeholder.svg"];

      const newGig = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        category: formData.category,
        images: finalImages,
        packages: packages.filter(pkg => pkg.price > 0).map(pkg => ({
          name: pkg.name,
          price: pkg.price,
          delivery: `${pkg.deliveryTime} day${pkg.deliveryTime > 1 ? 's' : ''}`,
          revisions: pkg.revisions,
          features: [pkg.description || `${pkg.name} package features`]
        })),
        seller: {
          name: "You",
          avatar: "/placeholder.svg",
          level: "New Seller",
          rating: 5.0,
          reviews: 0,
          memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          languages: ["English"]
        },
        portfolio: finalImages.length > 0 ? finalImages.slice(0, 3) : ["/placeholder.svg"],
        reviews: [],
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
        status: "active",
        createdAt: new Date().toISOString(),
      };

      // Add to localStorage for persistence
      const existingGigs = JSON.parse(localStorage.getItem('userGigs') || '[]');
      const updatedGigs = [...existingGigs, newGig];
      localStorage.setItem('userGigs', JSON.stringify(updatedGigs));

      onGigCreated(newGig);
      
      toast({
        title: "Gig created successfully!",
        description: "Your gig is now live and visible to buyers",
      });

      onClose();
    } catch (error) {
      console.error('Error creating gig:', error);
      toast({
        title: "Error creating gig",
        description: "There was an error uploading your images. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Create New Gig</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Gig Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="I will create amazing designs for your business"
                  maxLength={80}
                />
                <p className="text-sm text-gray-500 mt-1">{formData.title.length}/80 characters</p>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
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
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your service in detail..."
                  rows={4}
                  maxLength={1200}
                />
                <p className="text-sm text-gray-500 mt-1">{formData.description.length}/1200 characters</p>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="logo design, branding, business cards"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <Label>Gig Images</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="flex flex-col items-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload up to 5 images</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button type="button" variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>
                    Choose Images
                  </Button>
                </div>
                
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                    {formData.images.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Gig image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Packages */}
            <div>
              <Label>Packages</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                {packages.map((pkg, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{pkg.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-xs">Price ($)</Label>
                        <Input
                          type="number"
                          min="0"
                          value={pkg.price || ''}
                          onChange={(e) => updatePackage(index, 'price', parseInt(e.target.value) || 0)}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Description</Label>
                        <Textarea
                          rows={2}
                          value={pkg.description}
                          onChange={(e) => updatePackage(index, 'description', e.target.value)}
                          placeholder="Package description"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Delivery Time (days)</Label>
                        <Input
                          type="number"
                          min="1"
                          value={pkg.deliveryTime}
                          onChange={(e) => updatePackage(index, 'deliveryTime', parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Revisions</Label>
                        <Input
                          type="number"
                          min="0"
                          value={pkg.revisions}
                          onChange={(e) => updatePackage(index, 'revisions', parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Create Gig
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateGig;
