import StatusPengajuan from "../../reusable/StatusPengajuan";
import HeaderSection from "../../reusable/HeaderSection";
import SectionDivider from "../../reusable/SectionDivider";
import { Link, useNavigate } from "react-router-dom"; // Import untuk navigasi
import { FaInfoCircle } from "react-icons/fa"; // Import ikon Info

const Dashboard = () => {
  const navigate = useNavigate(); // Inisialisasi fungsi navigasi

  const dataPengajuan = {
    id: "13213121",
    properti: "Kapal Lawd",
    jangkaWaktu: "05 Agustus 2024 - 09 Oktober 2024",
    nominal: "Rp. 144.000.000,-",
    status: ["Pengajuan", "Proses", "Disetujui"], // Daftar status
    currentStatus: "Proses", // Status dari backend
  };

  // Fungsi untuk handle tombol Info
  function handleInfoClick(id) {
    navigate(`/user/submission/detail/${id}`); // Navigasi ke halaman detail
  }

  return (
    <>
      <main>
        <div className="w-full p-4 bg-white mt-4 h-full">
          <HeaderSection title="Pengajuan" />
          <div className="pt-5 w-full bg-white border border-gray-200 mt-5 p-4">
            {dataPengajuan.status.map((status, index) => (
              <div className="pb-10" key={index}>
                <SectionDivider title={`PENGAJUAN ${index + 1}`} />
                <div className="relative">
                  {/* Komponen StatusPengajuan */}
                  <div>
                    <StatusPengajuan
                      data={{ ...dataPengajuan, currentStatus: status }}
                    />
                    {/* Tombol Info dalam card */}
                    <Link
                      to={`/user/submission/detail/${dataPengajuan.id}`}
                      className="absolute top-2 right-2 text-blue-600 hover:text-blue-800 transition"
                      title="Info"
                    >
                      <FaInfoCircle size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
