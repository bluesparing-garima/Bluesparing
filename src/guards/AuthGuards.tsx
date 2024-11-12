import * as React from "react";
import { Navigate } from "react-router-dom";
import useSafekaroContextAuth from "../context/useSafekaroContextAuth";

interface AuthGuardType {
  children: React.ReactNode;
}

// For routes that can only be accessed by users with the AUTH custom:role of "admin"
function AuthGuards({ children }: AuthGuardType) {
  const { user } = useSafekaroContextAuth();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(!user?.role); // If user is not available, keep loading
  }, [user]);

  // Wait for user and role to load
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if the user is logged in and if the role is "admin"
  if (user && user.role === "admin") {
   
    return <React.Fragment>{children}</React.Fragment>;
  }

  // Redirect if the user is not logged in or if the role is blank or not "admin"
  return <Navigate to="/403" />;
}

export default AuthGuards;
