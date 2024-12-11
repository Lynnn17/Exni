import Foto from "../../../../assets/ruangan.png";
import Card from "../../../reusable/card/CardTenant";
import Pagination from "../../Pagination";
import React, { useState } from "react";
import HeaderSection from "../../../reusable/HeaderSection";
import Search from "../../../reusable/Search";
import axios from "axios";
import Modal from "../../../reusable/ModalFile";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}assets?type=TENANT`,
        {
          headers,
        }
      );
      setData(response.data.data.assets);
      // setData(response.data.data.assets);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalFile = (item) => {
    setSelectedData(item);
    setModalOpen(true);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main>
        <div className="w-full p-4 bg-white mt-4 h-full">
          <HeaderSection
            title="Aset"
            subtitle="Tenants"
            linkTo="add"
            linkText="Tambah"
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
          >
            <Search />
          </HeaderSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4">
            {data.map((item, i) => (
              <Card
                key={i}
                foto={item.albums[0]}
                title={item.name}
                address={item.tenants.address}
                building={item.tenants.building}
                capacity={item.tenants.floor}
                link={`edit/${item.id + 1}`}
                modalFile={handleModalFile}
                linkFile={item.document}
              />
            ))}
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            data={selectedData}
          />
          <Pagination />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
