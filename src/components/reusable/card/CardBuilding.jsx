import { FaRegFilePdf, FaRegFileImage, FaRegTrashAlt } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import React from "react";
import { NumericFormat } from "react-number-format";

const CardBuilding = ({
  foto,
  title,
  address,
  alokasi,
  landSize,
  buildingSize,
  link,
  deskripsi,
  harga,
  modalFile,
  keterangan,
  modalGambar,
  modalDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <img
        src={foto}
        alt={title}
        className="w-full h-48 object-cover rounded-t-xl"
        loading="lazy"
      />

      <div className="p-5 space-y-3">
        {/* Header */}
        <div>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{address}</p>
        </div>

        {/* Informasi Properti */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="font-semibold text-gray-600">Alokasi</p>
            <p className="text-gray-700">{alokasi}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Harga</p>
            <p className="text-gray-700">
              <NumericFormat
                value={harga}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
              />
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Luas Tanah & Bangunan</p>
            <p className="text-gray-700">
              {landSize} m² x {buildingSize} m²
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Keterangan</p>
            <p
              className={`${
                keterangan === "Tersedia" ? "text-green-600" : "text-red-600"
              } font-medium`}
            >
              {keterangan}
            </p>
          </div>
        </div>

        {/* Deskripsi */}
        <div>
          <p className="font-semibold text-gray-600">Deskripsi</p>
          <div className="mt-1 text-sm text-gray-700 h-20 overflow-y-auto border border-gray-200 rounded-lg p-2">
            {deskripsi ? deskripsi : "-"}
          </div>
        </div>

        {/* Ikon Aksi */}
        <div
          className="flex justify-between
         gap-4 text-xl text-gray-600"
        >
          <div className="flex items-center gap-3">
            <button onClick={modalGambar} className="hover:text-blue-500">
              <FaRegFileImage />
            </button>
            <button onClick={modalFile} className="hover:text-blue-500">
              <FaRegFilePdf />
            </button>
          </div>
          <div className="flex items-center gap-3">
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
      </div>
    </div>
  );
};

export default CardBuilding;
