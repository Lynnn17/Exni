import React from "react";

const CardNotif = ({ notifications }) => {
  return (
    <div className="mt-4">
      {notifications.map((notif, index) => (
        <div
          key={index}
          className={`p-4 rounded-md ${
            notif.isRead ? "bg-gray-100" : "bg-blue-50"
          } shadow-sm mb-2 flex flex-row items-start`}
        >
          <div className="mr-4">
            <img
              src={notif.icon}
              alt="Notification Icon"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div>
            <p className="text-sm font-medium">{notif.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {notif.date}, {notif.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardNotif;
