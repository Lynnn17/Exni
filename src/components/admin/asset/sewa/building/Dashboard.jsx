import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import CardBuilding from "../../../../reusable/card/CardSewaBuilding";
import Pagination from "../../../Pagination";
import HeaderSection from "../../../../reusable/HeaderSection";
import Search from "../../../../reusable/Search";
import SectionDivider from "../../../../reusable/SectionDivider";
import axios from "axios";
import Loading from "../../../../reusable/Loading";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";

const Dashboard = () => {
  const location = useLocation(); // Mendapatkan lokasi saat ini
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State untuk loading

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async (page = 1) => {
    setIsLoading(true);
    try {
      const queryParam = searchQuery
        ? `&search=${encodeURIComponent(searchQuery)}`
        : "";
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }rents?type=PROPERTY&page=${page}${queryParam}`,
        { headers }
      );
      const { rents, totalPages: total } = response.data.data.rents;
      setData(rents);
      console.log("data", rents);
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

  // Tentukan apakah halaman saat ini adalah "Aset Tenant" atau "Gedung"
  const isTenantOrBuildingPage =
    location.pathname.includes("tenant") ||
    location.pathname.includes("gedung");

  return (
    <>
      <main>
        <StatusAlert />
        <div className="w-full p-4 bg-white mt-4 h-full rounded-lg">
          <HeaderSection
            title="Aset Sewa"
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            titleClass={isTenantOrBuildingPage ? "text-black" : "text-gray-500"} // Ubah warna berdasarkan halaman
          >
            <Search
              placeholder="Cari sewa properti ..."
              buttonText="Cari"
              onSearch={handleSearch}
            />
          </HeaderSection>

          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="pt-5">
                <SectionDivider
                  title="Aset Gedung"
                  classText="text-sm font-semibold uppercase text-teks"
                />
                <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
                  {data?.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                      <p>No assets available</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                      {data?.map((item, i) => (
                        <CardBuilding
                          key={i}
                          foto={item.application.asset.albums[0]}
                          title={item.application.asset.name}
                          address={item.application.asset.properties.address}
                          noContract={item.no_contract || "-"}
                          price={item.total_price}
                          broad={
                            item.application.asset.properties.landArea +
                            "m x " +
                            item.application.asset.properties.buildingArea +
                            "m"
                          }
                          startDate={item.application.rent_start_date}
                          endDate={item.application.rent_end_date}
                          nameTenant={item.application.user.company}
                          link={`detail/${item.id}`}
                          informasi={item.information}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
