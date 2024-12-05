import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../reusable/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../../reusable/InputField";
import HeaderForm from "../../../reusable/HeaderForm";
import SingleSelectCheckboxGroup from "../../../reusable/SingleSelectCheckboxGroup";

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
        statusKetersediaan: "available", // Set default selected option
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <main>
            <div className="w-full p-4 bg-white mt-4 h-full rounded-lg">
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
                  placeholder="Masukan Harga Sewa"
                />
                <InputField
                  name="penghuni"
                  label="Penghuni"
                  type="text"
                  placeholder="Masukan Nama Penghuni/Penyewa (Optional)"
                />
                <InputField
                  name="deskripsi"
                  label="Deskripsi"
                  type="text"
                  placeholder="Masukan Deskripsi (Optional)"
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
                    onChange={(e) =>
                      setFieldValue("dokumenAset", e.target.files[0])
                    }
                  />
                  <InputField
                    type="file"
                    label="Foto Aset"
                    name="fotoAset"
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

export default Add;
