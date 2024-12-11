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
  const [typeModal, setTypeModal] = useState(null);

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
      console.log(response.data.data.assets);
      setData(response.data.data.assets);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalFile = (item) => {
    setTypeModal("Dokumen");
    setSelectedData(item);
    setModalOpen(true);
  };

  const handleModalGambar = (item) => {
    setTypeModal("Gambar");
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
                  alokasi={item.properties.allocation}
                  landSize={item.properties.landArea}
                  buildingSize={item.properties.buildingArea}
                  harga={item.price}
                  deskripsi={item.description}
                  link={`edit/${i + 1}`}
                  modalFile={handleModalFile}
                  linkFile={item.documents}
                  keterangan={item.isAvailable}
                  modalGambar={handleModalGambar}
                  linkGambar={item.albums}
                />
              </div>
            ))}
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            data={selectedData}
            type={typeModal}
          />
          <Pagination />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
