import React from "react";
import { useAuth } from "../../providers/AuthProvider";
import { Navigate } from "react-router-dom";
import api from "../../axiosConfig";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const authContext = useAuth();

  if (!authContext) {
    return <Navigate to="/login" replace />;
  }

  const { isAuthenticated } = authContext;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  } else {
    (async () => {
      try {
        await api.get("/home", {
          headers: {
            "Content-Type": "application/json"
          }
        })
      } catch (err) {
        console.error("Not auth:", err);
      }
    });
  }

  return <>{children}</>;
};
