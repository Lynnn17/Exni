import React from "react";

const PaymentTable = ({ data }) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-200 text-sm text-left hidden md:table">
        <thead className="bg-gray-100">
          <tr className="text-xs">
            <th className="px-4 py-2 border-b">ID TRANSAKSI</th>
            <th className="px-4 py-2 border-b">TANGGAL</th>
            <th className="px-4 py-2 border-b">JENIS PEMBAYARAN</th>
            <th className="px-4 py-2 border-b">PROGRES PEMBAYARAN</th>
            <th className="px-4 py-2 border-b text-center">
              STATUS PEMBAYARAN
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-colors text-xs"
            >
              <td className="px-4 py-2 border-b">{item.id}</td>
              <td className="px-4 py-2 border-b">{item.date}</td>
              <td className="px-4 py-2 border-b">{item.type}</td>
              <td className="px-4 py-2 border-b">{item.progress}</td>
              <td className="px-4 py-2 border-b text-center">
                {item.isPaid ? (
                  <span className="px-4 py-2 bg-green-500 text-white text-xs font-bold rounded">
                    {item.status}
                  </span>
                ) : (
                  <button className="px-4 py-2 bg-red-500 text-white text-xs font-bold rounded hover:bg-red-600">
                    {item.status}
                  </button>
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
            <p className="text-xs">TANGGAL: {item.date}</p>
            <p className="text-xs">JENIS PEMBAYARAN: {item.type}</p>
            <p className="text-xs">PROGRES PEMBAYARAN: {item.progress}</p>
            <div className="mt-2">
              {item.isPaid ? (
                <span className="px-4 py-2 bg-green-500 text-white text-xs font-bold rounded">
                  {item.status}
                </span>
              ) : (
                <button className="px-4 py-2 bg-red-500 text-white text-xs font-bold rounded hover:bg-red-600">
                  {item.status}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentTable;
