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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const confirmDelete = (id) => {
    setSelectedId(id);
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

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}users?role=USER&isActive=true`,
        { headers }
      );

      // Mengambil data users yang benar dari struktur data
      const usersData = response?.data?.data?.users?.users || [];
      const formattedData = usersData.map((user, index) => ({
        no: index + 1,
        id: user.id,
        namaPT: user.company,
        pic: user.pic || "-",
        address: user.address,
        email: user.email,
        noHP: user.contact || "-",
        iconUser: IconUser,
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      showAlert("Error fetching user data.", 500);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      setError(null);

      let token = localStorage.getItem("token");
      if (!token || token === "undefined") {
        try {
          token = await handleTokenRefresh();
        } catch (err) {
          setError("Unable to authenticate user.");
          setLoading(false);
          return;
        }
      }

      try {
        await fetchUserData();
      } catch (err) {
        if (err.response?.data?.message === "jwt expired") {
          try {
            const newToken = await handleTokenRefresh(navigate);
            await fetchUserData(newToken);
          } catch (refreshError) {
            setError("Session expired. Please login again.");
          }
        } else {
          setError("Failed to load user data please refresh the page.");
        }
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

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
          <Search />
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
          <DataTable
            columns={columns}
            data={data}
            actions={actions}
            aksi="Aksi"
          />
        )}

        <Pagination />
      </div>
    </main>
  );
};

export default Dashboard;
