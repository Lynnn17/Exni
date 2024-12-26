import React, { useState, useEffect } from "react";
import HeaderSection from "../../reusable/HeaderSection";
import { FaCircleInfo } from "react-icons/fa6";
import Pagination from "../Pagination";
import Search from "../../reusable/Search";
import DataTable from "../../dataTable/DataTable";
import StatusButton from "../../reusable/StatusButton";
import Modal from "../../reusable/Modal";
import axios from "axios";
import Moment from "moment";
import { NumericFormat } from "react-number-format";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import Loading from "../../reusable/Loading";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

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
    status: item.status,
    lamaCicilan: item.rent.application.installment_count,
    tipePembayaran: item.rent.application.payment_type,
    update: Moment(item.updatedAt).format("D MMM YYYY HH:mm:ss"),
    nominalPengajuan: (
      <NumericFormat
        value={item.amount}
        displayType="text"
        thousandSeparator
        prefix="Rp "
        renderText={(value) => <div readOnly>{value} </div>}
      />
    ),
    buktiTransfer: item.receipt,
    beritaAcara: item.rent.application.minutesOfMeeting,
    catatan: item.note,
  }));

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}transactions`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      StatusAlertService.showError("Gagal memuat data!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (item) => {
    console.log(item);
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
  ];

  return (
    <main>
      <StatusAlert />
      <div className="w-full px-3 py-5 bg-white mt-4 h-full rounded-lg">
        <HeaderSection
          title="Transaksi"
          subtitle=""
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
        >
          <Search />
        </HeaderSection>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              data={selectedData}
              fetchData={fetchData}
            />

            <DataTable columns={columns} data={datas} actions={actions} />

            <Pagination />
          </>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
