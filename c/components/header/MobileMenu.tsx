
import { User } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import NotificationPopover from "./NotificationPopover";

const MobileMenu = () => {
  return (
    <div className="md:hidden flex items-center space-x-2">
      <SignedIn>
        <NotificationPopover />
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="outline" size="sm">
            <User className="h-4 w-4" />
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default MobileMenu;
