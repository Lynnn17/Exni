import Navbar from "../../components/Navbar";
import Content from "../../components/admin/Login";

const Home = () => {
  return (
    <>
      <div className=" w-full">
        <Navbar />
      </div>
      <div className="h-full w-full ">
        <Content />
      </div>
    </>
  );
};

export default Home;
