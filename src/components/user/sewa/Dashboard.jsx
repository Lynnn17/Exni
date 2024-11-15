import Foto from "../../../../assets/gedung.png";
import Card from "../../../reusable/card/CardSewa";
import Pagination from "../../Pagination";
import React, { useState } from "react";
import HeaderSection from "../../../reusable/HeaderSection";

const Dashboard = () => {
  return (
    <>
      <main>
        <div className="w-full p-4 bg-white mt-4 h-full">
          <HeaderSection
            title="Asset Sewa"
            hiddenSearch="true
          "
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4">
            {Array.from(Array(10).keys()).map((_, i) => (
              <Card
                key={i}
                foto={Foto}
                title={`Gedung Pelni ${i + 1}`}
                address="Jl. Tunjungan Pahlwan 23123123, Surabaya"
                noContract="2313/B2A3/123323"
                price="16568"
                broad="16568m x 13231m"
                rentalPeriod="05 Agustus - 09 Oktober 2023"
                link={`detail/${i + 1}`}
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
