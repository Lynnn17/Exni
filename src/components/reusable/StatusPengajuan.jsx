import React from "react";

const StatusPengajuan = ({ data }) => {
  console.log("data", data);

  // Determine the set of statuses to display based on the currentStatus
  let filteredStatuses = ["PENDING", "PROCESS", "APPROVED"];
  if (data.currentStatus === "REJECTED") {
    filteredStatuses = ["PENDING", "PROCESS", "REJECTED"];
  }

  // Find the active status index
  const statusAktif =
    filteredStatuses.findIndex((status) => status === data.currentStatus) + 1;

  return (
    <div className="p-4 md:p-8 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="grid grid-cols-2 md:justify-between border-b pb-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Id Pengajuan</p>
          <p className="font-semibold text-gray-800">{data.id}</p>
          <p className="text-sm text-gray-500 mt-2">Properti</p>
          <p className="font-semibold text-gray-800">{data.properti}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Jangka Waktu</p>
          <p className="font-semibold text-gray-800">{data.jangkaWaktu}</p>
          <p className="text-sm text-gray-500 mt-2">Nominal</p>
          <p className="font-semibold text-gray-800">{data.nominal}</p>
        </div>
      </div>

      {/* Status Timeline */}
      <div>
        <p className="text-sm font-semibold text-gray-600 mb-4">
          Status Pengajuan
        </p>
        <div className="flex items-center justify-between relative">
          {/* Line */}
          <div className="absolute top-[0.8rem] left-0 w-full h-1 -translate-y-1/2 flex">
            {filteredStatuses.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 ${
                  index + 1 <= statusAktif
                    ? statusAktif === filteredStatuses.length &&
                      filteredStatuses[index] === "REJECTED"
                      ? "bg-red-500"
                      : "bg-purple-500"
                    : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>

          {/* Status Item */}
          {filteredStatuses.map((status, index) => (
            <div
              key={index}
              className={`relative z-1 flex flex-col items-center ${
                index + 1 <= statusAktif
                  ? status === "REJECTED"
                    ? "text-red-500"
                    : "text-purple-500"
                  : "text-gray-600"
              }`}
            >
              <div
                className={`w-6 h-6 ${
                  index + 1 <= statusAktif
                    ? status === "REJECTED"
                      ? "bg-red-500"
                      : "bg-purple-500"
                    : "bg-gray-300"
                } rounded-full flex items-center justify-center`}
              >
                <span className="w-3 h-3 bg-white rounded-full"></span>
              </div>
              <p className="mt-2 text-sm">{status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusPengajuan;
