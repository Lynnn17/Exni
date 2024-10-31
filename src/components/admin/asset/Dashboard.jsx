import { FaBuilding } from "react-icons/fa";
import { IoIosCube } from "react-icons/io";
import { FaCarSide } from "react-icons/fa";
import StatCard from "../../reusable/CardDashboard";
const Dashboard = () => {
  return (
    <>
      <main>
        <div className="w-full p-4 bg-white mt-4 h-full">
          <p className="text-lg uppercase font-medium">Assets</p>
          <div className="w-full h-[1px] bg-teks mt-2"> </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            <StatCard count="169" label="Unit Bangunan" icon={FaBuilding} />
            <StatCard count="169" label="Unit Tenant" icon={IoIosCube} />
            <StatCard count="169" label="Unit Kendaraan" icon={FaCarSide} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
