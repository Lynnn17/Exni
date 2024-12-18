import Foto from "../../../../assets/ruangan.png";
import Card from "../../../reusable/card/CardTenant";
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
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);
  const [typeModal, setTypeModal] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}assets?type=TENANT`,
        { headers }
      );
      setData(response.data.data.assets);
    } catch (error) {
      console.error("Error fetching data:", error);
      StatusAlertService.showError("Gagal memuat data!");
    }
  };

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
      fetchData(); // Refresh data setelah penghapusan
    } catch (error) {
      console.error("Error deleting data:", error);
      StatusAlertService.showError("Data gagal dihapus!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main>
        <div className="w-full p-4 bg-white mt-4 h-full rounded-lg">
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
                name={item.name}
                address={item.tenants.address}
                building={item.tenants.building}
                capacity={item.tenants.floor}
                tenant={item.tenants.tenant}
                link={`edit/${item.id}`}
                harga={item.price}
                keterangan={item.isAvailable}
                linkFile={item.document}
                deskripsi={item.description}
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

          {/* Modal untuk File */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            data={selectedData}
            idFile={selectedData}
            idData={selectedId}
            type={typeModal}
          />

          {/* Modal Konfirmasi Hapus */}
          <ModalConfirm
            isOpen={confirmModalOpen}
            onClose={() => setConfirmModalOpen(false)}
            onConfirm={handleDelete}
          />

          {/* Notifikasi */}
          <StatusAlert />

          <Pagination />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
