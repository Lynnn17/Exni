import React, { useState, useEffect } from "react"; // Import React dan useState
import StatusPengajuan from "../../reusable/StatusPengajuan";
import HeaderSection from "../../reusable/HeaderSection";
import SectionDivider from "../../reusable/SectionDivider";
import { Link, useNavigate } from "react-router-dom"; // Import untuk navigasi
import { FaInfoCircle } from "react-icons/fa"; // Import ikon Info
import StatusAlert, { StatusAlertService } from "react-status-alert"; // Import StatusAlert
import "react-status-alert/dist/status-alert.css"; // Import CSS StatusAlert
import axios from "axios";
import Loading from "../../reusable/Loading";
import Moment from "moment";
import { NumericFormat } from "react-number-format";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user_id } = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}applications/user/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.data.applications.applications);
      setData(response.data.data.applications.applications);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi untuk handle tombol Info
  function handleInfoClick(id) {
    navigate(`/user/submission/detail/${id}`); // Navigasi ke halaman detail
  }

  return (
    <main className="bg-gray-50">
      <StatusAlert />
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full p-4 bg-white mt-4 h-full rounded-lg">
          <HeaderSection title="Pengajuan" />
          <div className="pt-5 w-full bg-white border border-gray-200 mt-5 p-4">
            {data.length === 0 ? (
              <p className="text-center">Belum ada data</p>
            ) : (
              data?.map((item, index) => {
                const dataPengajuan = {
                  id: item?.id,
                  properti: item?.asset?.name,
                  jangkaWaktu: `${Moment(item.rent_start_date).format(
                    "D MMM YYYY "
                  )} - ${Moment(item.rent_end_date).format("D MMM YYYY ")}`, // Correct date formatting
                  nominal: (
                    <NumericFormat
                      value={item.proposed_price}
                      displayType="text"
                      thousandSeparator
                      prefix="Rp "
                      renderText={(value) => <div>{value}</div>} // Display formatted value
                    />
                  ), // Correctly formatted nominal
                  status: ["PENDING", "PROCESS", "APPROVED", "REJECTED"], // Daftar status
                  currentStatus: item?.status, // Status dari backend
                };

                return (
                  <div className="pb-10" key={index}>
                    <SectionDivider title={`PENGAJUAN ${index + 1}`} />
                    <div className="relative">
                      {/* Komponen StatusPengajuan */}
                      <div>
                        <StatusPengajuan data={dataPengajuan} />
                        {/* Tombol Info dalam card */}
                        <Link
                          to={`/user/submission/detail/${dataPengajuan.id}`}
                          className="absolute -top-1 md:top-2 right-2 text-blue-600 hover:text-blue-800 transition"
                          title="Info"
                        >
                          <FaInfoCircle size={20} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
