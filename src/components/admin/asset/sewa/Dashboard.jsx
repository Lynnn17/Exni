import Foto from "../../../../assets/gedung.png";
import CardBuilding from "../../../reusable/card/CardSewaBuilding";
import CardTenant from "../../../reusable/card/CardSewaTenant";
import Pagination from "../../Pagination";
import React, { useState } from "react";
import HeaderSection from "../../../reusable/HeaderSection";
import Search from "../../../reusable/Search";
import SectionDivider from "../../../reusable/SectionDivider";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <main>
        <div className="w-full p-4 bg-white mt-4 h-full rounded-lg">
          <HeaderSection
            title="Aset Sewa"
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
          >
            <Search />
          </HeaderSection>
          <div className="pt-5">
            <SectionDivider
              title="Aset Gedung"
              classText="text-sm font-semibold uppercase text-teks"
            />
            <div className="pt-2 flex flex-col gap-2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 ">
            {Array.from(Array(3).keys()).map((_, i) => (
              <CardBuilding
                key={i}
                foto={Foto}
                title={`Gedung Pelni ${i + 1}`}
                address="Jl. Tunjungan Pahlwan 23123123, Surabaya"
                noContract="2313/B2A3/123323"
                price="16568"
                broad="16568m x 13231m"
                rentalPeriod="05 Agustus - 09 Oktober 2023"
                nameTenant="PT. Kekasih Abadi"
                link={`detail/${i + 1}`}
              />
            ))}
          </div>
          <Pagination />

          <div className="pt-5">
            <SectionDivider
              title="Aset Tenant"
              classText="text-sm font-semibold uppercase text-teks"
            />
            <div className="pt-2 flex flex-col gap-2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 ">
            {Array.from(Array(3).keys()).map((_, i) => (
              <CardTenant
                key={i}
                foto={Foto}
                title={`Kabin Kapal Arunika Samudera ${i + 1}`}
                address="PT Pelni JAKARTA"
                alokasi="Kabin Kapal"
                capacity="16568"
                nameTenant="PT. Kekasih Abadi"
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
