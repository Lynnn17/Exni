import React, { useState } from "react";
import HeaderForm from "../../../reusable/HeaderForm";
import SectionDivider from "../../../reusable/SectionDivider";
import TenantInfo from "../../../reusable/TenantInfo";
import Foto1 from "../../../../assets/gedung.png";
import Foto2 from "../../../../assets/kapal.png";
import Foto3 from "../../../../assets/kapal2.png";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Detail = () => {
  return (
    <main>
      <div className="px-3 py-5 bg-white mt-4 rounded-lg">
        {/* Header */}
        <HeaderForm title="Detail Properti" link="/user/asset/tenant" />

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
          <div className="w-full md:col-span-2 mt-5 ">
            <Swiper
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="w-full h-full rounded-lg"
            >
              <SwiperSlide>
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={Foto1}
                  alt="Foto Properti 1"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={Foto2}
                  alt="Foto Properti 2"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={Foto3}
                  alt="Foto Properti 3"
                />
              </SwiperSlide>
              <div className="w-full">
                <button
                  className="absolute top-1/2 left-1 transform -translate-y-1/2 bg-purple-500 text-white p-3 rounded-full shadow-lg hover:bg-purple-600 z-10"
                  onClick={() =>
                    document.querySelector(".swiper-button-prev").click()
                  }
                >
                  <FaChevronLeft size={20} />{" "}
                  {/* Menggunakan React Icon FaChevronLeft */}
                </button>
                <button
                  className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-purple-500 text-white p-3 rounded-full shadow-lg hover:bg-purple-600 z-10"
                  onClick={() =>
                    document.querySelector(".swiper-button-next").click()
                  }
                >
                  <FaChevronRight size={20} />{" "}
                  {/* Menggunakan React Icon FaChevronRight */}
                </button>
              </div>
            </Swiper>
          </div>

          {/* Informasi Properti */}
          <div className="w-full  bg-white border border-gray-200 mt-5 p-4">
            <div className="md:flex md:gap-3">
              <div className="w-full">
                <SectionDivider title="Properti" />
                <div className="pt-2 flex flex-col gap-2">
                  <TenantInfo label="Tenant" value="Cv. Gracia Blue Logistic" />
                  <TenantInfo label="Alokasi" value="Kantor Penjualan Tiket" />
                  <TenantInfo label="Luas Tanah" value="34432m" />
                  <TenantInfo label="Luas Gedung" value="44343m" />
                  <TenantInfo
                    label="Alamat"
                    value="Graha Pelni, Jl Pahlawan No.18, wrwe 43 Surabaya"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Deskripsi Properti */}
          <div className="bg-white border border-gray-200 p-4 w-full  md:col-span-3">
            <div className="w-full h-full">
              <SectionDivider title="Deskripsi" />
              <div className="pt-2">
                <p className="p-2 text-sm text-justify font-light">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Neque sed velit ut provident? Nam atque voluptatem eligendi
                  officiis sit, quasi laboriosam, ipsam ipsum veniam dicta
                  recusandae! Optio, dolorum iure! Ea, suscipit debitis.
                  Reiciendis est ullam harum vel tempore, perferendis recusandae
                  iusto, dignissimos deserunt quaerat quo tempora. Veritatis
                  ipsa sapiente debitis placeat, distinctio at impedit cumque
                  perferendis libero est mollitia molestias quos rerum,
                  voluptatem corporis itaque! Illo rerum veniam laboriosam vel
                  sed hic eos ex amet laborum placeat explicabo animi fuga,
                  repudiandae nostrum delectus adipisci deleniti. Repudiandae
                  libero nisi, at unde consequatur obcaecati quod cum neque
                  atque, quo sed dolore accusamus.
                </p>
                <div className="flex gap-2">
                  <button className="bg-red-500 py-2 px-4 text-white rounded-2xl">
                    <Link to={"/user/asset/tenant"}>Keluar</Link>
                  </button>
                  <button className="bg-[#404C58] py-2 px-4 text-white rounded-2xl">
                    <Link>PESAN SEKARANG</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Detail;
