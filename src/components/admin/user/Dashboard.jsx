import React, { useState } from "react";
import HeaderSection from "../../reusable/HeaderSection";
import IconUser from "../../../assets/icon/user.svg";
import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import Pagination from "../../reusable/Pagination";
import Search from "../../reusable/Search";
import DataTable from "../../dataTable/DataTable";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const columns = [
    { title: "No", key: "no" },
    { title: "Nama", key: "name" },
    { title: "Alamat", key: "address" },
    { title: "Email", key: "email" },
  ];

  // Define data with corresponding keys for each column
  const data = [...Array(10)].map((_, index) => ({
    id: index + 1,
    no: index + 1,
    iconUser: IconUser,
    name: "John Doe",
    address: "Jakarta, padat banget wes gk ngerti lah",
    email: "lintangkusuma17@gmail.com",
  }));

  const actions = [
    {
      link: (id) => `/users/edit/${id}`,
      icon: <IoPencil />,
      className: "text-[#5641BA]",
    },
    {
      link: (id) => `/users/delete/${id}`,
      icon: <FaTrash />,
      className: "text-red-500",
    },
  ];

  return (
    <main>
      <div className="w-full px-3 py-5 bg-white mt-4 h-full">
        <HeaderSection
          title="Users"
          subtitle=""
          linkTo="/users/add"
          linkText="Add"
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
        >
          <Search />
        </HeaderSection>

        <DataTable
          columns={columns}
          data={data}
          actions={actions}
          aksi="Aksi"
        />

        <Pagination />
      </div>
    </main>
  );
};

export default Dashboard;
