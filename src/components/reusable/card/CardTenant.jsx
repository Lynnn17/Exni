import { FaRegFilePdf } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import React from "react";
const CardTenant = ({
  foto,
  title,
  address,
  building,
  capacity,
  link,
  nameTenant,
  teksLink,
  modalFile,
  linkFile,
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
          <p>{building}</p>
          <p className="pt-2 text-xs font-medium">Jumlah lantai</p>
          <div className="pt-1 text-xs">
            <p>{capacity} Lantai</p>
          </div>
          {nameTenant ? (
            <div className="pt-2">
              <div className="w-full h-[1px] bg-teks mt-2"></div>
              <div className="pt-2">
                <h1 className="text-base">Penyewa:</h1>
                <div className="flex justify-between  ">
                  <p className="text-xs">{nameTenant}</p>
                  <p className="text-xs font-medium uppercase ">
                    <Link to={link}>Lihat Selengkapnya</Link>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-end  gap-2 text-exni pt-4">
              {teksLink ? (
                <Link
                  className="bg-[#404C58] text-white px-4 py-2 font-bold rounded-2xl flex items-center mx-auto text-xs"
                  to={link}
                >
                  {teksLink}
                </Link>
              ) : (
                <div className=" text-2xl flex items-center gap-2 text-exni">
                  <button onClick={() => modalFile(linkFile)}>
                    <FaRegFilePdf />
                  </button>
                  <Link to={link}>
                    <BsPencilSquare />
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardTenant;
