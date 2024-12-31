import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderSection from "../../reusable/HeaderSection";
import IconUser from "../../../assets/icon/user.svg";
import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import Pagination from "../Pagination";
import Search from "../../reusable/Search";
import DataTable from "../../dataTable/DataTable";
import { handleTokenRefresh } from "../../../utils/authUtils";
import { useNavigate } from "react-router-dom";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import ConfirmationModal from "../../reusable/ConfirmationModal";
import Loading from "../../reusable/Loading";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setIsLoading] = useState(true);

  const [selectedId, setSelectedId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Token dari localStorage
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const columns = [
    { title: "No", key: "no" },
    { title: "Nama PT", key: "namaPT" },
    { title: "PIC", key: "pic" },
    { title: "Alamat", key: "address" },
    { title: "Email", key: "email" },
    { title: "No.HP", key: "noHP" },
  ];

  const actions = [
    {
      link: (id) => `/admin/user/edit/${id}`,
      icon: <IoPencil />,
      className: "text-[#5641BA]",
    },
    {
      icon: (id) => (
        <button className="text-red-500" onClick={() => confirmDelete(id)}>
          <FaTrash />
        </button>
      ),
    },
  ];

  const showAlert = (message, type) => {
    if (type === 200 || type === 201) {
      StatusAlertService.showSuccess(message);
    } else {
      StatusAlertService.showError(message);
    }
  };

  const confirmDelete = (e) => {
    setSelectedId(e.id);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedId) {
      showAlert("No user selected for deletion.", 400);
      return;
    }

    setIsDeleting(true);
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}users/${selectedId}`,
        { headers }
      );

      if (response.status === 200) {
        showAlert("User deleted successfully!", 200);

        setData((prevData) =>
          prevData.filter((user) => user.id !== selectedId)
        );
        setIsModalOpen(false);
      } else {
        showAlert("Failed to delete user.", response.status);
      }
    } catch (err) {
      showAlert("An error occurred while deleting the user.", 500);
    } finally {
      setIsDeleting(false);
    }
  };

  const fetchData = async (page = 1) => {
    setIsLoading(true);
    try {
      const queryParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : "";
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }users?role=USER&isActive=true&page=${page}${queryParam}`,
        { headers }
      );
      console.log("res", response.data);
      const { users, totalPages: total } = response.data.data.users;
      setData(users);

      setTotalPages(total);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const datas = data.map((user, index) => ({
    no: index + 1,
    id: user.id,
    namaPT: user.company,
    pic: user.pic || "-",
    address: user.address,
    email: user.email,
    noHP: user.contact || "-",
    iconUser: IconUser,
  }));

  return (
    <main>
      <StatusAlert />
      <div className="w-full px-3 py-5 bg-white mt-4 h-full rounded-lg">
        <HeaderSection
          title="Akun Pengguna"
          subtitle=""
          linkTo="/admin/user/add"
          linkText="Tambah"
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
        >
          <Search
            placeholder="Cari user ..."
            buttonText="Cari"
            onSearch={handleSearch}
          />
        </HeaderSection>
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          message={
            isDeleting ? "Mohon tunggu sebentar..." : "Yakin ingin menghapus?"
          }
        />

        {loading ? (
          <Loading />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <DataTable
              columns={columns}
              data={datas}
              actions={actions}
              aksi="Aksi"
            />
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
