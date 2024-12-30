import Sidebar from "../../../../../components/user/Sidebar";
import Header from "../../../../../components/user/Header";
import Content from "../../../../../components/user/asset/sewa/building/Detail";
import NavMobile from "../../../../../components/user/NavMobile";

const Dashboard = () => {
  return (
    <>
      <NavMobile />
      <div className="flex w-full  bg-gray-50 gap-4">
        <div className="hidden lg:flex">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full">
          <Header />
          <div className="overflow-y-scroll h-[calc(100vh-64px)]">
            <Content />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
