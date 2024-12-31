import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Pastikan axios diimpor

const CardNotif = ({ notifications, userType }) => {
  const [localNotifications, setLocalNotifications] = useState(notifications); // State lokal untuk notifikasi
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL; // Mengambil API URL dari variabel lingkungan

  const handleClick = async (applicationId, notifId) => {
    const token = localStorage.getItem("token");

    // Perbarui status isReadByAdmin/isReadByUser di state lokal
    setLocalNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === notifId
          ? userType === "admin"
            ? { ...notif, isReadByAdmin: true }
            : { ...notif, isReadByUser: true }
          : notif
      )
    );

    // Ambil detail notifikasi berdasarkan ID menggunakan axios
    try {
      const response = await axios.get(`${apiUrl}notifications/${notifId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;

      if (response.status === 200) {
        console.log(data); // Gunakan data yang diterima
        const redirectUrl =
          userType === "admin"
            ? `/admin/submission/detail/${applicationId}`
            : `/user/submission/detail/${applicationId}`;
        navigate(redirectUrl); // Pastikan URL ini sudah benar
      } else {
        console.error("Gagal mengambil notifikasi", data);
      }
    } catch (error) {
      console.error("Terjadi kesalahan", error);
    }
  };

  return (
    <div className="mt-4">
      {localNotifications.map((notif) => (
        <div
          key={notif.id} // Gunakan id unik dari setiap notifikasi
          onClick={() => handleClick(notif.applicationId, notif.id)}
          className={`p-4 rounded-md cursor-pointer ${
            (userType === "admin" && notif.isReadByAdmin) ||
            (userType === "user" && notif.isReadByUser)
              ? "bg-gray-100"
              : "bg-blue-50"
          } shadow-sm mb-2 flex flex-row items-start`}
        >
          <div>
            <p className="text-sm font-bold">{notif.title}</p>
            <p className="text-sm font-normal">{notif.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(notif.createdAt).toLocaleDateString()},{" "}
              {new Date(notif.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardNotif;
