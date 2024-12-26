import React from "react";
import { Navigate } from "react-router-dom"; // Use Navigate for redirection
import { jwtDecode } from "jwt-decode"; // Make sure jwt-decode is imported correctly

const ProtectedRoute = ({ element: Element, requiredRole }) => {
  // Get the token from sessionStorage or localStorage
  const token =
    sessionStorage.getItem("token") || localStorage.getItem("token");

  // Function to check if the token is valid and role matches
  const checkUserRole = () => {
    if (!token) {
      console.error("No token found");
      return false; // Token doesn't exist, user is not logged in
    }

    // Check if the token is properly formatted (must have 3 parts)
    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
      console.error("Invalid token format");
      return false; // Invalid token format
    }

    try {
      // Decode JWT to get the payload
      const decodedToken = jwtDecode(token);

      // Ensure there is a 'role' field in the token and it matches the requiredRole
      if (decodedToken && decodedToken.role === requiredRole) {
        return true; // Role matches
      } else {
        return false; // Role doesn't match
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      return false; // Error occurred while decoding the token
    }
  };

  if (checkUserRole()) {
    // If role matches, render the requested element
    return <Element />;
  } else {
    // If role doesn't match, redirect to the appropriate login page
    return requiredRole === "ADMIN" ? (
      <Navigate to="/admin/login" /> // Redirect to /admin/login if role is admin
    ) : (
      <Navigate to="/login" /> // Redirect to /login for other roles
    );
  }
};

export default ProtectedRoute;
