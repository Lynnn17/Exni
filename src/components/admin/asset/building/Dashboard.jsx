import Foto from "../../../../assets/rumah.png";
import Card from "../../../reusable/card/CardBuilding";
import Pagination from "../../Pagination";
import React, { useState, useEffect } from "react";
import HeaderSection from "../../../reusable/HeaderSection";
import Search from "../../../reusable/Search";
import axios from "axios";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}assets?type=PROPERTY`,
        {
          headers,
        }
      );
      setData(response.data.data.assets);
    } catch (error) {
      console.error(error);
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
            subtitle="Gedung"
            linkTo="add"
            linkText="Tambah"
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
          >
            <Search />
          </HeaderSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4">
            {data.map(
              (item, i) => (
                console.log(item),
                (
                  <Card
                    key={i}
                    foto={item.albums}
                    title={item.name}
                    address={item.properties.address}
                    alokasi="Kantor Penjualan Tiket"
                    landSize="16568 m²"
                    buildingSize="13231 m²"
                    harga={item.price}
                    deskripsi={item.description}
                    link={`edit/${i + 1}`}
                  />
                )
              )
            )}
          </div>

          <Pagination />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
