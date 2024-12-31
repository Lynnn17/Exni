import React, { useState, useEffect } from "react";
import axios from "axios";
import CardNotif from "../reusable/card/CardNotif";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Mengambil userId dari token JWT
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id); // Mengambil id user dari token
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };

  // Fungsi untuk mengambil notifikasi berdasarkan userId
  const fetchNotifications = async () => {
    if (!userId) return; // Pastikan userId sudah ada sebelum melakukan request

    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}notifications/users/${userId}`, // Menggunakan API endpoint untuk user
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Menggunakan token JWT untuk autentikasi
          },
        }
      );
      // Mengurutkan notifikasi berdasarkan waktu terbaru di atas
      const sortedNotifications = response.data.data.notifications.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setNotifications(sortedNotifications); // Menyimpan notifikasi yang sudah diurutkan
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserIdFromToken(); // Mendapatkan userId saat komponen pertama kali dimuat
  }, []);

  useEffect(() => {
    if (userId) {
      fetchNotifications(); // Mengambil notifikasi setelah userId didapat
    }
  }, [userId]); // Akan dijalankan ulang jika userId berubah

  return (
    <main>
      <div className="w-full p-4 bg-white mt-4 h-full lg:h-screen rounded-lg">
        <p className="text-lg uppercase font-medium">Notifikasi</p>
        <div className="w-full h-[1px] bg-teks mt-2"></div>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <CardNotif notifications={notifications} userType="user" />
        )}
      </div>
    </main>
  );
};

export default Dashboard;
