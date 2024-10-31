import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Content from "../../../components/admin/vehicle/Dashboard";
import NavMobile from "../../../components/NavMobile";

const Dashboard = () => {
  return (
    <>
      <NavMobile />
      <div className="flex w-full  bg-mainBg gap-4">
        <div className="hidden lg:flex">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full">
          <Header />
          <Content />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
