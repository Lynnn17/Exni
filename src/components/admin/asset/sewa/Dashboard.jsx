import Foto from "../../../../assets/gedung.png";
import Card from "../../../reusable/card/CardSewa";
import CardTenant from "../../../reusable/card/CardTenant";
import CardVehicle from "../../../reusable/card/CardVehicles";
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
              <Card
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

          {/* <div className="pt-5">
            <SectionDivider
              title="Aset Kendaraan"
              classText="text-sm font-semibold uppercase text-teks"
            />
            <div className="pt-2 flex flex-col gap-2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 ">
            {Array.from(Array(3).keys()).map((_, i) => (
              <CardVehicle
                key={i}
                foto={Foto}
                title={`Paheho Sport OLd Edition ${i + 1}`}
                plat="F 610 M"
                year="2018"
                machine="JM51E1055436"
                frame="MH1jM511897070"
                nameTenant="PT. Kekasih Abadi"
                condition="Baik"
                link={`edit/${i + 1}`}
              />
            ))}
          </div> */}
          <Pagination />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
