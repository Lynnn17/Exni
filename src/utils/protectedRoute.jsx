import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "./authHelper";

const ProtectedRoute = ({ element: Element, requiredRole }) => {
  // Get the token from sessionStorage or localStorage
  const token =
    sessionStorage.getItem("token") || localStorage.getItem("token");

  // Check if the token is valid and role matches
  if (isTokenValid(token, requiredRole)) {
    // If role matches and token is not expired, render the requested element
    return <Element />;
  } else {
    // If role doesn't match or token is expired, redirect to the appropriate login page
    return requiredRole === "ADMIN" ? (
      <Navigate to="/admin/login" /> // Redirect to /admin/login if role is admin
    ) : (
      <Navigate to="/login" /> // Redirect to /login for other roles
    );
  }
};

export default ProtectedRoute;
