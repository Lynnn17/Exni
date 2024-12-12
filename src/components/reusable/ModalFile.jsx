import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import LogoExni from "../../assets/logo/exni.svg";
import ModalEdit from "./ModalEditFile";

const Modal = ({ isOpen, onClose, idData, type, idFile }) => {
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);

  // // Fungsi untuk membuka modal edit
  const handleEdit = (id) => {
    setSelectedFile(id);
    setEditModalOpen(true);
  };

  // Jika modal tidak terbuka atau data tidak ada, jangan render apa pun
  if (!isOpen || !idFile) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[26rem] relative">
        {/* Tombol Close */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
          onClick={onClose}
        >
          <IoCloseSharp />
        </button>

        {/* Header */}
        <div className="flex justify-center items-center mb-4 pt-3 gap-5">
          <img src={LogoExni} alt="Logo Exni" />
        </div>

        {/* Daftar Data */}
        <div className="mb-4">
          <h3 className="font-semibold">Link {type}</h3>
          <ul className="list-disc pl-4 pt-2 max-h-[13rem] overflow-y-scroll">
            {idFile.map((item, index) => (
              <li key={index}>
                <div className="flex gap-2 items-center justify-between pr-6">
                  {/* Link ke file */}
                  <a
                    href={`https://drive.google.com/file/d/${item}/view`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline text-blue-600"
                  >
                    {type} {index + 1}
                  </a>

                  {/* Tombol Edit */}
                  <button
                    className="text-sm bg-blue-600 text-white px-2 py-1 rounded"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  {/* Tombol Delete */}
                  <button className="text-sm bg-red-600 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal Edit */}
      <ModalEdit
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        idData={idData}
        idFile={selectedFile}
        type={type}
      />
    </div>
  );
};

export default Modal;
