import { FaRegFilePdf } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
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
}) => {
  const fileId = "1ihoej9r8Ase-i3ToB10XSWpdlyZBJ0XZ"; // Ganti dengan ID file Anda
  const imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

  return (
    <div className="bg-white rounded-lg shadow-xl w-full mb-2 ">
      <img
        src="https://drive.google.com/thumbnail?id=1ihoej9r8Ase-i3ToB10XSWpdlyZBJ0XZ&sz=w1000"
        alt="Image"
        // crossOrigin="anonymous"
      />

      <div className="p-4">
        <p className="text-base font-bold">{title}</p>
        <p className="text-sm">{address}</p>
        <div className="pt-4">
          <p className="font-medium">Alokasi</p>
          <p className="text-sm">{alokasi}</p>
          <p className="pt-2 font-medium">Harga</p>
          <p className="text-sm">
            <NumericFormat
              value={harga}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp "}
            />
          </p>
          <p className="pt-2 font-medium">Luas Tanah & Bangunan</p>
          <div className="pt-1 text-sm">
            <p>
              {landSize} x {buildingSize}
            </p>
          </div>
          <div>
            <p className="pt-4 font-medium  ">Deskripsi</p>
            <p className="mt-2 text-sm w-full border border-gray-300 rounded-md px-3 pt-2 text-justify h-[12vh] overflow-y-scroll resize-none no-scrollbar">
              {deskripsi ? deskripsi : "-"}
            </p>
          </div>
          <div className="flex justify-end text-2xl gap-2 text-exni pt-5">
            <FaRegFilePdf />
            <Link to={link}>
              <BsPencilSquare />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBuilding;
