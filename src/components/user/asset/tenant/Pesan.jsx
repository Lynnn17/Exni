import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderForm from "../../../reusable/HeaderForm";
import SectionDivider from "../../../reusable/SectionDivider";
import TenantInfo from "../../../reusable/TenantInfo";
import FormPesan from "../../../reusable/FormPesan";
import axios from "axios";

const Pesan = () => {
  const { id } = useParams(); // Mengambil ID dari parameter URL
  const [buildingData, setBuildingData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const endpoint = `${import.meta.env.VITE_API_URL}assets/${id}`;
      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBuildingData(response.data.data.asset); // Pastikan struktur data sama dengan `Detail.jsx`
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!buildingData) return <div>Data tidak ditemukan.</div>;

  return (
    <main>
      <div className="w-full px-3 py-5 bg-white mt-4 h-full rounded-lg">
        <HeaderForm title="Pengajuan" link="/user/asset/tenant" />
        <div className="flex flex-wrap gap-2">
          {/* Gambar Properti */}
          <div className="w-full md:w-[33.8%] mt-5">
            {buildingData?.albums && buildingData.albums.length > 0 ? (
              <img
                className="w-full h-full object-cover rounded-lg"
                src={buildingData.albums[0]} // Ambil gambar pertama
                alt={buildingData.name || "Properti"}
              />
            ) : (
              <div className="text-center">Tidak ada gambar tersedia.</div>
            )}
          </div>
          {/* Informasi Properti */}
          <div className="w-full md:w-[65%] bg-white border border-gray-200 mt-5 p-4">
            <div className="md:flex md:gap-3">
              <div className="w-full">
                <SectionDivider title="Properti" />
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="pt-2 flex flex-col gap-2">
                    <TenantInfo
                      label="Nama"
                      value={buildingData?.name || "Tidak diketahui"}
                    />
                    <TenantInfo
                      label="Tipe"
                      value={buildingData?.type || "-"}
                    />
                    <TenantInfo
                      label="Gedung"
                      value={buildingData?.tenants?.building || "-"}
                    />
                    <TenantInfo
                      label="Lantai"
                      value={buildingData?.tenants?.floor || "-"}
                    />
                  </div>
                  <div className="pt-2 gap-2 flex flex-col">
                    <TenantInfo
                      label="Alamat"
                      value={buildingData?.tenants?.address || "-"}
                    />
                    <TenantInfo
                      label="Harga"
                      value={
                        `Rp. ${buildingData?.price?.toLocaleString(
                          "id-ID"
                        )},-` || "-"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Pesan */}
          <div className="bg-white border border-gray-200 mt-5 p-4 w-full">
            <div className="w-full h-full">
              <FormPesan />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Pesan;
