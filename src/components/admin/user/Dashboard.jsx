import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderSection from "../../reusable/HeaderSection";
import IconUser from "../../../assets/icon/user.svg";
import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import Pagination from "../Pagination";
import Search from "../../reusable/Search";
import DataTable from "../../dataTable/DataTable";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]); // State for user data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  const columns = [
    { title: "No", key: "no" },
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
      link: (id) => `/admin/user/delete/${id}`,
      icon: <FaTrash />,
      className: "text-red-500",
    },
  ];

  // Fetch user data with Axios
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const users = response.data.data.users.map((user, index) => ({
          id: user.id,
          no: index + 1,
          iconUser: IconUser, // Static icon
          pic: user.pic,
          address: user.address,
          email: user.email,
          noHP: user.contact,
        }));

        setData(users);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <div className="w-full px-3 py-5 bg-white mt-4 h-full">
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
