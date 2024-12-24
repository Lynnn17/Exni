import { Link } from "react-router-dom";
import React from "react";
const CardUserTenant = ({
  foto,
  title,
  address,
  deskripsi,
  linkPesan,
  linkDetail,
  isAvailable,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-xl w-full mb-2 ">
      <img
        src={foto}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <p className="text-base font-bold">{title}</p>
        <p className="pb-4 text-gray-600 text-sm">{address}</p>
        <p className="text-xs">{deskripsi}</p>
        <div className="py-4 pt-6">
          <div className="py-4 pt-6">
            {isAvailable ? ( // Kondisi untuk tombol aktif/nonaktif
              <Link
                className="bg-[#404C58] text-white px-4 py-2 font-bold text-xs rounded-2xl"
                to={linkPesan}
              >
                PESAN SEKARANG
              </Link>
            ) : (
              <button
                className="bg-gray-400 text-white px-4 py-2 font-bold text-xs rounded-2xl cursor-not-allowed"
                disabled
              >
                TIDAK TERSEDIA
              </button>
            )}
          </div>
        </div>
        {/* <div className="w-full h-[1px] bg-teks mt-2"></div> */}
        <div className="pt-3 text-center text-sm">
          <Link to={linkDetail}>Lihat Selengkapnya</Link>
        </div>
      </div>
    </div>
  );
};

export default CardUserTenant;
