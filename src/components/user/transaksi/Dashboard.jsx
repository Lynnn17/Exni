import React, { useState } from "react";
import HeaderSection from "../../reusable/HeaderSection";
import Pagination from "../Pagination";
import Search from "../../reusable/Search";
import DataTable from "../../dataTable/DataTable";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const columns = [
    { title: "ID Transaksi", key: "id" },
    { title: "Tanggal", key: "tanggalPengajuan" },
    { title: "Properti", key: "namaAset" },
    { title: "Jenis Pembayaran", key: "jenisPembayaran" },
    { title: "Progres Pembayaran", key: "progresPembayaran" },
    { title: "Nominal", key: "nominal" },
  ];

  const data = [...Array(6)].map((_, index) => ({
    id: "1223354",
    tanggalPengajuan: "01 Oktober 2024",
    namaAset: "cv Gracia Blue Logistik Nusantara",
    jenisPembayaran: "Cicilan",
    progresPembayaran: "Pembayaran ke-1",
    nominal: "Rp. 200.300.423,-",
  }));

  const actions = [
    {
      icon: (item) => (
        <button
          onClick={() =>
            (window.location.href = `/user/transaction/detail/${item.id}`)
          }
          className={`px-4 py-2 rounded-md text-white ${
            item.status === "paid" ? "bg-gray-400" : "bg-red-500"
          }`}
          disabled={item.status === "paid"}
        >
          {item.status === "paid" ? "Lunas" : "Bayar"}
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

        <DataTable columns={columns} data={data} actions={actions} />

        <Pagination />
      </div>
    </main>
  );
};

export default Dashboard;
