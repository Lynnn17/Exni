import Foto from "../../../../assets/gedung.png";
import CardBuilding from "../../../reusable/card/CardSewaBuilding";
import CardTenant from "../../../reusable/card/CardSewaTenant";
import Pagination from "../../Pagination";
import React, { useState, useEffect } from "react";
import HeaderSection from "../../../reusable/HeaderSection";
import Search from "../../../reusable/Search";
import SectionDivider from "../../../reusable/SectionDivider";
import axios from "axios";
import Loading from "../../../reusable/Loading";

const Dashboard = () => {
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
      console.log(response.data.data.rents);
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

          {isLoading ? ( // Jika sedang loading, tampilkan komponen Loading
            <Loading />
          ) : (
            <>
              <div className="pt-5">
                <SectionDivider
                  title="Aset Gedung"
                  classText="text-sm font-semibold uppercase text-teks"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 ">
                  {data?.rents?.map((item, i) => (
                    <CardBuilding
                      key={i}
                      foto={item.application.asset.albums[0]}
                      title={item.application.asset.name}
                      address={item.application.asset.properties.address}
                      noContract="2313/B2A3/123323 nunggu backend"
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
                    />
                  ))}
                </div>
                <Pagination />
              </div>

              <div className="pt-5">
                <SectionDivider
                  title="Aset Tenant"
                  classText="text-sm font-semibold uppercase text-teks"
                />
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
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
