import React, { useState, useEffect } from "react";
import HeaderSection from "../../reusable/HeaderSection";
import { FaCircleInfo } from "react-icons/fa6";
import { LuPenSquare } from "react-icons/lu";
import Pagination from "../Pagination";
import Search from "../../reusable/Search";
import DataTable from "../../dataTable/DataTable";
import StatusButton from "../../reusable/StatusButton";
import Modal from "../../reusable/Modal";
import axios from "axios";
import Moment from "moment";

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
    { title: "Status", key: "statusValue" },
  ];

  const [data, setData] = useState([]);

  const datas = data?.transactions?.map((item, index) => ({
    id: item.id,
    no: index + 1,
    jenisAset: item.rent.application.asset.type,
    namaAset: item.rent.application.asset.name,
    namaPenyewa: item.rent.application.user.company,
    tanggalPengajuan: Moment(item.rent.application.createdAt).format(
      "D MMM YYYY  HH:mm:ss"
    ),
    masaSewa:
      Moment(item.rent.application.rent_start_date).format(
        "D MMM YYYY  HH:mm:ss"
      ) +
      " - " +
      Moment(item.rent.application.rent_end_date).format("D MMM YYYY HH:mm:ss"),
    statusValue: <StatusButton status={item.status} />,
    // name: item.user.company,
    // properti: item.asset.name,
    // nominal: (
    //   <NumericFormat
    //     value={item.proposed_price} // Nilai yang ingin diformat
    //     displayType={"text"} // Menampilkan sebagai teks
    //     thousandSeparator={true} // Menambahkan pemisah ribuan
    //     prefix={"Rp "} // Menambahkan prefix Rupiah
    //     renderText={(value) => <div>{value} </div>} // Menampilkan hasilnya
    //   />
    // ),
    // waktu:
    //   Moment(item.rent_start_date).format("D MMM YYYY") +
    //   " - " +
    //   Moment(item.rent_end_date).format("D MMM YYYY"),
    // ValueStatus: (
    //   <span
    //     key={index}
    //     className={`font-medium px-2 py-1 rounded ${
    //       item.status === "PENDING"
    //         ? "bg-yellow-500 text-white"
    //         : item.status === "REJECT"
    //         ? "bg-red-500 text-white"
    //         : item.status === "APPROVE"
    //         ? "bg-green-500 text-white"
    //         : "bg-gray-500 text-white"
    //     }`}
    //   >
    //     {item.status}
    //   </span>
    // ),
  }));

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}transactions`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (item) => {
    setSelectedData(item);
    setModalOpen(true);
  };

  const actions = [
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
    {
      icon: <LuPenSquare />,
      link: (item) => `/admin/transaction/detail/${item}`,
      className: "text-exni text-2xl pt-1",
    },
  ];

  return (
    <main>
      <div className="w-full px-3 py-5 bg-white mt-4 h-full rounded-lg">
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

        <DataTable columns={columns} data={datas} actions={actions} />

        <Pagination />
      </div>
    </main>
  );
};

export default Dashboard;
