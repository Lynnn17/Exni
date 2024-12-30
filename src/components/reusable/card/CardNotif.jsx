import React from "react";

const CardNotif = ({ notifications }) => {
  return (
    <div className="mt-4">
      {notifications.map((notif, index) => (
        <div
          key={index}
          className={`p-4 rounded-md ${
            notif.isReadByUser ? "bg-gray-100" : "bg-blue-50"
          } shadow-sm mb-2 flex flex-row items-start`}
        >
          <div>
            <p className="text-sm font-bold">{notif.title}</p>
            <p className="text-sm font-normal">{notif.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(notif.createdAt).toLocaleDateString()},{" "}
              {new Date(notif.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardNotif;
