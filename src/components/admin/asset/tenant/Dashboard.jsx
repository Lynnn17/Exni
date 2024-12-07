import Foto from "../../../../assets/ruangan.png";
import Card from "../../../reusable/card/CardTenant";
import Pagination from "../../Pagination";
import React, { useState, useEffect } from "react";
import HeaderSection from "../../../reusable/HeaderSection";
import Search from "../../../reusable/Search";
import axios from "axios";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
  const [isOpen, setIsOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}assets?type=TENANT`,
        {
          headers,
        }
      );
      console.log(response.data.data.assets);
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
        <div className="w-full p-4 bg-white mt-4 h-full">
          <HeaderSection
            title="Aset"
            subtitle="Tenants"
            linkTo="add"
            linkText="Tambah"
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
          >
            <Search />
          </HeaderSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4">
            {Array.from(Array(10).keys()).map((_, i) => (
              <Card
                key={i}
                foto={Foto}
                title={`Kabin Kapal Arunika Samudera ${i + 1}`}
                address="PT Pelni JAKARTA"
                alokasi="Kabin Kapal"
                capacity="16568"
                link={`edit/${i + 1}`}
              />
            ))}
          </div>
          <Pagination />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
