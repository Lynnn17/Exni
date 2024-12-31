import React, { useState, useEffect } from "react";
import CardUserTenant from "../../../reusable/card/CardUserTenant";
import HeaderSection from "../../../reusable/HeaderSection";
import Search from "../../../reusable/Search";
import axios from "axios";
import Pagination from "../../Pagination";
import Loading from "../../../reusable/Loading";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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
        }assets?type=TENANT&page=${page}${queryParam}`,
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
    <main>
      <div className="w-full p-4 bg-white mt-4 h-full rounded-lg">
        <HeaderSection
          title="Aset"
          subtitle="Tenant"
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
        >
          <Search
            placeholder="Cari properti ..."
            buttonText="Cari"
            onSearch={handleSearch}
          />
        </HeaderSection>

        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4">
                {data?.length > 0 ? (
                  data?.map((item) => (
                    <CardUserTenant
                      foto={
                        item.albums?.[0] || "https://via.placeholder.com/150"
                      }
                      title={item.name || "N/A"}
                      address={item.tenants.address || "N/A"}
                      deskripsi={item.description || "Tidak ada deskripsi"}
                      idAset={item.id}
                      linkDetail={`detail/${item.id}`}
                      linkPesan={`pesan/${item.id}`}
                      isAvailable={item.isAvailable}
                    />
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500">
                    Tidak ada data tersedia.
                  </p>
                )}
              </div>
            </div>
          </>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
};

export default Dashboard;
