import React, { useState, useEffect } from "react";
import Card from "../../../reusable/card/CardVehicles";
import Pagination from "../../Pagination";
import ModalConfirm from "../../../reusable/ConfirmationModal";
import Modal from "../../../reusable/ModalFile";
import HeaderSection from "../../../reusable/HeaderSection";
import Search from "../../../reusable/Search";
import axios from "axios";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const [typeModal, setTypeModal] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}assets?type=VEHICLE`
      );
      console.log("data", response.data.data.assets);
      setData(response.data.data.assets);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleModalFile = (item, id, type) => {
    setTypeModal(type);
    setSelectedData(item);
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}assets/${selectedId}`,
        {
          headers,
        }
      );
      setConfirmModalOpen(false);
      StatusAlertService.showSuccess("Data berhasil dihapus!");
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
      StatusAlertService.showError("Data gagal dihapus!");
    }
  };

  return (
    <>
      <main>
        <StatusAlert />
        <div className="w-full p-4 bg-white mt-4 h-full rounded-lg">
          <HeaderSection
            title="Aset"
            subtitle="Kendaraan"
            linkTo="add"
            linkText="Tambah"
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
          >
            <Search />
          </HeaderSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4">
            {data?.assets?.map((item, i) => (
              <Card
                key={i}
                foto={item.albums[0]}
                title={item.name}
                plat={item.vehicles.no_police}
                type={""}
                year={item.vehicles.year}
                machine={item.vehicles.no_police}
                frame={item.vehicles.no_frame}
                condition=""
                link={`edit/${item.id}`}
                modalFile={() =>
                  handleModalFile(item.documents, item.id, "Document")
                }
                modalGambar={() =>
                  handleModalFile(item.albums, item.id, "Gambar")
                }
                modalDelete={() => {
                  setConfirmModalOpen(true);
                  setSelectedId(item.id);
                }}
              />
            ))}
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            data={selectedData}
            idFile={selectedData}
            idData={selectedId}
            type={typeModal}
          />

          <ModalConfirm
            isOpen={confirmModalOpen}
            onClose={() => setConfirmModalOpen(false)}
            onConfirm={handleDelete}
          />
          <Pagination />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
