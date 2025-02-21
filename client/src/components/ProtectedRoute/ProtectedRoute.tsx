import React from "react";
import { useAuth } from "../../providers/AuthProvider";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const authContext = useAuth();

  if (!authContext) {
    return <Navigate to="/login" replace />;
  }

  const { isAuthenticated } = authContext;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
