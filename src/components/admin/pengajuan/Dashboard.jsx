import React, { useState } from "react";
import HeaderSection from "../../reusable/HeaderSection";
import { FaCircleInfo } from "react-icons/fa6";
import Pagination from "../Pagination";
import Search from "../../reusable/Search";
import DataTable from "../../dataTable/DataTable";

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

  const options = [
    { value: "pengajuan", label: "Pengajuan" },
    { value: "Tidak Aktif", label: "Tidak Aktif" },
    { value: "Pending", label: "Pending" },
  ];

  const actions = [
    {
      link: (id) => `/admin/submission/detail/${id}`,
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
          <DataTable
            columns={columns}
            data={data}
            actions={actions}
            options={options}
          />
          <Pagination />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
