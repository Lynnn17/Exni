import React, { useState, useEffect } from "react";
import HeaderSection from "../../reusable/HeaderSection";
import Pagination from "../Pagination";
import Search from "../../reusable/Search";
import DataTable from "../../dataTable/DataTable";
import { BsPencilSquare } from "react-icons/bs";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import Moment from "moment";
import Loading from "../../reusable/Loading";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const columns = [
    { title: "No", key: "no" },
    { title: "Nama PT", key: "name" },
    { title: "Properti", key: "properti" },
    { title: "Nominal", key: "nominal" },
    { title: "Waktu", key: "waktu" },
    { title: "Status", key: "ValueStatus" },
  ];

  const datas = data?.map((item, index) => ({
    id: item.id,
    no: index + 1,
    name: item.user.company,
    properti: item.asset.name,
    nominal: (
      <NumericFormat
        value={item.proposed_price} // Nilai yang ingin diformat
        displayType={"text"} // Menampilkan sebagai teks
        thousandSeparator={true} // Menambahkan pemisah ribuan
        prefix={"Rp "} // Menambahkan prefix Rupiah
        renderText={(value) => <div>{value} </div>} // Menampilkan hasilnya
      />
    ),
    waktu:
      Moment(item.rent_start_date).format("D MMM YYYY") +
      " - " +
      Moment(item.rent_end_date).format("D MMM YYYY"),
    ValueStatus: (
      <span
        key={index}
        className={`font-medium px-2 py-1 rounded ${
          item.status === "PROCESS"
            ? "bg-yellow-500 text-white"
            : item.status === "REJECTED"
            ? "bg-red-500 text-white"
            : item.status === "APPROVED"
            ? "bg-green-500 text-white"
            : item.status === "PENDING"
            ? "bg-blue-500 text-white"
            : "bg-gray-500 text-white"
        }`}
      >
        {item.status}
      </span>
    ),
  }));

  const actions = [
    {
      link: (id) => `/admin/submission/detail/${id}`,
      icon: <BsPencilSquare />,
      className: "text-exni text-[1.5rem] text-center",
    },
  ];

  const fetchData = async (page = 1) => {
    setIsLoading(true);
    try {
      const queryParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : "";
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}applications?page=${page}${queryParam}`,
        { headers }
      );
      const { applications, totalPages: total } =
        response.data.data.applications;
      setData(applications);

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

  return (
    <>
      <main>
        <div className="w-full px-3 py-5 bg-white mt-4 h-full rounded-lg">
          <HeaderSection
            title="Pengajuan"
            subtitle=""
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
          >
            <Search
              placeholder="Cari Pengajuan ..."
              buttonText="Cari"
              onSearch={handleSearch}
            />
          </HeaderSection>
          {isLoading ? (
            <Loading />
          ) : data.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p>Tidak ada data pengajuan</p>
            </div>
          ) : (
            <DataTable columns={columns} data={datas} actions={actions} />
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
