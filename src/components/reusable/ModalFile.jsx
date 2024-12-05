import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import LogoExni from "../../assets/logo/exni.svg";

const InfoLine = ({ label, value }) => (
  <div className="flex">
    <strong className="w-[10rem] text-sm">{label}</strong>
    <p className="text-sm">{value}</p>
  </div>
);

const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[26rem] relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
          onClick={onClose}
        >
          <IoCloseSharp />
        </button>
        <div className="flex justify-center items-center mb-4 pt-3 gap-5">
          <span className="text-sm font-medium">{data.id}</span>
          <img src={LogoExni} alt="Logo Exni" />
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Link Document</h3>
          <ul className="list-disc pl-4">
            {data.map(
              (item, index) => (
                console.log(item),
                (
                  <li key={index}>
                    <a
                      href={`https://drive.google.com/file/d/${item}/view`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline text-blue-600"
                    >
                      Document {index + 1}
                    </a>
                  </li>
                )
              )
            )}
          </ul>
          <div className="flex flex-col gap-1"></div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
