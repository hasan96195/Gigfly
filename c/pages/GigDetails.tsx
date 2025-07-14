import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Heart, Share2, Flag, Check, Clock, RefreshCw } from "lucide-react";
import { allGigsData } from "@/data/gigsData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const GigDetails = () => {
  const { id } = useParams();
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [gigData, setGigData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const gigId = parseInt(id || "0");

  useEffect(() => {
    const fetchGigData = async () => {
      setLoading(true);
      
      // First, try to find in default gigs data
      let foundGig = allGigsData.find(gig => gig.id === gigId);
      
      if (!foundGig) {
        // If not found, try user-created gigs from localStorage
        const userGigs = JSON.parse(localStorage.getItem('userGigs') || '[]');
        foundGig = userGigs.find((gig: any) => gig.id === gigId);
      }
      
      if (!foundGig) {
        // If still not found, try Supabase gigs
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
            .eq('status', 'active');

          if (!error && data) {
            const formattedGigs = data.map((gig: any) => ({
              id: parseInt(gig.id.replace(/-/g, '').slice(0, 8), 16),
              title: gig.title,
              description: gig.description,
              category: gig.category,
              images: gig.images && gig.images.length > 0 ? gig.images : ["https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop"],
              packages: [
                {
                  name: "Basic",
                  price: Number(gig.price),
                  delivery: `${gig.delivery_time} day${gig.delivery_time > 1 ? 's' : ''}`,
                  revisions: 2,
                  features: [gig.description?.slice(0, 50) + '...' || "Basic package features"]
                }
              ],
              seller: {
                name: gig.profiles?.[0]?.full_name || gig.profiles?.[0]?.email || "Admin Created",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
                level: "Verified Seller",
                rating: 5.0,
                reviews: 0,
                memberSince: new Date(gig.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                languages: ["English"]
              },
              portfolio: gig.images && gig.images.length > 0 ? gig.images.slice(0, 3) : ["https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=300&fit=crop"],
              reviews: [],
              tags: [gig.category.toLowerCase().replace(/\s+/g, '-')],
              status: "active",
              createdAt: gig.created_at,
              isSupabaseGig: true
            }));
            
            foundGig = formattedGigs.find((gig: any) => gig.id === gigId);
          }
        } catch (error) {
          console.error('Error fetching Supabase gigs:', error);
        }
      }
      
      setGigData(foundGig);
      setLoading(false);
    };

    fetchGigData();
  }, [gigId]);

  useEffect(() => {
    if (gigData) {
      // Check if gig is in favorites
      const favorites = JSON.parse(localStorage.getItem('favoriteGigs') || '[]');
      setIsFavorite(favorites.includes(gigId));
    }
  }, [gigId, gigData]);

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteGigs') || '[]');
    const favoriteGigsData = JSON.parse(localStorage.getItem('favoriteGigsData') || '[]');
    
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((id: number) => id !== gigId);
      const updatedFavoriteGigsData = favoriteGigsData.filter((gig: any) => gig.id !== gigId);
      
      localStorage.setItem('favoriteGigs', JSON.stringify(updatedFavorites));
      localStorage.setItem('favoriteGigsData', JSON.stringify(updatedFavoriteGigsData));
      setIsFavorite(false);
      
      toast({
        title: "Removed from favorites",
        description: "This gig has been removed from your favorites",
      });
    } else {
      // Add to favorites
      const updatedFavorites = [...favorites, gigId];
      const updatedFavoriteGigsData = [...favoriteGigsData, gigData];
      
      localStorage.setItem('favoriteGigs', JSON.stringify(updatedFavorites));
      localStorage.setItem('favoriteGigsData', JSON.stringify(updatedFavoriteGigsData));
      setIsFavorite(true);
      
      toast({
        title: "Added to favorites",
        description: "This gig has been added to your favorites",
      });
    }
    
    // Dispatch event to update other components
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  const handleShare = async () => {
    const url = window.location.href;
    const text = `Check out this amazing gig: ${gigData?.title}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: gigData?.title,
          text: text,
          url: url,
        });
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link copied!",
          description: "Gig link has been copied to your clipboard",
        });
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link copied!",
          description: "Gig link has been copied to your clipboard",
        });
      } catch (error) {
        toast({
          title: "Share failed",
          description: "Unable to share or copy link",
          variant: "destructive",
        });
      }
    }
  };

  const handleReport = () => {
    toast({
      title: "Report submitted",
      description: "Thank you for reporting this gig. We'll review it within 24 hours.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p>Loading gig details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!gigData) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-6">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={gigData.images[currentImageIndex]}
                  alt="Gig showcase"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop";
                  }}
                />
              </div>
              <div className="flex space-x-2">
                {gigData.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 rounded border-2 overflow-hidden ${
                      currentImageIndex === index ? 'border-green-500' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`Preview ${index + 1}`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop";
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Title and Seller Info */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{gigData.title}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={gigData.seller.avatar}
                  alt={gigData.seller.name}
                  className="w-12 h-12 rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face";
                  }}
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{gigData.seller.name}</h3>
                  <p className="text-sm text-gray-600">{gigData.seller.level}</p>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700 ml-1">
                    {gigData.seller.rating}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    ({gigData.seller.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <button 
                  onClick={handleAddToFavorites}
                  className={`flex items-center hover:text-green-600 transition-colors ${
                    isFavorite ? 'text-red-500' : ''
                  }`}
                >
                  <Heart className={`h-4 w-4 mr-1 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center hover:text-green-600 transition-colors"
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </button>
                <button 
                  onClick={handleReport}
                  className="flex items-center hover:text-green-600 transition-colors"
                >
                  <Flag className="h-4 w-4 mr-1" />
                  Report
                </button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{gigData.description}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="portfolio" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {gigData.portfolio.map((image: string, index: number) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Portfolio ${index + 1}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=300&fit=crop";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {gigData.reviews && gigData.reviews.length > 0 ? gigData.reviews.map((review: any) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                        <div>
                          <h4 className="font-medium text-gray-900">{review.user}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  )) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No reviews yet</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Packages */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle>Choose a Package</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {gigData.packages.map((pkg: any, index: number) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedPackage === index ? 'border-green-500 bg-green-50' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedPackage(index)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-gray-900">{pkg.name}</h3>
                        <span className="text-2xl font-bold text-gray-900">${pkg.price}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{pkg.delivery || `${pkg.deliveryTime} day${pkg.deliveryTime > 1 ? 's' : ''}`} delivery</span>
                        <RefreshCw className="h-4 w-4 ml-4 mr-1" />
                        <span>{pkg.revisions} revisions</span>
                      </div>
                      
                      <ul className="space-y-1">
                        {(pkg.features || [pkg.description || 'Basic package']).map((feature: string, i: number) => (
                          <li key={i} className="flex items-center text-sm text-gray-700">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  
                  <Link to={`/checkout/${id}?package=${selectedPackage}`}>
                    <Button className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg">
                      Continue (${gigData.packages[selectedPackage].price})
                    </Button>
                  </Link>
                  
                  <Button variant="outline" className="w-full">
                    Contact Seller
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GigDetails;
