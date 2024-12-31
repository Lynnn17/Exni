import React, { useState, useEffect } from "react";
import axios from "axios";
import CardNotif from "../reusable/card/CardNotif"; // Import CardNotif

const Dashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const fetchNotifications = async () => {
    try {
      setIsLoading(true); // Start loading
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}notifications/admin`, // Sesuaikan dengan URL API yang benar
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Notifications response:", response.data);
      setNotifications(response.data.data.notifications); // Set notifications
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchNotifications(); // Fetch notifications on component mount
  }, []);

  return (
    <main>
      <div className="w-full p-4 bg-white mt-4 h-full lg:h-screen rounded-lg">
        <p className="text-lg uppercase font-medium">Notifikasi</p>
        <div className="w-full h-[1px] bg-teks mt-2"></div>

        {/* Show loading spinner or notifications */}
        {isLoading ? (
          <div>Loading...</div> // You can replace this with a Loading component
        ) : (
          <CardNotif notifications={notifications} />
        )}
      </div>
    </main>
  );
};

export default Dashboard;
