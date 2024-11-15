import { FaRegFilePdf } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import React from "react";
const CardTenant = ({
  foto,
  title,
  address,
  noContract,
  price,
  broad,
  link,
  rentalPeriod,
  nameTenant,
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
        <p className="text-sm">{address}</p>
        <div className="pt-4">
          <p className="pt-2 text-xs font-medium">Nomor Kontrak</p>
          <div className="pt-1 text-xs">
            <p>{noContract}</p>
          </div>
          <p className="pt-2 text-xs font-medium">Kapasitas Ruangan</p>
          <div className="pt-1 text-xs">
            <p>{price}</p>
          </div>
          <p className="pt-2 text-xs font-medium">Luas Tanah & Bangunan</p>
          <div className="pt-1 text-xs">
            <p>{broad}</p>
          </div>
          <p className="pt-2 text-xs font-medium">Masa Sewa</p>
          <div className="pt-1 text-xs">
            <p>{rentalPeriod}</p>
          </div>
          <div className="pt-5 pb-1">
            <div className="w-full h-[1px] bg-teks mt-2"></div>
            {nameTenant ? (
              <div className="pt-3">
                <h1 className="text-base">Penyewa:</h1>
                <div className="flex justify-between  ">
                  <p className="text-xs">{nameTenant}</p>
                  <p className="text-xs font-medium uppercase ">
                    <Link to={link}>Lihat Selengkapnya</Link>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center  pt-4">
                <p className="text-xs font-medium uppercase ">
                  <Link to={link}>Lihat Selengkapnya</Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTenant;
