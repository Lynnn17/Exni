import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoCloseSharp } from "react-icons/io5";
import LogoExni from "../../assets/logo/exni.svg";
import axios from "axios";
import InputField from "./InputField";
import Button from "./Button";

const Modal = ({ isOpen, onClose, data, type }) => {
  if (!isOpen || !data) return null;

  // Schema validasi dengan Yup
  const validationSchema = Yup.object({
    image: Yup.mixed().required("File is required"),
  });

  const typeEdit = type === "Document" ? "documents" : "albums";

  // Fungsi submit form
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append(typeEdit, values.image);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}assets/${data}/${typeEdit}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);

      // Reset form dan tutup modal setelah berhasil
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setSubmitting(false);
    }
  };

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

        {/* Header Modal */}
        <div className="flex justify-center items-center mb-4 pt-3 gap-5">
          <span className="text-sm font-medium">{data.id}</span>
          <img src={LogoExni} alt="Logo Exni" />
        </div>

        {/* Form */}
        <Formik
          initialValues={{ image: null }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              {/* Input File */}
              <div className="mb-4">
                <h3 className="font-semibold">Upload {type}</h3>
                <InputField
                  type="file"
                  label="Gambar"
                  name="image"
                  accept="image/*"
                  onChange={(e) =>
                    setFieldValue("image", e.currentTarget.files[0])
                  }
                />
              </div>

              {/* Tombol Aksi */}
              <div className="flex justify-end gap-3">
                <Button
                  type="submit"
                  label={isSubmitting ? "Saving..." : "Save"}
                  color="bg-exni"
                  disabled={isSubmitting}
                />
                <Button
                  type="button"
                  label="Batal"
                  color="bg-red-500"
                  onClick={onClose}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Modal;
