
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to continue</h2>
            <p className="text-gray-600">You need to be signed in to access this page.</p>
          </div>
        </div>
      </SignedOut>
    </>
  );
};

export default ProtectedRoute;
