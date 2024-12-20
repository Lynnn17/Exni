import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import HeaderForm from "../../../reusable/HeaderForm";
import SectionDivider from "../../../reusable/SectionDivider";
import TenantInfo from "../../../reusable/TenantInfo";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [buildingData, setBuildingData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const endpoint = `${import.meta.env.VITE_API_URL}assets/${id}`;
      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBuildingData(response.data.data.asset);
    } catch (error) {
      console.error("Error fetching data:", error);
      StatusAlertService.showError("Gagal memuat data. Silakan coba lagi.");
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
      <div className="px-3 py-5 bg-white mt-4 rounded-lg">
        {/* Header */}
        <HeaderForm title="Detail Properti" link="/user/asset/building" />

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
          <div className="w-full md:col-span-2 mt-5">
            <Swiper
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="w-full h-full rounded-lg"
            >
              {buildingData?.albums && buildingData.albums.length > 0 ? (
                buildingData.albums.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={image}
                      alt={`Slide ${index + 1}`}
                    />
                  </SwiperSlide>
                ))
              ) : (
                <div className="text-center">Tidak ada gambar tersedia.</div>
              )}
            </Swiper>
          </div>

          {/* Informasi Properti */}
          <div className="w-full bg-white border border-gray-200 mt-5 p-4">
            <div className="md:flex md:gap-3">
              <div className="w-full">
                <SectionDivider title="Properti" />
                <div className="pt-2 flex flex-col gap-2">
                  <TenantInfo label="Nama" value={buildingData?.name || "-"} />
                  <TenantInfo label="Tipe" value={buildingData?.type || "-"} />
                  <TenantInfo
                    label="Alokasi"
                    value={buildingData.properties?.allocation || "-"}
                  />
                  <TenantInfo
                    label="Luas Tanah"
                    value={`${buildingData.properties?.landArea || 0} m²`}
                  />
                  <TenantInfo
                    label="Luas Gedung"
                    value={`${buildingData.properties?.buildingArea || 0} m²`}
                  />
                  <TenantInfo
                    label="Alamat"
                    value={buildingData.properties?.address || "-"}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Deskripsi Properti */}
          <div className="bg-white border border-gray-200 p-4 w-full md:col-span-3">
            <div className="w-full h-full">
              <SectionDivider title="Deskripsi" />
              <div className="pt-2">
                <p className="p-2 text-sm text-justify font-light">
                  {buildingData.description || "Deskripsi tidak tersedia."}
                </p>
                <div className="flex gap-2">
                  <button className="bg-red-500 py-2 px-4 text-white rounded-2xl">
                    <Link to={"/user/asset/building"}>Keluar</Link>
                  </button>
                  <button className="bg-[#404C58] py-2 px-4 text-white rounded-2xl">
                    <Link to={`/user/asset/building/pesan/${id}`}>
                      PESAN SEKARANG
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Detail;
