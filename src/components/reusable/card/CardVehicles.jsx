import { FaRegFilePdf } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import React from "react";
const CardTenant = ({
  foto,
  title,
  plat,
  machine,
  year,
  frame,
  condition,
  link,
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
        <p className="text-sm">{plat}</p>
        <p className="pt-1 text-sm font-medium">{year}</p>
        <div className="pt-4">
          <p className=" text-md font-medium">Mobil</p>
          <div className="pt-3 grid grid-cols-2">
            <div>
              <p className="text-sm font-medium">Nomor Mesin</p>
              <p className="pt-1 text-xs">{machine}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Nomor Rangka</p>
              <p className="pt-1 text-xs">{frame}</p>
            </div>
          </div>
          <div className="flex justify-between items-center  gap-2  pt-6">
            <div className="text-sm font-medium">Kondisi {condition}</div>
            <div className="text-exni text-2xl">
              <Link to={link}>
                <BsPencilSquare />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTenant;
