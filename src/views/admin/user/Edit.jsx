import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Content from "../../../components/admin/user/Edit";
import NavMobile from "../../../components/NavMobile";

const Edit = () => {
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

export default Edit;
