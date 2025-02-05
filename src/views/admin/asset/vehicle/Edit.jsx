import Sidebar from "../../../../components/admin/Sidebar";
import Header from "../../../../components/admin/Header";
import Content from "../../../../components/admin/asset/vehicle/Edit";
import NavMobile from "../../../../components/admin/NavMobile";

const Add = () => {
  return (
    <>
      <NavMobile />
      <div className="flex w-full  bg-gray-50 gap-4">
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

export default Add;
