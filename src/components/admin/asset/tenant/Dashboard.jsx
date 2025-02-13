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
import Loading from "../../../reusable/Loading";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState();
  const [typeModal, setTypeModal] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async (page = 1) => {
    setIsLoading(true);
    try {
      const queryParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : "";
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }assets?type=TENANT&page=${page}${queryParam}`,
        { headers }
      );

      const { assets, totalPages: total } = response.data.data.assets;
      setData(assets);
      console.log("res", data);
      setTotalPages(total);
    } catch (error) {
      console.error("Error fetching data:", error);
      StatusAlertService.showError("Gagal memuat data!");
    } finally {
      setIsLoading(false);
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
      fetchData(currentPage); // Refresh data setelah penghapusan
    } catch (error) {
      console.error("Error deleting data:", error);
      StatusAlertService.showError("Data gagal dihapus!");
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
            <Search
              placeholder="Cari tenant..."
              buttonText="Cari"
              onSearch={handleSearch}
            />
          </HeaderSection>

          {isLoading ? (
            <Loading />
          ) : (
            <>
              {data?.length === 0 ? (
                <p className="col-span-full text-center text-gray-500">
                  Tidak ada data tersedia.
                </p>
              ) : (
                <>
                  <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4">
                      {data?.map((item, i) => (
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

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </>
          )}

          <StatusAlert />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
