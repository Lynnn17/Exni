import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../reusable/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../reusable/InputField";
import HeaderForm from "../../../reusable/HeaderForm";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import axios from "axios";

const Add = () => {
  const navigate = useNavigate();

  // Skema validasi dengan Yup
  const validationSchema = Yup.object({
    nama: Yup.string().required("Nama is required"),
    noPlat: Yup.number()
      .typeError("Nomor Plat must be a number")
      .required("Nomor Plat is required"),
    tahun: Yup.number()
      .typeError("Tahun must be a number")
      .required("Tahun is required"),
    noMesin: Yup.string().required("Nomor Mesin is required"),
    noRangka: Yup.string().required("Nomor Rangka is required"),
    kondisi: Yup.string().required("Kondisi is required"),
    deskripsi: Yup.string().required("Deskripsi is required"),
    harga: Yup.number()
      .typeError("Harga must be a number")
      .required("Harga is required"),
    fotoAset: Yup.array()
      .of(
        Yup.mixed().test(
          "type",
          "Harus berupa file foto",
          (value) =>
            value &&
            ["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
              value.type
            )
        )
      )
      .min(1, "Minimal 1 foto")
      .max(8, "Maksimal 8 foto")
      .required("Foto Aset is required"),
    dokumenAset: Yup.array()
      .of(
        Yup.mixed().test(
          "type",
          "Harus berupa file pdf",
          (value) => value && ["application/pdf"].includes(value.type)
        )
      )
      .min(1, "Minimal 1 dokumen")
      .max(3, "Maksimal 3 dokumen")
      .required("Dokumen Aset is required"),
  });

  // Handle Submit
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Buat objek FormData
      const formData = new FormData();
      formData.append("name", values.nama);
      formData.append("no_police", values.noPlat);
      formData.append("year", values.tahun);
      formData.append("no_machine", values.noMesin);
      formData.append("no_frame", values.noRangka);
      formData.append("description", values.deskripsi);
      formData.append("price", values.harga);

      // Append file fotoAset dan dokumenAset
      values.fotoAset.forEach((file) => formData.append("albums", file));
      values.dokumenAset.forEach((file) => formData.append("documents", file));

      // API POST request
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}assets/vehicles`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Success Response:", response.data);
      resetForm();
      StatusAlertService.showSuccess("Data Vehicle berhasil disimpan!");
      setTimeout(() => {
        navigate("/admin/asset/vehicle");
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      setTimeout(() => {
        StatusAlertService.showError("Data Vehicle gagal disimpan!");
      }, 500);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Cancel
  const handleCancel = (resetForm) => {
    resetForm();
    navigate("/admin/asset/vehicle");
  };

  return (
    <Formik
      initialValues={{
        nama: "",
        noPlat: "",
        tahun: "",
        noMesin: "",
        noRangka: "",
        kondisi: "baik",
        fotoAset: [],
        dokumenAset: [],
        harga: "",
        deskripsi: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ resetForm, isSubmitting, setFieldValue }) => (
        <Form>
          <main>
            {/* StatusAlert Component */}
            <StatusAlert />

            <div className="w-full p-4 bg-white mt-4 h-full rounded-lg">
              <HeaderForm
                title="Add Vehicle Asset"
                link="/admin/asset/vehicle"
              />

              <div className="border border-gray-200 mt-4 py-4 md:px-6 rounded-lg">
                <InputField
                  name="nama"
                  label="Nama"
                  type="text"
                  placeholder="Masukan Nama"
                />
                <InputField
                  name="noPlat"
                  label="No. Plat"
                  type="text"
                  placeholder="Masukan Nomor Plat"
                />
                <InputField
                  name="tahun"
                  label="Tahun Perolehan"
                  type="text"
                  placeholder="Masukan Tahun Perolehan"
                />
                <InputField
                  name="noMesin"
                  label="No. Mesin"
                  type="text"
                  placeholder="Masukan Nomor Mesin"
                />
                <InputField
                  name="noRangka"
                  label="No. Rangka"
                  type="text"
                  placeholder="Masukan Nomor Rangka"
                />
                <InputField
                  name="harga"
                  label="Harga"
                  type="text"
                  placeholder="Masukan Harga"
                />
                <InputField
                  name="deskripsi"
                  label="Deskripsi"
                  type="text"
                  placeholder="Masukan Deskripsi"
                />

                {/* Input File */}
                <div className="mb-4">
                  <InputField
                    type="file"
                    label="Dokumen Aset"
                    name="dokumenAset"
                    maxFiles={3}
                    onChange={(e) =>
                      setFieldValue("dokumenAset", Array.from(e.target.files))
                    }
                  />
                  <InputField
                    type="file"
                    label="Foto Aset"
                    name="fotoAset"
                    maxFiles={8}
                    onChange={(e) =>
                      setFieldValue("fotoAset", Array.from(e.target.files))
                    }
                  />
                </div>

                {/* Button */}
                <div className="flex gap-3 justify-center md:justify-end pt-5 pr-5">
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
                    onClick={() => handleCancel(resetForm)}
                  />
                </div>
              </div>
            </div>
          </main>
        </Form>
      )}
    </Formik>
  );
};

export default Add;
