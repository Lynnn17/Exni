import React, { useState, useEffect } from "react";
import HeaderSection from "../../reusable/HeaderSection";
import Pagination from "../Pagination";
import Search from "../../reusable/Search";
import DataTable from "../../dataTable/DataTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import Moment from "moment";
import { NumericFormat } from "react-number-format";
import Loading from "../../reusable/Loading";
import moment from "moment";

const Dashboard = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setIsLoading] = useState(false);

  const { user_id } = JSON.parse(localStorage.getItem("user"));

  const columns = [
    { title: "ID Transaksi", key: "id" },
    { title: "Tanggal", key: "tanggalPengajuan" },
    { title: "Properti", key: "namaAset" },
    { title: "Status Pembayaran", key: "statusPembayaran" },
    { title: "Urutan Pembayaran", key: "urutanPembayaran" },
    { title: "Nominal Dibayar", key: "nominal" },
    { title: "Tagihan", key: "tagihan" },
    { title: "Catatan", key: "note" },
  ];

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async (page = 1) => {
    setIsLoading(true);
    try {
      const queryParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : "";
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }transactions/user/${user_id}?page=${page}${queryParam}`,
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

  const statusMapping = {
    INITIATE: "Diajukan",
    PENDING: "Diproses",
    APPROVED: "Disetujui",
    REJECTED: "Ditolak",
  };

  const datas = data?.map((item, index) => ({
    no: index + 1,
    id: item.id,
    tanggalPengajuan: Moment(item.createdAt).format("DD MMMM YYYY HH:mm:ss"),
    namaAset: "cv Gracia Blue Logistik Nusantara nunggu backend",
    statusPembayaran: statusMapping[item.status],
    urutanPembayaran: item.number_of_trans,
    nominal: (
      <NumericFormat
        value={item.amount} // Nilai yang ingin diformat
        displayType={"text"} // Menampilkan sebagai teks
        thousandSeparator={true} // Menambahkan pemisah ribuan
        prefix={"Rp "} // Menambahkan prefix Rupiah
      />
    ),
    tagihan: (
      <NumericFormat
        value={item.rent.total_price - item.amount} // Nilai yang ingin diformat
        displayType={"text"} // Menampilkan sebagai teks
        thousandSeparator={true} // Menambahkan pemisah ribuan
        prefix={"Rp "} // Menambahkan prefix Rupiah
      />
    ),
    note: (
      <textarea
        value={item.note || "-"}
        className="text-sm w-full border border-gray-300 rounded-md px-3 pt-2 text-gray-700 h-[12vh] lg:h-[20vh] xl:h-[12vh] overflow-y-scroll resize-none no-scrollbar"
        rows={3}
        readOnly
      />
    ),
  }));

  const actions = [
    {
      icon: (item) => (
        <button
          onClick={() => navigate(`/user/transaction/detail/${item?.id}`)}
          className={`px-4 py-2 rounded-md text-white ${
            item?.status === "paid" ? "bg-gray-400" : "bg-red-500"
          }`}
          disabled={item?.status === "paid"}
        >
          {item?.status === "paid" ? "Lunas" : "Bayar"}
        </button>
      ),
    },
  ];

  return (
    <main className="bg-gray-50">
      <StatusAlert />
      <div className="rounded-lg w-full px-3 py-5 bg-white mt-4 h-full">
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

        {loading ? (
          <Loading />
        ) : (
          <>
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
