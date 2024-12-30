import React from "react";
import CardNotif from "../reusable/card/CardNotif";

const notifications = [
  {
    icon: "https://via.placeholder.com/32", // Ganti dengan URL ikon sebenarnya
    message: "Transaksi gedung pelni berhasil dilakukan!",
    date: "23 Des",
    time: "11:12",
    isRead: false,
  },
  {
    icon: "https://via.placeholder.com/32",
    message: "Notifikasi dari dia",
    date: "23 Agu",
    time: "7:08",
    isRead: true,
  },
  {
    icon: "https://via.placeholder.com/32",
    message: "Notifikasi lainnya",
    date: "23 Agu",
    time: "7:08",
    isRead: true,
  },
];

const Dashboard = () => {
  return (
    <main>
      <div className="w-full p-4 bg-white mt-4 h-full lg:h-screen rounded-lg">
        <p className="text-lg uppercase font-medium">Notifikasi</p>
        <div className="w-full h-[1px] bg-teks mt-2"></div>
        <CardNotif notifications={notifications} />
      </div>
    </main>
  );
};

export default Dashboard;
