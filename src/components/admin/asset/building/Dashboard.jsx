import Card from "../../../reusable/card/CardBuilding";
import Pagination from "../../Pagination";
import React, { useState, useEffect } from "react";
import HeaderSection from "../../../reusable/HeaderSection";
import Search from "../../../reusable/Search";
import axios from "axios";
import Modal from "../../../reusable/ModalFile";
import ModalConfirm from "../../../reusable/ConfirmationModal";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [idFile, setIdFile] = useState(null);
  const [idData, setIdData] = useState(null);
  const [typeModal, setTypeModal] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // Token dari localStorage
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  // Fetch data dari API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}assets?type=PROPERTY`,
        { headers }
      );
      setData(response.data.data.assets);
    } catch (error) {
      console.error("Error fetching data:", error);
      StatusAlertService.showError("Gagal memuat data!");
    }
  };

  // Fungsi untuk menghapus data
  const handleDelete = async () => {
    if (!idData) {
      StatusAlertService.showError("ID data tidak valid!");
      return;
    }

    try {
      // Lakukan request delete
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}assets/${idData}`,
        { headers }
      );

      if (response.status === 200 || response.status === 204) {
        StatusAlertService.showSuccess("Data berhasil dihapus!");
        fetchData(); // Refresh data setelah penghapusan
      } else {
        throw new Error("Gagal menghapus data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      StatusAlertService.showError("Data gagal dihapus!");
    } finally {
      setConfirmModalOpen(false);
      setIdData(null);
    }
  };

  const handleModalFile = (item, id) => {
    setTypeModal("Document");
    setIdData(id);
    setIdFile(item);
    setModalOpen(true);
  };

  const handleModalGambar = (item, id) => {
    setTypeModal("Gambar");
    setIdData(id);
    setIdFile(item);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main>
        {/* StatusAlert Component */}
        <StatusAlert />

        <div className="w-full p-4 bg-white mt-4 h-full">
          {/* Header Section */}
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

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4">
            {data?.assets?.length > 0 ? (
              data?.assets?.map((item, i) => (
                <div key={item.id || i}>
                  <Card
                    foto={item.albums?.[0] || ""}
                    title={item.name || "N/A"}
                    address={item.properties?.address || "N/A"}
                    alokasi={item.properties?.allocation || "N/A"}
                    landSize={item.properties?.landArea || "N/A"}
                    buildingSize={item.properties?.buildingArea || "N/A"}
                    harga={item.price || "N/A"}
                    deskripsi={item.description || "N/A"}
                    link={`edit/${item.id}`}
                    modalFile={() => handleModalFile(item.documents, item.id)}
                    keterangan={
                      item.isAvailable ? "Tersedia" : "Tidak Tersedia"
                    }
                    modalGambar={() => handleModalGambar(item.albums, item.id)}
                    modalDelete={() => {
                      setConfirmModalOpen(true);
                      setIdData(item.id);
                    }}
                  />
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                Tidak ada data tersedia.
              </p>
            )}
          </div>

          {/* Modal File */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            idFile={idFile}
            idData={idData}
            type={typeModal}
          />

          {/* Modal Konfirmasi Hapus */}
          <ModalConfirm
            isOpen={confirmModalOpen}
            onClose={() => setConfirmModalOpen(false)}
            onConfirm={handleDelete}
          />

          {/* Pagination */}
          <Pagination />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
