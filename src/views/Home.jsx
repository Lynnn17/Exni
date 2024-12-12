import Navbar from "../components/Navbar";
import Content from "../components/Home";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="">
        <Content />
      </div>
      <Footer />
    </>
  );
};

export default Home;
