import Sidebar from "../../../components/admin/Sidebar";
import Header from "../../../components/admin/Header";
import Content from "../../../components/admin/pengajuan/Detail";
import NavMobile from "../../../components/admin/NavMobile";

const Detail = () => {
  return (
    <>
      <NavMobile />
      <div className="flex w-full  bg-gray-50 gap-4">
        <div className="hidden lg:flex">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full">
          <Header />
          <div className="overflow-y-scroll h-[calc(100vh-64px)] ">
            <Content />
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
