import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../reusable/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../reusable/InputField";
import HeaderForm from "../../../reusable/HeaderForm";
import SingleSelectCheckboxGroup from "../../../reusable/SingleSelectCheckboxGroup";
import StatusAlert from "react-status-alert";
import "react-status-alert/dist/status-alert.css";

const Edit = () => {
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
    fotoAset: Yup.mixed().required("Foto Aset is required"),
    dokumenAset: Yup.mixed().required("Dokumen Aset is required"),
    harga: Yup.number()
      .typeError("Harga must be a number")
      .required("Harga is required"),
    dekripsi: Yup.string(),
    penghuni: Yup.string(),
  });

  const handleSubmit = (values) => {
    console.log("Data submitted:", values);
  };
  const handleCancel = () => {
    navigate("/admin/asset/building");
  };

  const options = [
    { value: "available", label: "Tersedia" },
    { value: "unavailable", label: "Tidak Tersedia" },
  ];

  return (
    <Formik
      initialValues={{
        nama: "",
        alamat: "",
        kota: "",
        alokasi: "",
        luasGedung: "",
        luasTanah: "",
        fotoAset: null,
        dokumenAset: null,
        harga: "",
        deskripsi: "",
        penghuni: "",
        statusKetersediaan: "available",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <main>
            <StatusAlert />
            <div className="w-full p-4 bg-white mt-4 h-full">
              <HeaderForm title="Edit Building" link="/admin/asset/building" />
              <div className="border border-gray-200 mt-4 py-4 md:px-6 rounded-lg">
                <InputField
                  name="nama"
                  label="Nama"
                  type="text"
                  placeholder="Masukan Nama"
                  aria-label="Nama Gedung"
                />
                <InputField
                  name="alamat"
                  label="Alamat"
                  type="text"
                  placeholder="Masukan Alamat"
                  aria-label="Alamat Gedung"
                />
                <InputField
                  name="kota"
                  label="Kota"
                  type="text"
                  placeholder="Masukan Nama Kota"
                  aria-label="Kota Lokasi Gedung"
                />
                <InputField
                  name="alokasi"
                  label="Alokasi"
                  type="text"
                  placeholder="Masukan Alokasi Gedung"
                  aria-label="Fungsi atau Alokasi Gedung"
                />
                <InputField
                  name="luasGedung"
                  label="Luas Gedung"
                  type="text"
                  placeholder="Masukan Luas Gedung"
                  aria-label="Luas Gedung dalam Meter Persegi"
                />
                <InputField
                  name="luasTanah"
                  label="Luas Tanah"
                  type="text"
                  placeholder="Masukan Luas Tanah"
                  aria-label="Luas Tanah dalam Meter Persegi"
                />
                <InputField
                  name="harga"
                  label="Harga Sewa"
                  type="text"
                  placeholder="Masukan Harga Sewa"
                  aria-label="Harga Sewa Gedung"
                />
                <InputField
                  name="penghuni"
                  label="Penghuni"
                  type="text"
                  placeholder="Masukan Nama Penghuni/Penyewa (Optional)"
                  aria-label="Nama Penghuni atau Penyewa Gedung"
                />
                <InputField
                  name="deskripsi"
                  label="Deskripsi"
                  type="text"
                  placeholder="Masukan Deskripsi (Optional)"
                  aria-label="Deskripsi Singkat tentang Gedung"
                />
                <div className="px-3 pb-3">
                  <SingleSelectCheckboxGroup
                    label="Status Ketersediaan"
                    options={options}
                    selectedValue={values.statusKetersediaan}
                    onChange={(value) =>
                      setFieldValue("statusKetersediaan", value)
                    }
                    aria-label="Status Ketersediaan Gedung"
                  />
                </div>
                <div className="mb-4">
                  <InputField
                    type="file"
                    label="Dokumen Aset"
                    name="dokumenAset"
                    maxFiles={3}
                    onChange={(e) =>
                      setFieldValue("dokumenAset", e.target.files[0])
                    }
                    aria-label="Unggah Dokumen Terkait Aset Gedung"
                  />

                  <InputField
                    type="file"
                    label="Foto Aset"
                    name="fotoAset"
                    maxFiles={8}
                    onChange={(e) =>
                      setFieldValue("fotoAset", e.target.files[0])
                    }
                  />
                </div>

                <div className="flex gap-3 justify-center md:justify-end pt-5 pr-5">
                  <Button type="submit" label="Simpan" color="bg-exni" />
                  <Button
                    type="button"
                    label="Batal"
                    color="bg-red-500"
                    onClick={handleCancel}
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

export default Edit;
