import React, { useState } from "react";
import bgKapal from "../assets/kapal.png";
import FotoKapal2 from "../assets/kapal4.png";
import FotoKapal3 from "../assets/kapal3.png";
import StatusSelect from "./reusable/StatusSelect";
import CardHome from "./reusable/card/CardHome";
import FotoKapal4 from "../assets/kapal4.png";
import Pagination from "./admin/Pagination";
import { Formik, Form } from "formik";

// Komponen untuk menampilkan bagian Tentang Kami
const AboutSection = ({ onPesanSekarangClick, className }) => (
  <div
    className={`bg-[#404C58] md:w-[60%] lg:h-[310px] lg:w-[55%] text-white p-12 ${className}`}
  >
    <h1 className="text-2xl font-bold md:text-3xl uppercase ">Tentang Kami</h1>
    <p className="text-sm w-[90%] text-justify">
      Kami adalah perusahaan penyedia layanan PENYEWAAN ASET. Website ini dapat
      diakses oleh siapa saja dengan koneksi internet dan berisi beragam
      informasi yang berguna bagi pelanggan maupun calon pelanggan PELNI.
    </p>
    <div className="pt-2 lg:pt-4">
      <button
        onClick={onPesanSekarangClick}
        className="bg-white text-black px-3 rounded-l-xl rounded-br-[25px] py-2 font-semibold"
      >
        PESAN SEKARANG
      </button>
    </div>
  </div>
);

// Komponen untuk menampilkan tombol login dan hide
const LoginPrompt = ({ onHideClick }) => (
  <div className="px-2 pb-10 text-center pt-10 md:w-[60%] md:mx-auto">
    <p>
      Nikmati layanan PELNI tanpa perlu download Aplikasi cukup dengan Sign in
      atau Sign up di bawah ini!
    </p>
    <button className="bg-[#5641BA] text-white w-[7rem] p-2 rounded-xl mt-4">
      Login
    </button>
    {/* <button
      onClick={onHideClick}
      className="bg-red-500 text-white w-[7rem] p-2 rounded-xl mt-4 ml-4"
    >
      Hide
    </button> */}
  </div>
);

const Home = () => {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [status, setStatus] = useState("active");

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const options = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ];

  const customStyles = {
    textColor: "text-black",
    selectBg: "bg-white", // Custom background color
    iconColor: "text-black", // Custom icon color
    select: { borderColor: "black" }, // Optional additional styling
  };

  const handlePesanSekarangClick = () => {
    setShowLoginPrompt(true);
  };

  const handleHideClick = () => {
    setShowLoginPrompt(false);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="pt-4 px-4 md:px-6 lg:px-10">
        <div
          className="relative bg-cover bg-no-repeat bg-center rounded-[20px] md:rounded-[50px]  z-[-10]"
          style={{ backgroundImage: `url(${bgKapal})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50 rounded-[20px] md:rounded-[50px] z-20"></div>
          <div className="relative z-30 text-white p-8 md:py-20 ">
            <h1 className="text-2xl font-bold md:w-[20rem]">
              SELAMAT DATANG DI PELNI SURABAYA
            </h1>
            <p className="text-sm md:w-[30rem]">
              Kami adalah perusahaan penyedia layanan PENYEWAAN ASET. Website
              ini dapat diakses oleh siapa saja dengan koneksi internet dan
              berisi beragam informasi yang berguna bagi pelanggan maupun calon
              pelanggan PELNI.
            </p>
          </div>
        </div>
      </div>

      <div>
        {/* Show Login Prompt */}
        {showLoginPrompt && <LoginPrompt onHideClick={handleHideClick} />}
      </div>

      {/* Tentang Kami Section */}
      <div className="pt-3 px-4 md:px-6 lg:px-10 h-50 md:pt-5 md:flex md:flex-wrap shadow-[0px_100px_100px_-100px_rgba(0,0,0,1)] relative z-[-100]">
        {/* First About Section with top rounded corners */}
        <AboutSection
          onPesanSekarangClick={handlePesanSekarangClick}
          className="rounded-t-[20px] md:rounded-t-none md:rounded-tl-[50px] "
        />

        <div className="md:w-[40%] lg:h-76 lg:w-[45%] 2xl:h-[19.4rem] ">
          <img
            className="w-full h-full object-cover"
            src={FotoKapal2}
            alt="Kapal"
          />
        </div>
      </div>

      {/* Bottom image Section */}
      <div className="px-4 md:px-6 lg:px-10  md:flex md:flex-wrap">
        <div className="md:w-[40%] lg:h-[19.4rem] lg:w-[45%] ">
          <img
            className="w-full h-full object-cover"
            src={FotoKapal3}
            alt="Kapal"
          />
        </div>

        {/* Second About Section with bottom rounded corners */}
        <AboutSection
          onPesanSekarangClick={handlePesanSekarangClick}
          className="rounded-b-[20px] md:rounded-b-none md:rounded-br-[50px]"
        />

        <LoginPrompt onHideClick={handleHideClick} />
      </div>

      {/* list penyewaan */}
      <div className="flex gap-2 justify-center items-center">
        <p className="uppercase font-semibold">List Penyewaan Aset</p>
        <StatusSelect
          value={status}
          onChange={handleStatusChange}
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "pending", label: "Pending" },
          ]}
          customStyles={customStyles}
        />
      </div>
      <div className="px-4 md:px-6 lg:px-10 pt-5 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <CardHome
            key={i}
            foto={FotoKapal4}
            title={`Galangan Kapal ${i + 1}`}
            deskripsi={
              "GalLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam sed do eiusmod tempor incididunt ut labore et dolore."
            }
          />
        ))}
      </div>
      <div className="py-2">
        <Pagination />
      </div>
    </>
  );
};

export default Home;
