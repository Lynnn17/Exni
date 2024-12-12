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
  const [idFile, setIdFile] = useState(null);
  const [idData, setIdData] = useState(null);
  const [typeModal, setTypeModal] = useState(null);

  // Retrieve token from localStorage
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}assets?type=PROPERTY`,
        { headers }
      );
      console.log(response.data.data.assets);
      setData(response.data.data.assets);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle opening the "File" modal
  const handleModalFile = (item, id) => {
    setTypeModal("Document");
    setIdData(id);
    setIdFile(item);
    setModalOpen(true);
  };

  // Handle opening the "Image" modal
  const handleModalGambar = (item, id) => {
    setTypeModal("Gambar");
    setIdData(id);
    setIdFile(item);
    setModalOpen(true);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main>
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
            {data.length > 0 ? (
              data.map((item, i) => (
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
                    linkFile={item.documents || []}
                    keterangan={
                      item.isAvailable ? "Tersedia" : "Tidak Tersedia"
                    }
                    modalGambar={() => handleModalGambar(item.albums, item.id)}
                    linkGambar={item.albums || []}
                    idData={item.id}
                  />
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                Tidak ada data tersedia.
              </p>
            )}
          </div>

          {/* Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            idFile={idFile}
            idData={idData}
            type={typeModal}
          />

          {/* Pagination */}
          <Pagination />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
