import { Link } from "react-router-dom";
import React from "react";
const CardUserBuilding = ({
  foto,
  title,
  address,
  deskripsi,
  linkPesan,
  linkDetail,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-xl w-full mb-2">
      <img
        src={foto}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <p className="text-base font-bold">{title}</p>
        <p className="pb-4 text-gray-600 text-sm">{address}</p>
        {/* Deskripsi dengan ukuran tetap */}
        <div
          className="text-xs overflow-hidden"
          style={{
            display: "-webkit-box", // Mengaktifkan mode kotak fleksibel untuk teks
            WebkitBoxOrient: "vertical", // Mengatur orientasi kotak
            WebkitLineClamp: 3, // Batas jumlah baris
            overflow: "hidden", // Menyembunyikan teks yang melebihi batas
          }}
        >
          {deskripsi}
        </div>
        <div className="py-4 pt-6">
          <Link
            className="bg-[#404C58] text-white px-4 py-2 font-bold text-xs rounded-2xl"
            to={linkPesan}
          >
            PESAN SEKARANG
          </Link>
        </div>
        <div className="pt-3 text-center text-sm">
          <Link to={linkDetail}>Lihat Selengkapnya</Link>
        </div>
      </div>
    </div>
  );
};

export default CardUserBuilding;
