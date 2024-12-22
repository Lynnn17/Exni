import React from "react";

const statusStyles = {
  INITIATE: { className: "bg-gray-200", text: "Diajukan" },
  PENDING: { className: "bg-blue-500 text-white", text: "Diproses" },
  APPROVED: { className: "bg-green-500 text-white", text: "Disetujui" },
  REJECTED: { className: "bg-red-500 text-white", text: "Ditolak" },
};

const StatusButton = ({ status }) => {
  const { className, text } = statusStyles[status] || statusStyles.process;

  return (
    <button
      className={`px-3 py-1 text-sm rounded-md w-max ${className}`}
      disabled
    >
      {text}
    </button>
  );
};

export default StatusButton;
