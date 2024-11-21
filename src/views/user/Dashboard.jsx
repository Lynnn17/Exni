import Sidebar from "../../components/user/Sidebar";
import Header from "../../components/user/Header";
import Content from "../../components/user/Dashboard";
import NavMobile from "../../components/user/NavMobile";

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
