import React from "react";
import { IoMdClose } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { IoDownloadOutline } from "react-icons/io5";

const PaymentModal = ({ isOpen, onClose, payments }) => {
  if (!isOpen) return null; // Jangan render jika modal tidak terbuka

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[26rem] rounded-lg shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Status Pembayaran</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoMdClose />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4">
          <p className="text-sm text-gray-600">
            <span className="font-bold">Lunas / Cicilan</span> 6x
          </p>
          <div className="mt-4">
            <button className="text-sm bg-gray-200 px-3 py-1 rounded-md">
              All
            </button>
            <ul className="mt-4 space-y-3">
              {payments.map((payment) => (
                <li
                  key={payment.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="text-sm font-medium">{payment.name}</p>
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full ">
                      {payment.status}
                    </span>
                    <p className="text-sm font-semibold">
                      Rp. {payment.amount.toLocaleString("id-ID")},-
                    </p>
                    <div className="flex gap-2">
                      <button className="text-purple-500 hover:text-purple-700 text-xl">
                        <IoEye />
                      </button>
                      <button className="text-purple-500 hover:text-purple-700 text-xl">
                        <IoDownloadOutline />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
      </div>
    </div>
  );
};

export default PaymentModal;
