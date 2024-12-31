import React, { useState, useEffect } from "react";
import axios from "axios";
import CardNotif from "../reusable/card/CardNotif"; // Import CardNotif
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [userId, setUserId] = useState(null); // State untuk menyimpan userId

  // Fungsi untuk mengambil userId dari token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken); // Log token yang didekode
        setUserId(decodedToken.id); // Ambil userId dari token
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };

  // Fungsi untuk mengambil notifikasi berdasarkan userId
  const fetchNotifications = async () => {
    if (!userId) {
      console.log("No userId found, skipping fetch.");
      return;
    }

    try {
      setIsLoading(true);
      console.log(`Fetching notifications for userId: ${userId}`);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}notifications/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Notifications response:", response.data); // Log respons data dari API

      if (
        response.data.status === "success" &&
        response.data.data.notifications.length > 0
      ) {
        setNotifications(response.data.data.notifications); // Set notifications jika ada data
      } else {
        console.log("No notifications found.");
        setNotifications([]); // Set empty jika tidak ada notifikasi
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Ambil userId dari token ketika komponen pertama kali dimuat
  useEffect(() => {
    getUserIdFromToken();
  }, []);

  // Ambil notifikasi setelah userId ditemukan
  useEffect(() => {
    if (userId) {
      fetchNotifications(); // Fetch notifications saat userId tersedia
    }
  }, [userId]);

  return (
    <main>
      <div className="w-full p-4 bg-white mt-4 h-full lg:h-screen rounded-lg">
        <p className="text-lg uppercase font-medium">Notifikasi</p>
        <div className="w-full h-[1px] bg-teks mt-2"></div>

        {isLoading ? (
          <div>Loading...</div> // Menampilkan loading ketika isLoading true
        ) : notifications.length > 0 ? (
          <CardNotif notifications={notifications} /> // Menampilkan CardNotif jika ada notifikasi
        ) : (
          <div>No notifications available</div> // Pesan jika tidak ada notifikasi
        )}
      </div>
    </main>
  );
};

export default Dashboard;
