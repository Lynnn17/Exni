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
    const userId = typeof id === "object" && id.id ? id.id : id;
    const userExists = data.some((user) => user.id === userId);

    if (!userExists) {
      console.error("User ID not found in local data:", userId);
      showAlert("User not found in current data", 404);
      return;
    }

    setSelectedId(userId);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedId) {
      console.error("Error: Selected ID is null or undefined.");
      showAlert("No user selected for deletion.", 400);
      return;
    }

    setIsDeleting(true);
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      console.log("Attempting to delete user with ID:", selectedId);
      console.log("Headers:", headers);

      const apiUrl = `${import.meta.env.VITE_API_URL}users/${selectedId}`;
      console.log("API URL:", apiUrl);

      const response = await axios.delete(apiUrl, { headers });

      console.log("Delete response:", response.data);

      if (response.status === 200) {
        showAlert(response.data.message, response.status);

        const updatedData = data.filter((user) => user.id !== selectedId);
        console.log("Updated data after deletion:", updatedData);

        setData(updatedData);
        setIsModalOpen(false);
      } else {
        showAlert("Failed to delete user.", response.status);
      }
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);

      const errorMessage =
        err.response?.data?.message ||
        "An error occurred while deleting the user.";
      showAlert(errorMessage, err.response?.status || 500);
    } finally {
      setIsDeleting(false);
    }
  };

  const fetchUserData = async (token) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}users?role=USER&isActive=true`,
        {
          headers,
        }
      );

      const users = response.data.data.users.map((user, index) => ({
        id: user.id,
        no: index + 1,
        iconUser: IconUser,
        pic: user.pic,
        address: user.address,
        email: user.email,
        noHP: user.contact,
        namaPT: user.company,
      }));

      setData(users);
    } catch (err) {
      showAlert("Error fetching user data. Please refresh the page.");
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
        await fetchUserData(token);
      } catch (err) {
        if (err.response?.data?.message === "jwt expired") {
          try {
            const newToken = await handleTokenRefresh(navigate);
            console.log("token", newToken);
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
        {/* Modal Konfirmasi */}
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)} // Tutup modal
          onConfirm={handleDelete} // Konfirmasi penghapusan
          message={
            isDeleting ? "Mohon tunggu sebentar..." : "Yakin nih dihapus?"
          }
        />

        {loading ? (
          <p>Loading data...</p>
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
