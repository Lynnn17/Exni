import React from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { IoCloseSharp } from "react-icons/io5";
import LogoExni from "../../assets/logo/exni.svg";
import axios from "axios";
import InputField from "./InputField";
import Button from "./Button";

import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, onClose, idData, idFile, type, style }) => {
  if (!isOpen || !idFile) return null;
  const history = useNavigate();

  const validationSchema = Yup.object().shape({
    file:
      type === "albums"
        ? Yup.array()
            .min(1, "At least one image is required")
            .of(
              Yup.mixed().test("fileType", "Unsupported file format", (value) =>
                [
                  "image/jpeg",
                  "image/png",
                  "image/gif",
                  "image/webp",
                  "image/jpg",
                ].includes(value?.type)
              )
            )
            .required("Images are required")
        : Yup.array()
            .min(1, "At least one document is required")
            .max(3, "Maximum 3 documents")
            .of(
              Yup.mixed().test("fileType", "Unsupported file format", (value) =>
                ["application/pdf"].includes(value?.type)
              )
            )
            .required("Document is required"),
  });

  // Fungsi submit form
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    if (style === "assets") {
      if (type === "albums") {
        formData.append("deletedAlbumIds[0]", idFile);
      } else if (type === "document") {
        formData.append("deletedDocumentIds[0]", idFile);
      } else {
        console.error("Tipe file tidak valid");
        return;
      }
      if (type === "document") {
        formData.append("documents", values.file[0]);
      } else {
        formData.append(type, values.file[0]);
      }
    } else {
      if (type === "proposal") {
        formData.append("proposal", values.file[0]);
      } else {
        formData.append("minutesOfMeeting", values.file[0]);
      }
    }

    try {
      let response;
      if (style === "assets") {
        response = await axios.put(
          `${import.meta.env.VITE_API_URL}assets/${idData}/${type}`,

          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.put(
          `${import.meta.env.VITE_API_URL}applications/${idData}`,

          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      console.log("Response", response.data);
      resetForm();
      onClose();
      history(0);
    } catch (error) {
      console.error(
        "Error uploading file:",
        error.response?.data || error.message
      );
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
                  label={type}
                  name="file"
                  accept={type === "albums" ? "image/*" : ".pdf"}
                  onChange={(e) =>
                    setFieldValue("file", e.currentTarget.files[0])
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
