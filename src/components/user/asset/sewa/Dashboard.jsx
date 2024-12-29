import React, { useState, useEffect } from "react";
import CardTenant from "../../../reusable/card/CardSewaTenant";
import Pagination from "../../Pagination";
import HeaderSection from "../../../reusable/HeaderSection";
import Search from "../../../reusable/Search";
import SectionDivider from "../../../reusable/SectionDivider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import Loading from "../../../reusable/Loading";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const { user_id } = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}rents/user/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.data.rents.rents);
      setData(response.data.data.rents.rents);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main>
        <StatusAlert />
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
          {loading ? (
            <Loading />
          ) : data.length === 0 ? ( // Hapus {} di sekitar data?.length === 0
            <div className="text-center mt-5">Data tidak ditemukan.</div>
          ) : (
            <>
              <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {data?.map(
                    (item, i) => (
                      // item ? (
                      <CardTenant
                        key={i}
                        foto={item?.application?.asset?.albums}
                        name={item?.application?.asset?.name}
                        address={item?.application?.asset?.tenants?.address}
                        tenant={item?.application?.asset?.tenants?.tenant}
                        capacity={item?.application?.asset?.tenants?.floor}
                        building={item?.application?.asset?.tenants?.building}
                        price={item?.total_price}
                        noContract={item?.no_contract}
                        link={`detail/${item.id}`}
                        startDate={item?.application?.rent_start_date}
                        endDate={item?.application?.rent_end_date}
                        informasi={item?.information}
                      />
                    )
                    // ) : (
                    //   <CardBuilding
                    //     key={i}
                    //     foto={Foto}
                    //     title={item.name}
                    //     address={item.tenants.address}
                    //     noContract="2313/B2A3/123323"
                    //     price="16568"
                    //     broad="16568m x 13231m"
                    //     rentalPeriod="05 Agustus - 09 Oktober 2023"
                    //     teksLink={"Lihat Detail Tagihan Dan Aset"}
                    //     link={`detail/${i + 1}`}
                    //   />
                    // )
                  )}
                </div>
              </div>

              <Pagination />
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
