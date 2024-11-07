import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import LogoExni from "../../assets/logo/exni.svg";

const InfoLine = ({ label, value }) => (
  <div className="flex">
    <strong className="w-[10rem] text-sm">{label}</strong>
    <p className="text-sm">{value}</p>
  </div>
);

const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[26rem] relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
          onClick={onClose}
        >
          <IoCloseSharp />
        </button>
        <div className="flex justify-between items-center mb-4 pt-3 gap-5">
          <span className="text-sm font-medium">{data.id}</span>
          <img src={LogoExni} alt="Logo Exni" />
          <span className="text-sm">11 November 2024</span>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold underline">Tenant</h3>
          <div className="flex flex-col gap-1">
            <InfoLine label="Nama Aset" value={data.namaAset} />
            <InfoLine label="Nama Penyewa" value={data.namaPenyewa} />
            <InfoLine label="Masa Sewa" value={data.masaSewa} />
            <InfoLine label="Nominal" value="Rp. 110.000.000" />
            <InfoLine label="Jenis Pembayaran" value={data.status} />
            <InfoLine label="Lama Cicilan" value="-" />
            <InfoLine label="Tanggal Transaksi" value={data.tanggalPengajuan} />
            <InfoLine label="Status Transaksi" value="Berhasil" />
          </div>
        </div>

        <div className="flex justify-between">
          <button className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">
            Bukti Transfer
          </button>
          <button className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">
            Proposal Pengajuan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
