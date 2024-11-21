import StatusPengajuan from "../../reusable/StatusPengajuan";
import HeaderSection from "../../reusable/HeaderSection";
import SectionDivider from "../../reusable/SectionDivider";
const Dashboard = () => {
  const dataPengajuan = {
    id: "13213121",
    properti: "Kapal Lawd",
    jangkaWaktu: "05 Agustus 2024 - 09 Oktober 2024",
    nominal: "Rp. 144.000.000,-",
    status: ["Pengajuan", "Proses", "Disetujui"], // Daftar status
    currentStatus: "Proses", // Status dari backend
  };
  return (
    <>
      <main>
        <div className="w-full p-4 bg-white mt-4 h-full">
          <HeaderSection title="Pengajuan" />
          <div className="pt-5 w-full bg-white border border-gray-200 mt-5 p-4">
            {dataPengajuan.status.map((status, index) => (
              <div className="pb-10" key={index}>
                <SectionDivider title={`PENGAJUAN ${index + 1}`} />
                <StatusPengajuan
                  data={{ ...dataPengajuan, currentStatus: status }}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
