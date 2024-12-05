import React from "react";

const statusStyles = {
  paid: { className: "bg-gray-200", text: "Paid" },
  unpaid: { className: "bg-red-500 text-white", text: "Unpaid" },
  process: { className: "bg-blue-500 text-white", text: "Process" },
};

const StatusButton = ({ status }) => {
  const { className, text } = statusStyles[status] || statusStyles.process;

  return (
    <button
      className={`px-3 py-1 text-sm rounded-md w-[5rem] ${className}`}
      disabled
    >
      {text}
    </button>
  );
};

export default StatusButton;
