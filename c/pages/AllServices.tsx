import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { allGigsData } from "@/data/gigsData";
import { useToast } from "@/hooks/use-toast";
import EditGig from "@/components/EditGig";

const AllServices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [allGigs, setAllGigs] = useState(allGigsData);
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
    // Load favorites and user gigs from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteGigs') || '[]');
    setFavorites(savedFavorites);

    const userGigs = JSON.parse(localStorage.getItem('userGigs') || '[]');
    console.log('User gigs loaded:', userGigs);
    setAllGigs(prev => [...prev, ...userGigs]);

    // Listen for new gigs
    const handleGigCreated = (event: any) => {
      const newGig = event.detail;
      setAllGigs(prev => [...prev, newGig]);
    };

    const handleFavoritesUpdated = () => {
      const updatedFavorites = JSON.parse(localStorage.getItem('favoriteGigs') || '[]');
      setFavorites(updatedFavorites);
    };

    window.addEventListener('gigCreated', handleGigCreated);
    window.addEventListener('favoritesUpdated', handleFavoritesUpdated);
    
    return () => {
      window.removeEventListener('gigCreated', handleGigCreated);
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdated);
    };
  }, []);

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
    const currentGig = allGigs.find(gig => gig.id === gigId);
    if (currentGig) {
      const savedFavoriteGigs = JSON.parse(localStorage.getItem('favoriteGigsData') || '[]');
      if (!isCurrentlyFavorite) {
        if (!savedFavoriteGigs.find((g: any) => g.id === gigId)) {
          savedFavoriteGigs.push(currentGig);
          localStorage.setItem('favoriteGigsData', JSON.stringify(savedFavoriteGigs));
        }
      } else {
        const filteredGigs = savedFavoriteGigs.filter((g: any) => g.id !== gigId);
        localStorage.setItem('favoriteGigsData', JSON.stringify(filteredGigs));
      }
    }
    
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  // Filter and sort gigs
  const filteredGigs = allGigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || gig.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedGigs = [...filteredGigs].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.packages?.[0]?.price || 0) - (b.packages?.[0]?.price || 0);
      case "price-high":
        return (b.packages?.[0]?.price || 0) - (a.packages?.[0]?.price || 0);
      case "rating":
        return (b.seller?.rating || 0) - (a.seller?.rating || 0);
      case "newest":
      default:
        return b.id - a.id; // Sort by ID instead of createdAt
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Services</h1>
          <p className="text-gray-600">Browse through all available services</p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-sm text-gray-600 flex items-center">
              {sortedGigs.length} services found
            </div>
          </div>
        </div>

        {/* Gigs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedGigs.map((gig) => (
            <div key={gig.id} className="relative">
              <Link to={`/gig/${gig.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative">
                    <img
                      src={gig.images[0]}
                      alt={gig.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        console.log('Image load error for gig:', gig.id, 'URL:', gig.images[0]);
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

        {sortedGigs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default AllServices;
