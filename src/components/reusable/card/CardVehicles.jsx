import { FaRegFilePdf, FaRegFileImage, FaRegTrashAlt } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import React from "react";

const CardVehicles = ({
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
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <img
        src={foto}
        alt={title}
        className="w-full h-48 object-cover rounded-t-xl"
      />

      <div className="p-5 space-y-3">
        {/* Header */}
        <div>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{plat}</p>
          <p className="text-sm font-medium text-gray-700">{year}</p>
        </div>

        {/* Informasi Detail */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="font-semibold text-gray-600">Nomor Mesin</p>
            <p className="text-gray-700">{machine}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Nomor Rangka</p>
            <p className="text-gray-700">{frame}</p>
          </div>
        </div>

        <div className="flex gap-4 text-xl text-gray-600 justify-between pt-6">
          <div className="flex gap-4">
            <button onClick={modalGambar} className="hover:text-blue-500">
              <FaRegFileImage />
            </button>
            <button onClick={modalFile} className="hover:text-blue-500">
              <FaRegFilePdf />
            </button>
          </div>
          <div className="flex flex-row gap-4">
            <Link to={link} className="hover:text-yellow-500">
              <BsPencilSquare />
            </Link>
            <button
              onClick={modalDelete}
              className="text-red-500 hover:text-red-600"
            >
              <FaRegTrashAlt />
            </button>
          </div>
        </div>

        {/* )} */}
      </div>
    </div>
  );
};

export default CardVehicles;
