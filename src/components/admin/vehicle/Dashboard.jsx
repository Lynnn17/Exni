import Foto from "../../../assets/mobil.png";
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
            subtitle="Vihicles"
            linkTo="/tenants/add"
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
                title={`Paheho Sport OLd Edition ${i + 1}`}
                address="F 610 M"
                details={{
                  "Sales Office": "2018",
                  "Land Size": "16568",
                  "Building Size": "13231",
                  "Additional Info": "Custom Value",
                }}
                id={i + 1}
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
