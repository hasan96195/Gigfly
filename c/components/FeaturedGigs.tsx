import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { allGigsData } from "@/data/gigsData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import EditGig from "./EditGig";

const FeaturedGigs = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [allGigs, setAllGigs] = useState(allGigsData);
  const [supabaseGigs, setSupabaseGigs] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load favorites from localStorage on component mount
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteGigs') || '[]');
    setFavorites(savedFavorites);

    // Load user-created gigs from localStorage
    const userGigs = JSON.parse(localStorage.getItem('userGigs') || '[]');
    
    // Fetch gigs from Supabase database
    fetchSupabaseGigs();

    // Listen for new gigs
    const handleGigCreated = (event: any) => {
      const newGig = event.detail;
      setAllGigs(prev => [...prev, newGig]);
    };

    window.addEventListener('gigCreated', handleGigCreated);
    
    return () => {
      window.removeEventListener('gigCreated', handleGigCreated);
    };
  }, []);

  const fetchSupabaseGigs = async () => {
    try {
      console.log('Fetching gigs from Supabase...');
      const { data, error } = await supabase
        .from('gigs')
        .select(`
          *,
          profiles (
            full_name,
            email
          )
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (!error && data) {
        console.log('Supabase gigs fetched:', data);
        // Convert Supabase gigs to match the expected format
        const formattedGigs = data.map((gig: any) => ({
          id: parseInt(gig.id.replace(/-/g, '').slice(0, 8), 16), // Convert UUID to number for compatibility
          title: gig.title,
          description: gig.description,
          category: gig.category,
          images: gig.images && gig.images.length > 0 ? gig.images : ["https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop"],
          packages: [
            {
              name: "Basic",
              price: Number(gig.price),
              delivery: `${gig.delivery_time} day${gig.delivery_time > 1 ? 's' : ''}`,
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
        setSupabaseGigs(formattedGigs);
      }
    } catch (error) {
      console.error('Error fetching Supabase gigs:', error);
    }
  };

  const handleDeleteGig = (gigId: number) => {
    if (window.confirm('Are you sure you want to delete this gig?')) {
      // Remove from userGigs
      const userGigs = JSON.parse(localStorage.getItem('userGigs') || '[]');
      const updatedUserGigs = userGigs.filter((gig: any) => gig.id !== gigId);
      localStorage.setItem('userGigs', JSON.stringify(updatedUserGigs));

      // Remove from favorites if it exists
      const favoriteGigs = JSON.parse(localStorage.getItem('favoriteGigsData') || '[]');
      const updatedFavoriteGigs = favoriteGigs.filter((gig: any) => gig.id !== gigId);
      localStorage.setItem('favoriteGigsData', JSON.stringify(updatedFavoriteGigs));

      // Remove from favorites list
      const updatedFavorites = favorites.filter(id => id !== gigId);
      setFavorites(updatedFavorites);
      localStorage.setItem('favoriteGigs', JSON.stringify(updatedFavorites));

      // Update local state
      setAllGigs(prev => prev.filter(gig => gig.id !== gigId));

      toast({
        title: "Gig deleted",
        description: "Your gig has been deleted successfully.",
      });

      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('gigDeleted'));
    }
  };

  const handleUpdateGig = (updatedGig: any) => {
    setAllGigs(prev => prev.map(gig => gig.id === updatedGig.id ? updatedGig : gig));
  };

  const toggleFavorite = (gigId: number) => {
    const isCurrentlyFavorite = favorites.includes(gigId);
    const updatedFavorites = isCurrentlyFavorite 
      ? favorites.filter(id => id !== gigId)
      : [...favorites, gigId];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteGigs', JSON.stringify(updatedFavorites));
    
    // Also update the full gig data in localStorage
    const currentGig = [...allGigs, ...supabaseGigs].find(gig => gig.id === gigId);
    if (currentGig) {
      const savedFavoriteGigs = JSON.parse(localStorage.getItem('favoriteGigsData') || '[]');
      if (!isCurrentlyFavorite) {
        // Add to favorites
        if (!savedFavoriteGigs.find((g: any) => g.id === gigId)) {
          savedFavoriteGigs.push(currentGig);
          localStorage.setItem('favoriteGigsData', JSON.stringify(savedFavoriteGigs));
        }
      } else {
        // Remove from favorites
        const filteredGigs = savedFavoriteGigs.filter((g: any) => g.id !== gigId);
        localStorage.setItem('favoriteGigsData', JSON.stringify(filteredGigs));
      }
    }
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  // Combine all gigs (default data + user created + Supabase gigs) and show first 8 as featured
  const combinedGigs = [...allGigs, ...supabaseGigs];
  const featuredGigs = combinedGigs.slice(0, 8);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Featured services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGigs.map((gig) => (
            <div key={gig.id} className="relative">
              <Link to={`/gig/${gig.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative">
                    <img
                      src={gig.images[0]}
                      alt={gig.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop";
                      }}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
                        favorites.includes(gig.id) ? 'text-red-500' : 'text-gray-600'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(gig.id);
                      }}
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(gig.id) ? 'fill-current' : ''}`} />
                    </Button>
                    <span className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {gig.category}
                    </span>
                    {gig.seller?.name === "You" && (
                      <span className="absolute bottom-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
                        Your Gig
                      </span>
                    )}
                    {gig.isSupabaseGig && (
                      <span className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
                        Admin Created
                      </span>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <img
                        src={gig.seller?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"}
                        alt={gig.seller?.name || "Seller"}
                        className="w-8 h-8 rounded-full mr-2"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face";
                        }}
                      />
                      <span className="text-sm font-medium text-gray-700">{gig.seller?.name || "Anonymous"}</span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                      {gig.title}
                    </h3>
                    
                    <div className="flex items-center mb-3">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700 ml-1">
                        {gig.seller?.rating || 5.0}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        ({gig.seller?.reviews || 0})
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Starting at</span>
                      <span className="text-lg font-bold text-gray-900">
                        ${gig.packages?.[0]?.price || 0}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              {/* Owner Actions - Only show for user's own gigs */}
              {gig.seller?.name === "You" && (
                <div className="absolute top-2 right-12 flex gap-1 z-10">
                  <EditGig gig={gig} onUpdate={handleUpdateGig} />
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/90 hover:bg-white text-red-600 hover:text-red-700 border-red-200"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteGig(gig.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/all-services">
            <Button variant="outline" size="lg">
              View More Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGigs;
