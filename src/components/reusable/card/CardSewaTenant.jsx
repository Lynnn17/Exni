import { Link } from "react-router-dom";
import React from "react";
import { NumericFormat } from "react-number-format";
import Moment from "moment";
const CardTenant = ({
  foto,
  name,
  address,
  tenant,
  capacity,
  link,
  informasi,
  building,
  harga,
  startDate,
  endDate,
  nameTenant,
  noContract,
  teksLink = "Lihat Selengkapnya",
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
            <p className="font-semibold text-gray-600">Nomor Kontrak</p>
            <p className="text-gray-700">{noContract || "-"}</p>
          </div>
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
            <p className="font-semibold text-gray-600">Masa Sewa</p>
            <div className="text-gray-700">
              <p>
                {Moment(startDate).format("DD MMMM YYYY")} -{" "}
                {Moment(endDate).format("DD MMMM YYYY")}
              </p>
            </div>
          </div>
        </div>

        {/* informasi */}
        <div>
          <p className="font-semibold text-gray-600">Informasi</p>
          <div className="mt-1 text-sm text-gray-700 h-24 overflow-y-auto border border-gray-200 rounded-lg p-2">
            {informasi ? informasi : "-"}
          </div>
        </div>

        {/* Ikon Aksi */}
        <div className="pt-5 pb-1">
          {nameTenant ? (
            <>
              <div className="w-full h-[1px] bg-teks mt-2"></div>
              <div className="pt-3">
                <h1 className="text-base">Penyewa:</h1>
                <div className="flex justify-between  ">
                  <p className="text-xs">{nameTenant}</p>
                  <p className="text-xs font-medium uppercase ">
                    <Link to={link}>Lihat Selengkapnya</Link>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center  py-3">
              <p className="text-xs font-medium uppercase ">
                <Link
                  className="bg-[#404C58] text-white px-4 py-2 font-bold rounded-2xl"
                  to={link}
                >
                  {teksLink}
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardTenant;
