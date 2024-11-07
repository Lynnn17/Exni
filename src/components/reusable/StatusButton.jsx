import React from "react";

const statusStyles = {
  paid: { className: "bg-green-500 text-white", text: "Paid" },
  unpaid: { className: "bg-yellow-500 text-white", text: "Unpaid" },
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
