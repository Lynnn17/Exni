import { FaUsers } from "react-icons/fa6";
import { TbBuildingWarehouse } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import Card from "../reusable/card/CardDashboard";
import React from "react";
const Dashboard = () => {
  return (
    <>
      <main>
        <div className="w-full p-4 bg-white mt-4 h-full">
          <p className="text-lg uppercase font-medium">Dashboard</p>
          <div className="w-full h-[1px] bg-teks mt-2"> </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            <Card count="169" label="User" icon={FaUsers} />
            <Card count="169" label="Assets" icon={TbBuildingWarehouse} />
            <Card count="169" label="Transactions" icon={GiReceiveMoney} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
