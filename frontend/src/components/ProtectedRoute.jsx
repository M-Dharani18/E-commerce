// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  // Not logged in → redirect to login
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }

  // Admin only route but user is not admin
  if (adminOnly && user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}