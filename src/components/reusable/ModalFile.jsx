import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import LogoExni from "../../assets/logo/exni.svg";
import ModalEdit from "./ModalEditFile";

import ModalAdd from "./ModalAddFile";
import ModalConfirm from "./ConfirmationModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Modal = ({
  isOpen,
  onClose,
  idData,
  type,
  style = "assets",
  idFile = null,
}) => {
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState("");

  const navigate = useNavigate();

  const handleEdit = (id) => {
    setSelectedFile(id);
    setEditModalOpen(true);
  };

  let typeEdit;

  console.log("type", type);
  if (type === "Document") {
    typeEdit = "document";
  } else if (type === "proposal") {
    typeEdit = "proposal";
  } else if (type === "minutesOfMeeting") {
    typeEdit = "minutesOfMeeting";
  } else {
    typeEdit = "albums";
  }
  const handleDelete = async () => {
    const formData = new FormData();
    if (typeEdit === "albums") {
      formData.append("deletedAlbumIds[0]", selectedFile);
    } else if (typeEdit === "document") {
      formData.append("deletedDocumentIds[0]", selectedFile);
    } else {
      console.error("Tipe file tidak valid");
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}assets/${idData}/${typeEdit}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onClose();
      navigate(0);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  if (!isOpen || !idFile) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[26rem] relative">
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
          <div className="flex justify-between items-center pb-2">
            <h3 className="font-semibold">Link {type}</h3>
            {style === "assets" && (
              <button
                className="text-sm bg-blue-800 text-white px-2 py-1 rounded"
                onClick={() => setAddModalOpen(true)}
              >
                Tambah
              </button>
            )}
            {idFile.length === 0 && style !== "assets" && (
              <button
                className="text-sm bg-blue-800 text-white px-2 py-1 rounded"
                onClick={() => setAddModalOpen(true)}
              >
                Tambah
              </button>
            )}
          </div>
          <ul className="list-disc pl-4 pt-2 max-h-[13rem] overflow-y-scroll">
            {idFile.map((item, index) => (
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

                  {/* Tombol Edit */}

                  <button
                    className="text-sm bg-blue-600 text-white px-2 py-1 rounded"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  {/* Tombol Delete */}
                  {style === "assets" ? (
                    <button
                      className="text-sm bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => {
                        setConfirmModalOpen(true);
                        setSelectedFile(item);
                      }}
                    >
                      Delete
                    </button>
                  ) : null}
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
        type={typeEdit}
        style={style}
      />

      <ModalAdd
        isOpenModal={addModalOpen}
        onCloseModal={() => setAddModalOpen(false)}
        idDataModal={idData}
        type={typeEdit}
      />

      <ModalConfirm
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Modal;
