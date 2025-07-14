
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const FavoritesPopover = () => {
  const [favoriteGigs, setFavoriteGigs] = useState<any[]>([]);

  useEffect(() => {
    // Load favorite gigs on component mount
    const loadFavorites = () => {
      const savedFavorites = JSON.parse(localStorage.getItem('favoriteGigsData') || '[]');
      console.log('Loading favorites from localStorage:', savedFavorites);
      setFavoriteGigs(savedFavorites);
    };
    
    loadFavorites();
    
    // Listen for storage changes to update favorites in real-time
    const handleStorageChange = () => {
      loadFavorites();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event listener for favorites updates
    window.addEventListener('favoritesUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesUpdated', handleStorageChange);
    };
  }, []);

  const removeFavorite = (gigId: number) => {
    const updatedFavorites = favoriteGigs.filter(gig => gig.id !== gigId);
    setFavoriteGigs(updatedFavorites);
    localStorage.setItem('favoriteGigsData', JSON.stringify(updatedFavorites));
    
    const currentFavoriteIds = JSON.parse(localStorage.getItem('favoriteGigs') || '[]');
    const updatedIds = currentFavoriteIds.filter((id: number) => id !== gigId);
    localStorage.setItem('favoriteGigs', JSON.stringify(updatedIds));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-full transition-all duration-200">
          <Heart className="h-5 w-5" />
          {favoriteGigs.length > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {favoriteGigs.length}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-lg">Favorite Gigs</h3>
          <p className="text-sm text-gray-600">{favoriteGigs.length} saved gigs</p>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {favoriteGigs.length > 0 ? (
            favoriteGigs.map((gig) => (
              <Link key={gig.id} to={`/gig/${gig.id}`} className="block">
                <div className="p-4 border-b hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {gig.images && gig.images[0] && (
                        <img 
                          src={gig.images[0]} 
                          alt={gig.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 hover:text-green-600 transition-colors line-clamp-2">
                          {gig.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          by {gig.seller?.name || gig.seller}
                        </p>
                        <p className="text-sm font-semibold text-green-600 mt-1">
                          Starting at ${gig.packages?.[0]?.price || gig.price}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeFavorite(gig.id);
                      }}
                      className="text-red-500 hover:text-red-700 ml-2 p-1"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h4 className="font-medium text-gray-900 mb-1">No favorites yet</h4>
              <p className="text-sm">Start browsing gigs and save your favorites here</p>
              <Link to="/all-services" className="inline-block mt-3">
                <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                  Browse Services
                </button>
              </Link>
            </div>
          )}
        </div>
        {favoriteGigs.length > 0 && (
          <div className="p-3 border-t">
            <Link to="/all-services" className="block">
              <button className="w-full text-center text-sm text-green-600 hover:text-green-700 font-medium py-2 hover:bg-green-50 rounded transition-colors">
                Browse More Services
              </button>
            </Link>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default FavoritesPopover;
