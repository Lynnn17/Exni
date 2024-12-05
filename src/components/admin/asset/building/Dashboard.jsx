import Foto from "../../../../assets/rumah.png";
import Card from "../../../reusable/card/CardBuilding";
import Pagination from "../../Pagination";
import React, { useState, useEffect } from "react";
import HeaderSection from "../../../reusable/HeaderSection";
import Search from "../../../reusable/Search";
import axios from "axios";
import Modal from "../../../reusable/ModalFile";
import StatusAlert, { StatusAlertService } from "react-status-alert";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}assets?type=PROPERTY`,
        {
          headers,
        }
      );
      setData(response.data.data.assets);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalFile = (item) => {
    setSelectedData(item);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main>
        <StatusAlert />
        <div className="w-full p-4 bg-white mt-4 h-full">
          <HeaderSection
            title="Aset"
            subtitle="Gedung"
            linkTo="add"
            linkText="Tambah"
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
          >
            <Search />
          </HeaderSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4">
            {data.map((item, i) => (
              <div>
                <Card
                  key={i}
                  foto={item.albums[0]}
                  title={item.name}
                  address={item.properties.address}
                  alokasi="Kantor Penjualan Tiket"
                  landSize="16568 m²"
                  buildingSize="13231 m²"
                  harga={item.price}
                  deskripsi={item.description}
                  link={`edit/${i + 1}`}
                  modalFile={handleModalFile}
                  linkFile={item.document}
                />
              </div>
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
