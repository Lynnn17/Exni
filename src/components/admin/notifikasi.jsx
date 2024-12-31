import React, { useState, useEffect } from "react";
import axios from "axios";
import CardNotif from "../reusable/card/CardNotif";

const Dashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi untuk mengambil notifikasi
  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}notifications/admin`, // Pastikan URL ini benar
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Pastikan token valid
          },
        }
      );
      const sortedNotifications = response.data.data.notifications.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // Mengurutkan berdasarkan waktu terbaru
      );
      setNotifications(sortedNotifications); // Set notifikasi yang sudah diurutkan
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mengambil data notifikasi setelah component mounted
  useEffect(() => {
    fetchNotifications();
  }, []); // Hanya dijalankan sekali saat komponen pertama kali dimuat

  return (
    <main>
      <div className="w-full p-4 bg-white mt-4 h-full lg:h-screen rounded-lg">
        <p className="text-lg uppercase font-medium">Notifikasi</p>
        <div className="w-full h-[1px] bg-teks mt-2"></div>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <CardNotif notifications={notifications} userType="admin" />
        )}
      </div>
    </main>
  );
};

export default Dashboard;
