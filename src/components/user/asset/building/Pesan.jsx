import React, { useState } from "react";
import HeaderForm from "../../../reusable/HeaderForm";
import SectionDivider from "../../../reusable/SectionDivider";
import TenantInfo from "../../../reusable/TenantInfo";
import Foto from "../../../../assets/gedung.png";
import FormPesan from "../../../reusable/FormPesan";

const Pesan = () => {
  const data = [
    {
      id: "1223354",
      date: "01 Oktober 2024",
      type: "Cicilan",
      progress: "Pembayaran ke-1",
      status: "Bayar",
      isPaid: false,
    },
    {
      id: "1223355",
      date: "01 Oktober 2024",
      type: "Cicilan",
      progress: "Pembayaran ke-1",
      status: "Bayar",
      isPaid: false,
    },
    {
      id: "1223356",
      date: "01 Oktober 2024",
      type: "Non-Cicilan",
      progress: "-",
      status: "Lunas",
      isPaid: true,
    },
  ];
  return (
    <main>
      <div className="w-full px-3 py-5 bg-white mt-4 h-full">
        <HeaderForm title="Pengajuan" link="/user/asset/building" />
        <div className="flex flex-wrap gap-2">
          <div className="w-full md:w-[65%] bg-white border border-gray-200 mt-5 p-4">
            <div className="md:flex md:gap-3">
              <div className="w-full">
                <SectionDivider title="Properti" />
                <div className="pt-2 flex flex-col gap-2">
                  <TenantInfo label="Tenant" value="Cv. Gracia Blue Logistic" />
                  <TenantInfo label="Alokasi" value="Kantor Penjualan Tiket" />
                  <TenantInfo label="Harga" value="Rp. 144.000.000,-" />
                </div>
              </div>
              <div className="pt-4 md:pt-6 w-full">
                <TenantInfo
                  label="Alamat"
                  value="Graha Pelni, Jl Pahlawan No.18, wrwe 43 Surabaya"
                />
                <div className="flex gap-8 pt-2">
                  <TenantInfo label="Luas Tanah" value="34432m" />
                  <TenantInfo label="Luas Gedung" value="44343m" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[33.8%]  mt-5 ">
            <img
              className="w-full h-full object-cover"
              src={Foto}
              alt=""
              srcset=""
            />
          </div>
          <div className="bg-white border border-gray-200 mt-5 p-4 w-full">
            <div className="w-full h-full">
              <FormPesan />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Pesan;
