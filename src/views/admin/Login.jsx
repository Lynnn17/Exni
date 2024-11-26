import Navbar from "../../components/Navbar";
import Content from "../../components/admin/Login";

const Home = () => {
  return (
    <>
      <div className="z-50 absolute w-full">
        <Navbar />
      </div>
      <div className="h-full w-full fixed pt-10">
        <Content />
      </div>
    </>
  );
};

export default Home;
