import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // if user not authenticated, let user log in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // if logged in, render the child routes
  return <Outlet />; // a placeholder component to plug child route in
};
