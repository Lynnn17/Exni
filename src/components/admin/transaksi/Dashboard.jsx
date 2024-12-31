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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const columns = [
    { title: "No", key: "no" },
    { title: "ID Transaksi", key: "id" },
    { title: "Jenis Aset", key: "jenisAset" },
    { title: "Nama Aset", key: "namaAset" },
    { title: "Nama Penyewa", key: "namaPenyewa" },
    { title: "Tanggal Pengajuan (Update)", key: "tanggalPengajuan" },
    { title: "Masa Sewa", key: "masaSewa" },
    { title: "Status", key: "statusValue" },
  ];

  const [data, setData] = useState([]);

  const datas = data
    ?.sort((a, b) => {
      const dateA = Moment(a.rent.application.createdAt);
      const dateB = Moment(b.rent.application.createdAt);
      return dateB - dateA;
    })
    .map((item, index) => ({
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
        Moment(item.rent.application.rent_end_date).format(
          "D MMM YYYY HH:mm:ss"
        ),
      statusValue: <StatusButton status={item.status} />,
      status: item.status,
      lamaCicilan: item.number_of_trans,
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

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async (page = 1) => {
    setIsLoading(true);
    try {
      const queryParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : "";
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}transactions?page=${page}${queryParam}`,
        { headers }
      );
      const { transactions, totalPages: total } = response.data.data;
      setData(transactions);
      console.log("data", transactions);
      setTotalPages(total);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
      StatusAlertService.showError("Gagal memuat data!");
    } finally {
      setIsLoading(false);
    }
  };
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset ke halaman pertama saat melakukan pencarian
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, searchQuery]);

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
          <Search
            placeholder="Cari Transaksi ..."
            buttonText="Cari"
            onSearch={handleSearch}
          />
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

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
