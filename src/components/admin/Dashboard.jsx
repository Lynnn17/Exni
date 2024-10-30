import { FaUsers } from "react-icons/fa6";
import { TbBuildingWarehouse } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
const Dashboard = () => {
  return (
    <>
      <main>
        <div className="w-full p-4 bg-white mt-4 h-full">
          <p className="text-lg uppercase font-medium">Dashboard</p>
          <div className="w-full h-[1px] bg-teks mt-2"> </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <p className="text-2xl uppercase font-bold">169</p>
              <p className="text-md uppercase font-medium">User</p>
              <div className="flex items-center justify-end">
                <FaUsers className="text-4xl " />
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <p className="text-2xl uppercase font-bold">169</p>
              <p className="text-md uppercase font-medium">Assets</p>
              <div className="flex items-center justify-end">
                <TbBuildingWarehouse className="text-4xl " />
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <p className="text-2xl uppercase font-bold">169</p>
              <p className="text-md uppercase font-medium">User</p>
              <div className="flex items-center justify-end">
                <GiReceiveMoney className="text-4xl " />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
