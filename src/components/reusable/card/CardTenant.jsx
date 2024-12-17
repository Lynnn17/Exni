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
    <div className="bg-white rounded-lg shadow-xl w-full mb-2 ">
      <iframe
        src={`https://drive.google.com/file/d/${foto}/preview`}
        frameborder="0"
        className="w-full h-48 object-cover rounded-t-lg"
        allowFullScreen
        rel="noopener noreferrer"
      ></iframe>

      <div className="p-4">
        <p className="text-base font-bold">{name}</p>
        <p className="text-sm">{address}</p>
        <p className="pt-2 font-medium">Gedung</p>
        <p className="text-sm">{building}</p>
        <div className="pt-2">
          <p className="font-medium">Tenant</p>
          <p className="text-sm">{tenant}</p>
          <p className="pt-2 font-medium">Harga</p>
          <p className="text-sm">
            <NumericFormat
              value={harga}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp "}
            />
          </p>
          <p className="pt-2 font-medium">Jumlah Lantai</p>
          <div className="pt-1 text-sm">
            <p>{capacity} Lantai</p>
          </div>
          <p className="pt-2 font-medium">Keterangan</p>
          <div className="pt-1 text-sm">
            <p>{keterangan ? "Tersedia" : "Tidak Tersedia"}</p>
          </div>
          <div>
            <p className="pt-4 font-medium  ">Deskripsi</p>
            <p className="mt-2 text-sm w-full border border-gray-300 rounded-md px-3 pt-2 text-justify h-[12vh] overflow-y-scroll resize-none no-scrollbar">
              {deskripsi ? deskripsi : "-"}
            </p>
          </div>
          <div className="flex justify-end text-2xl gap-2 text-exni pt-5">
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
      </div>
    </div>
  );
};

export default CardTenant;
