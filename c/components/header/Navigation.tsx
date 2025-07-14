import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Plus } from "lucide-react";
import NotificationPopover from "./NotificationPopover";
import MessagingPopover from "./MessagingPopover";
import FavoritesPopover from "./FavoritesPopover";
import CreateGig from "../CreateGig";

const Navigation = () => {
  const [showCreateGig, setShowCreateGig] = useState(false);

  const handleGigCreated = (newGig: any) => {
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("gigCreated", { detail: newGig }));
    setShowCreateGig(false);
  };

  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link
        to="/business"
        className="text-gray-700 hover:text-green-600 font-medium transition-colors"
      >
        GigFly Business
      </Link>
      <a
        href="#"
        className="text-gray-700 hover:text-green-600 font-medium transition-colors"
      >
        Explore
      </a>

      <SignedIn>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="border-green-600 text-green-600 hover:bg-green-50 transition-colors"
            onClick={() => setShowCreateGig(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Create Gig
          </Button>

          <NotificationPopover />
          <MessagingPopover />
          <FavoritesPopover />

          <Link to="/dashboard">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 hover:border-green-600 hover:text-green-600 transition-colors"
            >
              Dashboard
            </Button>
          </Link>

          <div className="ml-2">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard: "shadow-lg",
                },
              }}
            />
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex items-center space-x-3">
          <SignInButton mode="modal">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 hover:border-green-600 hover:text-green-600 transition-colors"
            >
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white shadow-sm transition-colors"
              size="sm"
            >
              Join
            </Button>
          </SignUpButton>
        </div>
      </SignedOut>

      {showCreateGig && (
        <CreateGig
          onGigCreated={handleGigCreated}
          onClose={() => setShowCreateGig(false)}
        />
      )}
    </nav>
  );
};

export default Navigation;
