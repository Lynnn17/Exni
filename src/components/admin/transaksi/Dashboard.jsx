import React, { useState } from "react";
import HeaderSection from "../../reusable/HeaderSection";
import { FaCircleInfo } from "react-icons/fa6";
import Pagination from "../Pagination";
import Search from "../../reusable/Search";
import DataTable from "../../dataTable/DataTable";
import StatusButton from "../../reusable/StatusButton";
import Modal from "../../reusable/Modal";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const columns = [
    { title: "No", key: "no" },
    { title: "ID Transaksi", key: "id" },
    { title: "Jenis Aset", key: "jenisAset" },
    { title: "Nama Aset", key: "namaAset" },
    { title: "Nama Penyewa", key: "namaPenyewa" },
    { title: "Tanggal Pengajuan", key: "tanggalPengajuan" },
    { title: "Masa Sewa", key: "masaSewa" },
  ];

  const data = [...Array(10)].map((_, index) => ({
    id: index + 122334234,
    no: index + 1,
    jenisAset: "Tenant",
    namaAset: "Gedung Majapahit",
    namaPenyewa: "PT Geal Geol",
    tanggalPengajuan: "01 Oktober 2024",
    masaSewa: "3 Tahun",
    status: index % 3 === 0 ? "unpaid" : index % 3 === 1 ? "paid" : "process",
  }));

  const handleOpenModal = (item) => {
    setSelectedData(item);
    setModalOpen(true);
  };

  const actions = [
    {
      icon: (item) => <StatusButton status={item.status} />,
    },

    {
      icon: (item) => (
        <button
          onClick={() => handleOpenModal(item)}
          className="text-exni text-2xl pt-1"
        >
          <FaCircleInfo />
        </button>
      ),
    },
  ];

  return (
    <main>
      <div className="w-full px-3 py-5 bg-white mt-4 h-full">
        <HeaderSection
          title="Transaksi"
          subtitle=""
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
        >
          <Search />
        </HeaderSection>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          data={selectedData}
        />

        <DataTable columns={columns} data={data} actions={actions} />

        <Pagination />
      </div>
    </main>
  );
};

export default Dashboard;
