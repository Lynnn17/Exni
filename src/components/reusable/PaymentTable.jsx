import React, { useState } from "react";
import Loading from "./Loading";

import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import { Link } from "react-router-dom";
import { IoReceipt } from "react-icons/io5";
import { TbReceiptOff } from "react-icons/tb";
import StatusButton from "./StatusButton";

const PaymentTable = ({ data, modal }) => {
  const statusMapping = {
    APPROVED: "Disetujui",
    REJECTED: "Ditolak",
    INITIATE: "Perlu Dibayar",
  };

  if (!data) {
    return <Loading />;
  }

  return (
    <div>
      <StatusAlert />
      <div className="overflow-x-auto p-4">
        {/* Desktop View */}
        <table className="min-w-full border border-gray-200 text-sm text-left hidden md:table">
          <thead className="bg-gray-100">
            <tr className="text-xs">
              <th className="px-4 py-2 border-b">ID TRANSAKSI</th>
              <th className="px-4 py-2 border-b"> Transaksi</th>
              <th className="px-4 py-2 border-b">TANGGAL</th>
              <th className="px-4 py-2 border-b">PROGRES PEMBAYARAN</th>
              <th className="px-4 py-2 border-b">Catatan</th>
              <th className="px-4 py-2 border-b text-center">Bukti Transfer</th>
              <th className="px-4 py-2 border-b text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors text-xs border-b "
              >
                <td className="px-4 py-2 ">{item.id}</td>
                <td className="px-4 py-2  ">
                  Urutan KE - {item.number_of_trans}
                </td>
                <td className="px-4 py-2">{item.updatedAt}</td>
                <td className="px-4 py-2  ">
                  <span
                    className={`px-4 py-2 text-white text-xs font-bold rounded ${
                      item.status === "APPROVED"
                        ? "bg-green-500"
                        : item.status === "REJECTED"
                        ? "bg-red-500"
                        : item.status === "INITIATE"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {statusMapping[item.status] || item.status}
                  </span>
                </td>

                <td className="px-4 py-2">
                  <div>
                    <textarea
                      className="text-sm w-full border border-gray-300 rounded-md px-3 pt-2 text-gray-700 h-[12vh] lg:h-[20vh] xl:h-[12vh] overflow-y-scroll resize-none no-scrollbar"
                      rows={3}
                      readOnly
                      value={item.note}
                    />
                  </div>
                </td>
                <td className="">
                  {item?.receipt ? (
                    <Link
                      target="_blank"
                      className="p-2  text-black text-4xl font-bold rounded-full flex justify-center"
                      to={`${item.receipt}`}
                    >
                      <IoReceipt />{" "}
                    </Link>
                  ) : (
                    <span className="p-2  text-black text-4xl font-bold rounded-full flex justify-center">
                      <TbReceiptOff />
                    </span>
                  )}
                </td>
                <td className="px-4 py-2  ">
                  {item.status === "APPROVED" ? null : (
                    <>
                      <button
                        type="button"
                        onClick={() => modal(item)}
                        className="flex items-center justify-center  px-4 py-2 bg-blue-500 text-white text-xs font-bold rounded hover:bg-blue-600"
                      >
                        Bayar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile View */}
        <div className="block md:hidden">
          {data.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-md p-4 mb-4 bg-white"
            >
              <p className="text-xs font-bold">ID TRANSAKSI: {item.id}</p>
              <p className="text-xs ">
                Urutan Transaksi Ke: {item.number_of_trans}
              </p>
              <p className="text-xs">TANGGAL: {item.updatedAt}</p>

              <p className="text-xs flex">
                PROGRES PEMBAYARAN:
                <p
                  className={`font-bold ml-1 text-white text-xs font-bold rounded px-2 ${
                    item.status === "APPROVED"
                      ? "bg-green-500"
                      : item.status === "REJECTED"
                      ? "bg-red-500"
                      : item.status === "INITIATE"
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  }`}
                >
                  {statusMapping[item.status] || item.status}
                </p>
              </p>
              {item.status === "APPROVED" ? null : (
                <p>
                  <StatusButton status={item.status} />
                </p>
              )}
              <div className="mt-2">
                <textarea
                  value={item.note}
                  className="text-sm w-full border border-gray-300 rounded-md px-3 pt-2 text-gray-700 h-[12vh] lg:h-[20vh] xl:h-[12vh] overflow-y-scroll resize-none no-scrollbar"
                  rows={3}
                  readOnly
                />
              </div>
              <div className="mt-2 text-center flex justify-between">
                {item.status === "APPROVED" ? null : (
                  <button
                    type="button"
                    onClick={() => modal(item)}
                    className="px-4 py-2 bg-blue-500 text-white text-xs font-bold rounded hover:bg-blue-600"
                  >
                    Bayar
                  </button>
                )}
                {item?.receipt ? (
                  <Link
                    target="_blank"
                    className="p-2 bg-blue-500  text-white text-2xl font-bold rounded-full "
                    to={`https://drive.google.com/file/d/${item.receipt}/view`}
                  >
                    {" "}
                    <IoReceipt />{" "}
                  </Link>
                ) : (
                  <span className="p-2 bg-blue-500  text-black text-2xl font-bold rounded-full">
                    <TbReceiptOff />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentTable;
