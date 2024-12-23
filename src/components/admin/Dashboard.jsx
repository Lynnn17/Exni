import { FaUsers } from "react-icons/fa6";
import { TbBuildingWarehouse } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { FaHandshakeSimple } from "react-icons/fa6";
import Card from "../reusable/card/CardDashboard";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    user_count: 0,
    asset_count: 0,
    application_count: 0,
    transaction_count: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token"); // Ambil token jika diperlukan
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}dashboard/admin`,
          { headers }
        );
        console.log("API Response:", response.data); // Log respons untuk debugging
        if (response.data.status === "success") {
          setDashboardData(response.data.data); // Akses properti "data"
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <main>
        <div className="w-full p-4 bg-white mt-4 h-full lg:h-screen rounded-lg">
          <p className="text-lg uppercase font-medium">Dashboard</p>
          <div className="w-full h-[1px] bg-teks mt-2"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <Card
              count={dashboardData.user_count}
              label="Akun"
              icon={FaUsers}
            />
            <Card
              count={dashboardData.asset_count}
              label="Aset Sewa"
              icon={TbBuildingWarehouse}
            />
            <Card
              count={dashboardData.application_count}
              label="Pengajuan"
              icon={FaHandshakeSimple}
            />
            <Card
              count={dashboardData.transaction_count}
              label="Transaksi"
              icon={GiReceiveMoney}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
