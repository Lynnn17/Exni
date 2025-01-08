import { jwtDecode } from "jwt-decode";
import { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
// Fungsi untuk memeriksa apakah token valid dan tidak kedaluwarsa
export const isTokenValid = (token, requiredRole) => {
  if (!token) {
    console.error("No token found");
    return false; // Token doesn't exist, user is not logged in
  }

  const tokenParts = token.split(".");
  if (tokenParts.length !== 3) {
    console.error("Invalid token format");
    return false; // Invalid token format
  }

  try {
    // Decode JWT to get the payload
    const decodedToken = jwtDecode(token);

    // Check if the token is expired (exp is in seconds)
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      StatusAlertService.showError("Session expired. Please log in again.");

      return false; // Token has expired
    }

    // Ensure there is a 'role' field in the token and it matches the requiredRole
    if (decodedToken && decodedToken.role === requiredRole) {
      return true; // Role matches and token is not expired
    } else {
      return false; // Role doesn't match
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return false; // Error occurred while decoding the token
  }
};
