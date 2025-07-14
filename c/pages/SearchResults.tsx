import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, Filter, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { allGigsData, searchGigs } from "@/data/gigsData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import EditGig from "@/components/EditGig";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [filteredGigs, setFilteredGigs] = useState(allGigsData);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [allGigs, setAllGigs] = useState(allGigsData);
  const [supabaseGigs, setSupabaseGigs] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteGigs') || '[]');
    setFavorites(savedFavorites);

    // Load user gigs from localStorage
    const userGigs = JSON.parse(localStorage.getItem('userGigs') || '[]');
    
    // Fetch gigs from Supabase database
    fetchSupabaseGigs();

    // Combine all gigs
    const combinedGigs = [...allGigsData, ...userGigs];
    setAllGigs(combinedGigs);
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
        setSupabaseGigs(formattedGigs);
      }
    } catch (error) {
      console.error('Error fetching Supabase gigs:', error);
    }
  };

  useEffect(() => {
    let filtered = [...allGigs, ...supabaseGigs];

    // Filter by search query
    if (query) {
      filtered = filtered.filter(gig => 
        gig.title.toLowerCase().includes(query.toLowerCase()) ||
        gig.description.toLowerCase().includes(query.toLowerCase()) ||
        gig.category.toLowerCase().includes(query.toLowerCase()) ||
        gig.seller?.name.toLowerCase().includes(query.toLowerCase()) ||
        (gig.tags && gig.tags.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase())))
      );
    }

    // Filter by price range
    filtered = filtered.filter(gig => {
      const price = gig.packages?.[0]?.price || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Filter by rating
    if (selectedRating !== "all") {
      const minRating = parseFloat(selectedRating);
      filtered = filtered.filter(gig => (gig.seller?.rating || 0) >= minRating);
    }

    // Filter by seller level
    if (selectedLevel !== "all") {
      filtered = filtered.filter(gig => gig.seller?.level === selectedLevel);
    }

    // Sort results
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.packages?.[0]?.price || 0) - (b.packages?.[0]?.price || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.packages?.[0]?.price || 0) - (a.packages?.[0]?.price || 0));
        break;
      case "rating":
        filtered.sort((a, b) => (b.seller?.rating || 0) - (a.seller?.rating || 0));
        break;
      case "reviews":
        filtered.sort((a, b) => (b.seller?.reviews || 0) - (a.seller?.reviews || 0));
        break;
      default:
        break;
    }

    setFilteredGigs(filtered);
  }, [query, priceRange, selectedRating, selectedLevel, sortBy, allGigs, supabaseGigs]);

  const toggleFavorite = (gigId: number) => {
    console.log('Toggling favorite for gig ID:', gigId);
    
    setFavorites(prev => {
      const isCurrentlyFavorite = prev.includes(gigId);
      const updatedFavorites = isCurrentlyFavorite 
        ? prev.filter(id => id !== gigId)
        : [...prev, gigId];
      
      console.log('Updated favorites:', updatedFavorites);
      localStorage.setItem('favoriteGigs', JSON.stringify(updatedFavorites));
      
      // Find the current gig from all available gigs
      const currentGig = [...allGigs, ...supabaseGigs].find(gig => gig.id === gigId);
      if (currentGig) {
        const savedFavoriteGigs = JSON.parse(localStorage.getItem('favoriteGigsData') || '[]');
        
        if (!isCurrentlyFavorite) {
          // Add to favorites
          if (!savedFavoriteGigs.find((g: any) => g.id === gigId)) {
            savedFavoriteGigs.push(currentGig);
            localStorage.setItem('favoriteGigsData', JSON.stringify(savedFavoriteGigs));
            console.log('Added to favorites:', currentGig.title);
          }
        } else {
          // Remove from favorites
          const filteredGigs = savedFavoriteGigs.filter((g: any) => g.id !== gigId);
          localStorage.setItem('favoriteGigsData', JSON.stringify(filteredGigs));
          console.log('Removed from favorites:', currentGig.title);
        }
      }
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('favoritesUpdated'));
      
      return updatedFavorites;
    });
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {query ? `Results for "${query}"` : "All Services"}
          </h1>
          <p className="text-gray-600">{filteredGigs.length} services available</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold mb-4 flex items-center text-lg">
                <Filter className="h-5 w-5 mr-2 text-green-600" />
                Filters
              </h3>
              
              {/* Price Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Price Range</label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  step={10}
                  className="mb-3"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Minimum Rating</label>
                <Select value={selectedRating} onValueChange={setSelectedRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any rating</SelectItem>
                    <SelectItem value="4.5">4.5+ stars</SelectItem>
                    <SelectItem value="4.0">4.0+ stars</SelectItem>
                    <SelectItem value="3.5">3.5+ stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Seller Level Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Seller Level</label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any level</SelectItem>
                    <SelectItem value="Top Rated Seller">Top Rated Seller</SelectItem>
                    <SelectItem value="Level 2 Seller">Level 2 Seller</SelectItem>
                    <SelectItem value="Level 1 Seller">Level 1 Seller</SelectItem>
                    <SelectItem value="New Seller">New Seller</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="rating">Best Rating</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Gigs Grid */}
            {filteredGigs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredGigs.map((gig) => (
                  <div key={gig.id} className="relative">
                    <Link to={`/gig/${gig.id}`}>
                      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white">
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
                            className={`absolute top-3 right-3 bg-white/90 hover:bg-white shadow-md ${
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
                          <span className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
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
                        
                        <CardContent className="p-5">
                          <div className="flex items-center mb-3">
                            <img
                              src={gig.seller?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"}
                              alt={gig.seller?.name || "Seller"}
                              className="w-8 h-8 rounded-full mr-3"
                              onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face";
                              }}
                            />
                            <div>
                              <span className="text-sm font-medium text-gray-800">{gig.seller?.name || "Anonymous"}</span>
                              <p className="text-xs text-gray-500">{gig.seller?.level || "New Seller"}</p>
                            </div>
                          </div>
                          
                          <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                            {gig.title}
                          </h3>
                          
                          <div className="flex items-center mb-4">
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
                            <span className="text-xl font-bold text-gray-900">
                              ${gig.packages?.[0]?.price || 0}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                    
                    {/* Owner Actions - Only show for user's own gigs */}
                    {gig.seller?.name === "You" && (
                      <div className="absolute top-2 right-14 flex gap-1 z-10">
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
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No services found</h3>
                  <p className="text-gray-500 mb-4">
                    We couldn't find any services matching your search criteria.
                  </p>
                  <Button 
                    onClick={() => {
                      setSelectedRating("all");
                      setSelectedLevel("all");
                      setPriceRange([0, 500]);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchResults;
