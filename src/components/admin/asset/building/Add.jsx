import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../reusable/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../reusable/InputField";
import HeaderForm from "../../../reusable/HeaderForm";

import axios from "axios";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";
import Loading from "../../../reusable/Loading";

const Add = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    nama: Yup.string().required("Nama is required"),
    alamat: Yup.string().required("Alamat is required"),
    kota: Yup.string().required("Kota is required"),
    alokasi: Yup.string().required("Alokasi is required"),
    luasGedung: Yup.number()
      .typeError("Luas Gedung must be a number")
      .required("Luas Gedung is required"),
    luasTanah: Yup.number()
      .typeError("Luas Tanah must be a number")
      .required("Luas Tanah is required"),
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
    harga: Yup.number()
      .typeError("Harga must be a number")
      .required("Harga is required"),
    deskripsi: Yup.string().required("Deskripsi is required"),
    sertifikat: Yup.string().required("Sertifikat is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Data submitted:", values);

    try {
      // Buat objek FormData
      const formData = new FormData();

      // Append semua field ke FormData
      formData.append("name", values.nama);
      formData.append("address", values.alamat);
      formData.append("city", values.kota);
      formData.append("allocation", values.alokasi);
      formData.append("landArea", values.luasTanah);
      formData.append("buildingArea", values.luasGedung);
      formData.append("price", values.harga);
      formData.append("description", values.deskripsi);
      formData.append("certificate", values.sertifikat);
      values.fotoAset.forEach((file) => {
        formData.append("albums", file);
      });
      values.dokumenAset.forEach((file) => formData.append("documents", file));

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}assets/properties`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000, // 30 detik (atur sesuai kebutuhan)
        }
      );

      resetForm();
      StatusAlertService.showSuccess("Data tenant berhasil diupdate!");
      navigate("/admin/asset/building");
    } catch (error) {
      console.error("Error saving data:", error);
      StatusAlertService.showError("Data Gedung gagal disimpan!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = (resetForm) => {
    resetForm();
    navigate("/admin/asset/building");
  };

  return (
    <Formik
      initialValues={{
        nama: "",
        alamat: "",
        kota: "",
        alokasi: "",
        luasGedung: "",
        luasTanah: "",
        fotoAset: [],
        dokumenAset: [],
        harga: "",
        deskripsi: "",
        sertifikat: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ resetForm, isSubmitting, setFieldValue }) => (
        <Form>
          <main>
            <StatusAlert />
            <div className="w-full p-4 bg-white mt-4 h-full">
              <HeaderForm title="Add Building" link="/admin/asset/building" />
              <div className="border border-gray-200 mt-4 py-4 md:px-6 rounded-lg">
                <InputField
                  name="nama"
                  label="Nama"
                  type="text"
                  placeholder="Masukan Nama"
                />
                <InputField
                  name="alamat"
                  label="Alamat"
                  type="text"
                  placeholder="Masukan Alamat"
                />
                <InputField
                  name="kota"
                  label="Kota"
                  type="text"
                  placeholder="Masukan Nama Kota"
                />
                <InputField
                  name="alokasi"
                  label="Alokasi"
                  type="text"
                  placeholder="Masukan Alokasi Gedung"
                />
                <InputField
                  name="luasGedung"
                  label="Luas Gedung"
                  type="text"
                  placeholder="Masukan Luas Gedung"
                />
                <InputField
                  name="luasTanah"
                  label="Luas Tanah"
                  type="text"
                  placeholder="Masukan Luas Tanah"
                />
                <InputField
                  name="harga"
                  label="Harga Sewa"
                  type="text"
                  setFieldValue={setFieldValue}
                  placeholder="Masukan Harga Sewa"
                />
                <InputField
                  name="sertifikat"
                  label="Nomor Sertifikat"
                  type="text"
                  placeholder="Masukan Nomor Sertifikat"
                />
                <InputField
                  name="deskripsi"
                  label="Deskripsi"
                  type="text"
                  placeholder="Masukan Deskripsi"
                />

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
