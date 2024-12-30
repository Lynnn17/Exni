import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import CardBuilding from "../../../../reusable/card/CardSewaBuilding";
import Pagination from "../../../Pagination";
import HeaderSection from "../../../../reusable/HeaderSection";
import Search from "../../../../reusable/Search";
import SectionDivider from "../../../../reusable/SectionDivider";
import axios from "axios";
import Loading from "../../../../reusable/Loading";

const Dashboard = () => {
  const location = useLocation(); // Mendapatkan lokasi saat ini
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State untuk loading

  const fetchData = async () => {
    try {
      setIsLoading(true); // Mulai loading
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}rents?type=PROPERTY`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("res", response.data);
      setData(response.data.data.rents);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Tentukan apakah halaman saat ini adalah "Aset Tenant" atau "Gedung"
  const isTenantOrBuildingPage =
    location.pathname.includes("tenant") ||
    location.pathname.includes("gedung");

  return (
    <>
      <main>
        <div className="w-full p-4 bg-white mt-4 h-full rounded-lg">
          <HeaderSection
            title="Aset Sewa"
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            titleClass={isTenantOrBuildingPage ? "text-black" : "text-gray-500"} // Ubah warna berdasarkan halaman
          >
            <Search />
          </HeaderSection>

          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="pt-5">
                <SectionDivider
                  title="Aset Gedung"
                  classText="text-sm font-semibold uppercase text-teks"
                />
                <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
                  {data?.rents?.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                      <p>No assets available</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                      {data?.rents?.map((item, i) => (
                        <CardBuilding
                          key={i}
                          foto={item.application.asset.albums}
                          title={item.application.asset.name}
                          address={item.application.asset.properties.address}
                          noContract={item.no_contract || "-"}
                          price={item.total_price}
                          broad={
                            item.application.asset.properties.landArea +
                            "m x " +
                            item.application.asset.properties.buildingArea +
                            "m"
                          }
                          startDate={item.application.rent_start_date}
                          endDate={item.application.rent_end_date}
                          nameTenant={item.application.user.company}
                          link={`detail/${item.id}`}
                          informasi={item.information}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <Pagination />
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
