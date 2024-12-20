import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { IoCloseSharp } from "react-icons/io5";
import LogoExni from "../../assets/logo/exni.svg";
import axios from "axios";
import InputField from "./InputField";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Modal = ({
  isOpenModal,
  onCloseModal,
  idDataModal,
  type,
  style = "assets",
}) => {
  if (!isOpenModal || !idDataModal) return null;

  const history = useNavigate();

  const maxFiles = style === "assets" ? (type === "albums" ? 8 : 3) : 1;
  const accept =
    style === "assets" ? (type === "albums" ? "image/*" : ".pdf") : ".pdf";

  // Schema validasi dengan Yup berdasarkan tipe file
  const validationSchema = Yup.object().shape({
    file:
      type === "albums"
        ? Yup.array()
            .min(1, "At least one image is required")
            .max(8, "Maximum 8 images")
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
      values.file.forEach((file) => {
        if (type === "document") {
          formData.append("documents", file);
        } else {
          formData.append(type, file);
        }
      });
    } else {
      formData.append(type, values.file[0]);
    }

    try {
      let response;
      if (style === "assets") {
        console.log("idDataModal", idDataModal);
        response = await axios.put(
          `${import.meta.env.VITE_API_URL}assets/${idDataModal}/${type}`,
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
          `${import.meta.env.VITE_API_URL}applications/${idDataModal}`,
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
      onCloseModal();
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
          onClick={onCloseModal}
        >
          <IoCloseSharp />
        </button>

        {/* Header Modal */}
        <div className="flex justify-center items-center mb-4 pt-3 gap-5">
          <img src={LogoExni} alt="Logo Exni" />
        </div>

        {/* Form */}
        <Formik
          initialValues={{ file: [] }}
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
                  maxFiles={maxFiles}
                  accept={accept}
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
                  onClick={onCloseModal}
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
