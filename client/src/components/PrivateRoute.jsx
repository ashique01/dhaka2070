import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  // While auth status is loading, show nothing or a loader
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to login if no user
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Optional: check user role (if you have roles)
  // if (user.role !== 'admin') {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  // Otherwise, render protected component
  return children;
}
