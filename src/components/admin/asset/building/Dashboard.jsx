import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";

import Card from "../../../reusable/card/CardBuilding";
import Pagination from "../../Pagination";
import HeaderSection from "../../../reusable/HeaderSection";
import Search from "../../../reusable/Search";
import Modal from "../../../reusable/ModalFile";
import ModalConfirm from "../../../reusable/ConfirmationModal";
import Loading from "../../../reusable/Loading";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [idFile, setIdFile] = useState(null);
  const [idData, setIdData] = useState(null);
  const [typeModal, setTypeModal] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Token dari localStorage
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  // Fetch data dari API
  const fetchData = async (page = 1) => {
    setIsLoading(true);
    try {
      const queryParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : "";
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }assets?type=PROPERTY&page=${page}${queryParam}`,
        { headers }
      );
      console.log("res", response.data);
      const { assets, totalPages: total } = response.data.data.assets;
      setData(assets);
      setTotalPages(total);
    } catch (error) {
      console.error("Error fetching data:", error);
      StatusAlertService.showError("Gagal memuat data!");
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk menghapus data
  const handleDelete = async () => {
    if (!idData) {
      StatusAlertService.showError("ID data tidak valid!");
      return;
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}assets/${idData}`,
        { headers }
      );

      if (response.status === 200 || response.status === 204) {
        StatusAlertService.showSuccess("Data berhasil dihapus!");
        fetchData(currentPage); // Refresh data setelah penghapusan
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

  const handleModal = (item, id, type) => {
    setTypeModal(type);
    setIdData(id);
    setIdFile(item);
    setModalOpen(true);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset ke halaman pertama saat melakukan pencarian
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, searchQuery]);

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
            <Search
              placeholder="Cari properti ..."
              buttonText="Cari"
              onSearch={handleSearch}
            />
          </HeaderSection>

          {/* Cards Section */}
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4">
                  {data.length > 0 ? (
                    data.map((item) => (
                      <div key={item.id}>
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
                          modalFile={() =>
                            handleModal(item.documents, item.id, "Document")
                          }
                          keterangan={
                            item.isAvailable ? "Tersedia" : "Tidak Tersedia"
                          }
                          modalGambar={() =>
                            handleModal(item.albums, item.id, "Gambar")
                          }
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
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
