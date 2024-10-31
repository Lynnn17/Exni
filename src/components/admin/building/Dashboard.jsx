import Foto from "../../../assets/rumah.png";
import Card from "../../reusable/CardAsset";
import Pagination from "../../reusable/Pagination";
import React, { useState } from "react";
import HeaderSection from "../../reusable/HeaderSection";
import Search from "../../reusable/Search";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <main>
        <div className="w-full p-4 bg-white mt-4 h-full">
          <HeaderSection
            title="Assets"
            subtitle="Buildings"
            linkTo="/buildings/add"
            linkText="Add"
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
                title={`Rumah Terbalik ${i + 1}`}
                address="Jl. Masjid Besar Band Nera 34245 JAKARTA"
                salesOffice="Kantor Penjualan Tiket"
                landSize="16568"
                buildingSize="13231"
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
