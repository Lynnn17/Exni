import { FaUsers } from "react-icons/fa6";
import { TbBuildingWarehouse } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { FaHandshakeSimple } from "react-icons/fa6";
import Card from "../reusable/card/CardDashboard";
import React from "react";
const Dashboard = () => {
  return (
    <>
      <main>
        <div className="w-full p-4 bg-white mt-4 h-full lg:h-screen rounded-lg">
          <p className="text-lg uppercase font-medium">Dashboard</p>
          <div className="w-full h-[1px] bg-teks mt-2"> </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <Card count="169" label="Akun" icon={FaUsers} />
            <Card count="169" label="Aset Sewa" icon={TbBuildingWarehouse} />
            <Card count="169" label="Pengajuan" icon={FaHandshakeSimple} />
            <Card count="169" label="Transaaksi" icon={GiReceiveMoney} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
