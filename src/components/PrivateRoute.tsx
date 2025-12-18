import React from "react";
import { Navigate } from "react-router-dom";

// Simple auth check (replace with real logic as needed)
const isAuthenticated = () => {
  // Example: check for a token in localStorage
  return Boolean(localStorage.getItem("auth_token"));
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
