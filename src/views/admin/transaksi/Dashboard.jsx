import Sidebar from "../../../components/admin/Sidebar";
import Header from "../../../components/admin/Header";
import Content from "../../../components/admin/transaksi/Dashboard";
import NavMobile from "../../../components/admin/NavMobile";

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
