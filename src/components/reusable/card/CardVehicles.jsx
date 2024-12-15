import { FaRegFilePdf, FaRegFileImage, FaRegTrashAlt } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import React from "react";
const CardTenant = ({
  type,
  foto,
  title,
  plat,
  machine,
  year,
  frame,
  condition,
  link,
  nameTenant,
  modalFile,
  modalGambar,
  modalDelete,
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
          <p className=" text-md font-medium">{type}</p>
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
            <div className="flex justify-between items-center  gap-2  pt-6">
              <div className="text-sm font-medium">Kondisi {condition}</div>
              <div className="text-exni text-2xl flex gap-2">
                <FaRegFileImage onClick={() => modalGambar()} />
                <button onClick={() => modalFile()}>
                  <FaRegFilePdf />
                </button>
                <Link to={link}>
                  <BsPencilSquare />
                </Link>
                <FaRegTrashAlt
                  onClick={() => modalDelete()}
                  className="text-red-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardTenant;
