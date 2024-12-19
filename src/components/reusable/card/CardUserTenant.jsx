import { Link } from "react-router-dom";
import React from "react";

const CardUserTenant = ({ foto, title, deskripsi, idAset }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl w-full mb-2 ">
      <img
        src={foto}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <p className="text-base font-bold">{title}</p>
        <p className="text-sm mt-2">{deskripsi}</p>
        <div className="py-4">
          <Link
            className="bg-[#404C58] text-white px-4 py-2 font-bold text-xs rounded-2xl"
            to={`/user/asset/building/pesan/${idAset}`}
          >
            PESAN SEKARANG
          </Link>
        </div>
        <div className="w-full h-[1px] bg-teks mt-2"></div>
        <div className="pt-3 text-center">
          <Link to={`/user/asset/building/detail/${idAset}`}>
            Lihat Selengkapnya
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardUserTenant;
