import { FaRegFilePdf, FaRegFileImage, FaRegTrashAlt } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import React from "react";
import { NumericFormat } from "react-number-format";

const CardTenant = ({
  foto,
  name,
  address,
  tenant,
  capacity,
  link,
  deskripsi,
  building,
  harga,
  modalFile,
  keterangan,
  modalGambar,
  modalDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Foto Gedung */}
      <img
        src={foto}
        alt={name}
        className="w-full h-48 object-cover rounded-t-xl"
      />

      {/* Konten Card */}
      <div className="p-5 space-y-3">
        {/* Nama dan Alamat */}
        <div>
          <h3 className="text-lg font-bold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">{address}</p>
        </div>

        {/* Informasi Gedung */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="font-semibold text-gray-600">Gedung</p>
            <p className="text-gray-700">{building}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Tenant</p>
            <p className="text-gray-700">{tenant}</p>
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
            <p className="font-semibold text-gray-600">Jumlah Lantai</p>
            <p className="text-gray-700">{capacity} Lantai</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Keterangan</p>
            <p
              className={`${
                keterangan ? "text-green-600" : "text-red-600"
              } font-medium`}
            >
              {keterangan ? "Tersedia" : "Tidak Tersedia"}
            </p>
          </div>
        </div>

        {/* Deskripsi */}
        <div>
          <p className="font-semibold text-gray-600">Deskripsi</p>
          <div className="mt-1 text-sm text-gray-700 h-24 overflow-y-auto border border-gray-200 rounded-lg p-2">
            {deskripsi ? deskripsi : "-"}
          </div>
        </div>

        {/* Ikon Aksi */}
        <div className="flex justify-between items-center mt-4">
          {/* Ikon File dan Gambar */}
          <div className="flex space-x-4 text-xl text-gray-600">
            <button onClick={modalGambar} className="hover:text-blue-500">
              <FaRegFileImage />
            </button>
            <button onClick={modalFile} className="hover:text-blue-500">
              <FaRegFilePdf />
            </button>
          </div>

          {/* Edit dan Hapus */}
          <div className="flex space-x-4 text-xl">
            <Link to={link} className="text-yellow-500 hover:text-yellow-600">
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

export default CardTenant;
