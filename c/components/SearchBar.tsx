
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  size?: "sm" | "lg";
}

const SearchBar = ({ placeholder = "What service are you looking for today?", className = "", size = "sm" }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`${
            size === "lg" 
              ? "pl-12 pr-4 py-4 text-lg border-0 focus:ring-0 text-gray-900 placeholder-gray-500 bg-transparent" 
              : "pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          }`}
        />
      </div>
      <Button 
        type="submit"
        size={size === "lg" ? "lg" : "default"}
        className="bg-green-600 hover:bg-green-700 px-8 py-3 text-white font-medium rounded-lg transition-colors"
      >
        <Search className="h-5 w-5 mr-2" />
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
