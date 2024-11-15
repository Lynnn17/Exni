import React, { useState } from "react";
import { Link } from "react-router-dom";
const CardHome = ({ foto, title, deskripsi, link }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="bg-white rounded-lg shadow-xl w-full mb-2 border border-gray-300  ">
      <div className="px-4 py-7">
        <img src={foto} alt={title} className="w-full h-48 object-cover " />
        <div className="py-4 px-1">
          <p className="text-base font-bold">{title}</p>
          <p
            className={`text-sm text-justify pr-4 ${
              !isExpanded ? "line-clamp-3" : ""
            }`}
          >
            {deskripsi}
          </p>
          <button
            onClick={toggleExpanded}
            className="text-blue-500 text-sm mt-2 hover:underline"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
        <Link
          to={link}
          className="uppercase font-semibold bg-gray-700 px-4 rounded-2xl py-2 text-xs text-white shadow-2xl"
        >
          Pesan Sekarang
        </Link>
      </div>
    </div>
  );
};

export default CardHome;
