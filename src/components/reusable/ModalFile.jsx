import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import LogoExni from "../../assets/logo/exni.svg";
import ModalEdit from "./ModalEditFile";

const Modal = ({ isOpen, onClose, data, type }) => {
  const [editModalOpen, setEditModalOpen] = React.useState(false);

  const handleEdit = (id) => {
    setIdData(id);
    setEditModalOpen(true);
  };

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
          <h3 className="font-semibold">Link {type}</h3>
          <ul className="list-disc pl-4 pt-2 max-h-[13rem] overflow-y-scroll">
            {data.map((item, index) => (
              <li key={index}>
                <div className="flex gap-2 items-center justify-between pr-6">
                  <a
                    href={`https://drive.google.com/file/d/${item}/view`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline text-blue-600"
                  >
                    {type} {index + 1}
                  </a>
                  <button
                    className="text-sm  bg-blue-600 text-white px-2 py-1 rounded"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button className="text-sm  bg-red-600 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-1"></div>
        </div>
      </div>
      <ModalEdit
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        data={idData}
        type={type}
      />
    </div>
  );
};

export default Modal;
