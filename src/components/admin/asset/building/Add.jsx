import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../reusable/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../reusable/InputField";
import HeaderForm from "../../../reusable/HeaderForm";
import SingleSelectCheckboxGroup from "../../../reusable/SingleSelectCheckboxGroup";
import axios from "axios";

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
      .max(8, "Maksimal 8 foto")
      .required("Foto Aset is required"),
    dokumenAset: Yup.array()
      .max(3, "Maksimal 3 dokumen")
      .required("Dokumen Aset is required"),
    harga: Yup.number()
      .typeError("Harga must be a number")
      .required("Harga is required"),
    deskripsi: Yup.string(),
    penghuni: Yup.string(),
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
      formData.append("ground", values.luasTanah);
      formData.append("building", values.luasGedung);
      formData.append("price", values.harga);
      values.fotoAset.forEach((file) => formData.append("albums", file));
      values.dokumenAset.forEach((file) => formData.append("document", file));

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Data saved successfully:", response.data);
      alert("User registered successfully!");
      resetForm();
      navigate("/admin/user");
    } catch (error) {
      console.error("Error saving data:", error.response || error.message);
      alert("Failed to register user. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = (resetForm) => {
    resetForm();
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
        fotoAset: [],
        dokumenAset: [],
        harga: "",
        deskripsi: "",
        penghuni: "",
        statusKetersediaan: "available", // Set default selected option
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ resetForm, isSubmitting, setFieldValue, values }) => (
        <Form>
          <main>
            <div className="w-full p-4 bg-white mt-4 h-full">
              <HeaderForm title="Add Building" link="/admin/asset/building" />
              <div className="border border-gray-200 mt-4 py-4 md:px-6">
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
                  placeholder="Masukan Harga Sewa"
                />
                <InputField
                  name="penghuni"
                  label="Penghuni"
                  type="text"
                  placeholder="Masukan Nama Penghuni/Penyewa "
                />
                <InputField
                  name="deskripsi"
                  label="Deskripsi"
                  type="text"
                  placeholder="Masukan Deskripsi"
                />
                <div className="px-3 pb-3">
                  <SingleSelectCheckboxGroup
                    label="Status Ketersediaan"
                    options={options}
                    selectedValue={values.statusKetersediaan} // Bind to Formik value
                    onChange={(value) =>
                      setFieldValue("statusKetersediaan", value)
                    } // Update Formik field value
                  />
                </div>
                <div className="mb-4">
                  <InputField
                    type="file"
                    label="Dokumen Aset"
                    name="dokumenAset"
                    multiple
                    onChange={
                      (e) => console.log(Array.from(e.target.files))
                      // setFieldValue("dokumenAset", Array.from(e.target.files))
                    }
                  />
                  <InputField
                    type="file"
                    label="Foto Aset"
                    name="fotoAset"
                    multiple
                    onChange={(e) => console.log(Array.from(e.target.files))}
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
