import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import Pagination from "../../reusable/Pagination";
import DataTable from "../../reusable/dataTable/DataTable";
import HeaderForm from "../../reusable/HeaderForm";

const Detail = () => {
  const columns = [
    { title: "No", key: "no" },
    { title: "Nama PT", key: "name" },
    { title: "Properti", key: "properti" },
    { title: "Nominal", key: "nominal" },
    { title: "Waktu", key: "waktu" },
    { title: "Status", key: "status" },
  ];

  const data = [...Array(10)].map((_, index) => ({
    id: index + 1,
    no: index + 1,
    name: "PT. SAMPOERNA Tbk.",
    properti: "Cargo Ship",
    nominal: "Rp 100.000.000,-",
    waktu: "01 Oktober 2024 - 30 Desember 2024",
    status: "Pengajuan",
  }));

  const actions = [
    {
      link: (id) => `/submissions/detail/${id}`,
      icon: <FaCircleInfo />,
      className: "text-exni text-[1.5rem] text-center",
    },
  ];

  return (
    <>
      <main>
        <div className="w-full px-3 py-5 bg-white mt-4 h-full">
          <HeaderForm title="Detail Pengajuan" link="/submissions" />
          <div className="bg-white border border-gray-200 mt-5 p-4">
            <div className=" ">
              <div className="w-[85%] mx-auto grid grid-cols-2 md:grid-cols-4    gap-4 md:gap-10">
                <div className="">
                  <p className="">ID Pengajuan</p>
                  <p className="text-teks text-sm">132312323</p>
                </div>
                <div className="">
                  <p className="">Nomor Kontak</p>
                  <p className="text-teks text-sm">TH.0705-02/KNP/2024</p>
                </div>
                <div className="">
                  <p className="">Jangka Waktu</p>
                  <p className="text-teks text-sm">
                    05 Agustus 2024 - 09 Oktober 2024
                  </p>
                </div>
                <div className="">
                  <p className="">Nominal</p>
                  <p className="text-teks text-sm">Rp. 144.000.000,-</p>
                </div>
              </div>
              {/* beda */}
              <div className="p-4 bg-white border border-gray-200 mt-5 rounded-lg md:flex md:justify-center md:gap-48 ">
                <div>
                  <div className="flex items-center justify-between gap-2 ">
                    <p className="text-">Penyewa</p>
                    <div className="w-full h-[1px] bg-teks"></div>
                  </div>
                  <div className="pt-2 flex flex-col gap-2 ">
                    <div>
                      <p className="text-sm">Nama PT</p>
                      <p className="text-xs text-teks">PT. SAMPOERNA Tbk.</p>
                    </div>
                    <div>
                      <p className="text-sm">PIC</p>
                      <p className="text-xs text-teks">Aryeswara Jaya</p>
                    </div>
                    <div>
                      <p className="text-sm">Kontak</p>
                      <p className="text-xs text-teks">08123456789</p>
                    </div>
                    <div>
                      <p className="text-sm">Alamat</p>
                      <p className="text-xs text-teks">
                        Jl. Masjid besar Banda Neira 323823
                      </p>
                    </div>
                  </div>
                </div>
                {/* iki pemisah */}
                <div>
                  <div className="flex items-center justify-between gap-2 pt-3 ">
                    <p className="text-">Properti</p>
                    <div className="w-full h-[1px] bg-teks"></div>
                  </div>
                  <div className="pt-2 flex flex-col gap-2 ">
                    <div>
                      <p className="text-sm">Tenant</p>
                      <p className="text-xs text-teks">
                        Cv. Gracia Blue Logistic
                      </p>
                    </div>
                    <div>
                      <p className="text-sm">Alokasi</p>
                      <p className="text-xs text-teks">
                        Kantor Penjualan Ticket
                      </p>
                    </div>
                    <div>
                      <p className="text-sm">Alamat</p>
                      <p className="text-xs text-teks">
                        Graha Pelni, Jl Pahlawan No.18, Surabaya
                      </p>
                    </div>
                    <div className="flex gap-8">
                      <div>
                        <p className="text-sm">Luas Gedung</p>
                        <p className="text-xs text-teks">16303 m</p>
                      </div>
                      <div>
                        <p className="text-sm">Luas Tanah</p>
                        <p className="text-xs text-teks">23194 m</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Pagination />
        </div>
      </main>
    </>
  );
};

export default Detail;
