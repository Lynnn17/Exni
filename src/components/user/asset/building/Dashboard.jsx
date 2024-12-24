import React, { useState, useEffect } from "react";
import CardUserBuilding from "../../../reusable/card/CardUserBuilding";
import HeaderSection from "../../../reusable/HeaderSection";
import Search from "../../../reusable/Search";
import axios from "axios";
import Pagination from "../../Pagination";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <div className="w-full p-4 bg-white mt-4 h-full rounded-lg">
        <HeaderSection
          title="Aset"
          subtitle="Gedung"
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
        >
          <Search />
        </HeaderSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4">
          {data?.assets?.length > 0 ? (
            data?.assets?.map((item) => (
              <CardUserBuilding
                foto={item.albums?.[0] || "https://via.placeholder.com/150"}
                title={item.name || "N/A"}
                address={item.properties?.address || "N/A"}
                deskripsi={item.description || "Tidak ada deskripsi"}
                idAset={item.id}
                isAvailable={item.isAvailable}
                linkDetail={`detail/${item.id}`}
                linkPesan={`pesan/${item.id}`}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Tidak ada data tersedia.
            </p>
          )}
        </div>

        <Pagination />
      </div>
    </main>
  );
};

export default Dashboard;
