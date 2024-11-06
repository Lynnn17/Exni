import React, { useState } from "react";
import HeaderSection from "../../reusable/HeaderSection";
import { FaCircleInfo } from "react-icons/fa6";
import Pagination from "../../reusable/Pagination";
import Search from "../../reusable/Search";
import DataTable from "../../reusable/dataTable/DataTable";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <HeaderSection
            title="Pengajuan"
            subtitle=""
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
          >
            <Search />
          </HeaderSection>
          <DataTable columns={columns} data={data} actions={actions} Aksi="" />
          <Pagination />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
