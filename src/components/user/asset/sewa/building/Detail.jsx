import React, { useState } from "react";
import HeaderForm from "../../../../reusable/HeaderForm";
import SectionDivider from "../../../../reusable/SectionDivider";
import TenantInfo from "../../../../reusable/TenantInfo";
import Foto from "../../../../assets/gedung.png";
import PaymentTable from "../../../../reusable/PaymentTable";

const Detail = () => {
  const data = [
    {
      id: "TRX1223354",
      date: "01 Oktober 2024",
      type: "Cicilan",
      progress: "Pembayaran ke-1",
      status: "Bayar",
      isPaid: false,
    },
    {
      id: "TRX1223355",
      date: "01 Oktober 2024",
      type: "Cicilan",
      progress: "Pembayaran ke-1",
      status: "Bayar",
      isPaid: false,
    },
    {
      id: "TRX1223356",
      date: "01 Oktober 2024",
      type: "Non-Cicilan",
      progress: "-",
      status: "Lunas",
      isPaid: true,
    },
  ];

  return (
    <main>
      <div className="w-full px-3 py-5 bg-white mt-4 h-full rounded-lg">
        <HeaderForm title="Detail Aset Sewa" link="/user/asset/sewa-aset" />
        <div className="flex flex-wrap gap-2">
          <div className="w-full md:w-[65%] bg-white border border-gray-200 mt-5 p-4">
            <div className="md:flex md:gap-3">
              <div className="w-full">
                <SectionDivider title="Properti" />
                <div className="pt-2 flex flex-col gap-2">
                  <TenantInfo label="Tenant" value="Cv. Gracia Blue Logistic" />
                  <TenantInfo label="Alokasi" value="Kantor Penjualan Tiket" />
                  <TenantInfo
                    label="Alamat"
                    value="Graha Pelni, Jl Pahlawan No.18, wrwe 43 Surabaya"
                  />
                  <div className="flex gap-8">
                    <TenantInfo label="Luas Tanah" value="34432m" />
                    <TenantInfo label="Luas Gedung" value="44343m" />
                  </div>
                </div>
              </div>
              <div className="pt-4 md:pt-0 w-full">
                <SectionDivider title="Sewa" />
                <div className="pt-2 flex flex-col gap-2">
                  <TenantInfo label="Id Pengajuan" value="SUB12312312" />
                  <TenantInfo label="Nomor Kontrak" value="132B/3B64/13121" />
                  <TenantInfo
                    label="Jangka Waktu"
                    value="05 Agustus 2024 - 09 Oktober 2024"
                  />
                  <TenantInfo label="Harga" value="Rp. 144.000.000,-" />
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
              <SectionDivider title="Riwayat Transaksi" />
              <PaymentTable data={data} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Detail;
