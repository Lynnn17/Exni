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
import Loading from "../../../reusable/Loading";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const [typeModal, setTypeModal] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchData = async (page = 1) => {
    setIsLoading(true);
    try {
      const queryParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : "";
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }assets?type=VEHICLE&page=${page}${queryParam}`,
        { headers }
      );

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

  const handleModalFile = (item, id, type) => {
    setTypeModal(type);
    setSelectedData(item);
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}assets/${selectedId}`,
        {
          headers,
        }
      );
      setConfirmModalOpen(false);
      setIsLoading(false);
      StatusAlertService.showSuccess("Data berhasil dihapus!");
      fetchData(currentPage);
    } catch (error) {
      setIsLoading(false);
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
            <Search
              placeholder="Cari kenadaraan ..."
              buttonText="Cari"
              onSearch={handleSearch}
            />
          </HeaderSection>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {data?.length === 0 ? (
                <div className="text-center text-gray-500">
                  Data tidak ditemukan
                </div>
              ) : (
                <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4">
                    {data?.map((item, i) => (
                      <Card
                        key={item.id || i} // Use unique key for better re-rendering
                        foto={item.albums?.[0] || ""}
                        title={item.name || "N/A"}
                        plat={item.vehicles?.no_police || "N/A"}
                        type={""} // Placeholder for type
                        year={item.vehicles?.year || "N/A"}
                        machine={item.vehicles?.no_police || "N/A"}
                        frame={item.vehicles?.no_frame || "N/A"}
                        condition={""} // Placeholder for condition
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
                </div>
              )}

              {/* Modal for File */}
              <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                data={selectedData}
                idFile={selectedData}
                idData={selectedId}
                type={typeModal}
              />

              {/* Confirmation Modal */}
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
