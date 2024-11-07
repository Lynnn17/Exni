import React from "react";
import Foto from "../../../assets/mobil.png";
import Card from "../../reusable/card/CardVehicles";
import Pagination from "../../Pagination";
import { useState } from "react";
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
            subtitle="Vehicles"
            linkTo="/vehicles/add"
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
                plat="F 610 M"
                year="2018"
                machine="JM51E1055436"
                frame="MH1jM511897070"
                condition="Baik"
                link={`/vehicles/edit/${i + 1}`}
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
