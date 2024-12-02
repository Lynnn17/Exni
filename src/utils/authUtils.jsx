import axios from "axios";

// Function to get access token or refresh it if expired
const getAuthHeaders = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No access token found in localStorage");
    return {};
  }

  // Optionally, check if the token is expired before attempting to use it
  if (isTokenExpired(token)) {
    try {
      const refreshedData = await refreshAccessToken();
      console.log("Refreshed token:", refreshedData.token);
      const newToken = refreshedData.token;

      // Save the new token in localStorage
      localStorage.setItem("token", newToken);

      return {
        Authorization: `Bearer ${newToken}`,
      };
    } catch (error) {
      console.error("Failed to refresh token:", error);
      return {};
    }
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

// Function to check if a token is expired
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime; // Check if the token is expired
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true; // Assume expired if decoding fails
  }
};

// Function to refresh the access token using the refresh token from cookie
const refreshAccessToken = async () => {
  const endpoint = `${import.meta.env.VITE_API_URL}auth/login`; // Adjust endpoint as needed

  const response = await axios.put(
    endpoint,
    {},
    {
      withCredentials: true, // Include cookies in the request
    }
  );

  return response.data; // Assuming the new token is in response.data.token
};

export default getAuthHeaders;
