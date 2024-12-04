import axios from "axios";

export const handleTokenRefresh = async (navigate) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}auth/login`,
      {},
      { withCredentials: true }
    );
    const newToken = response.data.data.access_token;
    localStorage.setItem("token", newToken);
    return newToken;
  } catch (err) {
    console.error("Error refreshing token:", err);
    navigate("/admin/login");
    throw new Error("Token refresh failed");
  }
};
