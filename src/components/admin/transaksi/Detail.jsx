import React, { useState } from "react";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import Pagination from "../Pagination";
import HeaderForm from "../../reusable/HeaderForm";
import StatusSelect from "../../reusable/StatusSelect";
import DetailInfo from "../../reusable/DetailInfo";
import SectionDivider from "../../reusable/SectionDivider";
import TenantInfo from "../../reusable/TenantInfo";
import { FaArrowRight } from "react-icons/fa";
import PembayaranModal from "../../reusable/PembayaranModal";
import { HiEye } from "react-icons/hi";

const Detail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const payments = [
    { id: 1, name: "Pembayaran 1", status: "Paid", amount: 42000000 },
    { id: 2, name: "Pembayaran 2", status: "Paid", amount: 32000000 },
  ];

  const handleSimpan = () => {
    StatusAlertService.showSuccess("Data berhasil disimpan!");
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const [statusPembayaran, setStatusPembayaran] = useState("transaksi");

  const optionsPembayaran = [
    { value: "transaksi", label: "Transaksi" },
    { value: "lunas", label: "Lunas" },
  ];

  return (
    <main>
      <div className="w-full px-3 py-5 bg-white mt-4 h-full rounded-lg">
        <StatusAlert />
        <HeaderForm title="Detail Transaksi" link="/admin/transaction" />
        <div className="bg-white border border-gray-200 mt-5 p-4 rounded-lg">
          <div className="w-[95%] mx-auto grid grid-cols-2 md:flex gap-4 md:gap-10 lg:gap-12 xl:gap-24">
            <DetailInfo label="ID Transaksi" value="132312323" />
            <DetailInfo
              label="Jangka Waktu"
              value="05 Agustus 2024 - 09 Oktober 2024"
            />
            <DetailInfo label="Nominal" value="Rp. 144.000.000,-" />
          </div>

          <div className="p-4 bg-white border border-gray-200 mt-5 rounded-lg md:flex md:justify-center md:gap-60 xl:gap-92">
            <div>
              <SectionDivider title="Penyewa" />
              <div className="pt-2 flex flex-col gap-2">
                <TenantInfo label="Nama PT" value="PT. SAMPOERNA Tbk." />
                <TenantInfo label="PIC" value="Aryeswara Jaya" />
                <TenantInfo label="Kontak" value="08123456789" />
                <TenantInfo
                  label="Alamat"
                  value="Jl. Masjid besar Banda Neira 323823"
                />
              </div>
            </div>
            <div>
              <SectionDivider title="Properti" />
              <div className="pt-2 flex flex-col gap-2">
                <TenantInfo label="Tenant" value="Cv. Gracia Blue Logistic" />
                <TenantInfo label="Alokasi" value="Kantor Penjualan Ticket" />
                <TenantInfo
                  label="Alamat"
                  value="Graha Pelni, Jl Pahlawan No.18, Surabaya"
                />
                <div className="flex gap-8">
                  <TenantInfo label="Luas Gedung" value="16303 m" />
                  <TenantInfo label="Luas Tanah" value="23194 m" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-1 md:p-4 md:flex md:gap-5">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row pt-4 gap-5 md:gap-20">
                <div>
                  <div className="flex flex-row gap-3 ">
                    <label className="block text-gray-700 font-medium mt-1">
                      Status Pembayaran
                    </label>
                    <div className="text-exni text-3xl">
                      <button onClick={handleOpenModal}>
                        <HiEye />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="block text-gray-700 font-medium">
                      Status Pembayaran
                    </label>
                    <StatusSelect
                      value={statusPembayaran}
                      onChange={(e) => setStatusPembayaran(e.target.value)}
                      options={optionsPembayaran}
                    />
                  </div>
                </div>
                <div className="flex gap-5">
                  <div>
                    <p>Proposal</p>
                    <button className="px-3 py-1 bg-ungu rounded-lg text-white text-xs flex items-center gap-2">
                      Lihat <FaArrowRight />
                    </button>
                  </div>
                  <div>
                    <p>Berita Acara</p>
                    <button className="px-4 py-1 bg-ungu rounded-lg text-white text-xs flex items-center gap-2">
                      Lihat <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-center pt-6 pb-4 gap-4">
            <button
              onClick={() => window.history.back()}
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700"
            >
              Keluar
            </button>
            <button
              className="px-2 py-2 bg-purple-600 text-white rounded-md"
              onClick={handleSimpan}
            >
              Simpan
            </button>
          </div>
        </div>
        <Pagination />
      </div>
    </main>
  );
};

export default Detail;
