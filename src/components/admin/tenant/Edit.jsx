import React from "react";
import Button from "../../reusable/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../reusable/InputField";
import HeaderForm from "../../reusable/HeaderForm";
import SingleSelectCheckboxGroup from "../../reusable/SingleSelectCheckboxGroup";

const Edit = () => {
  const initialValues = {
    nama: "",
    alamat: "",
    email: "",
    password: "",
    confirmPassword: "",
    fotoAvatar: null,
    statusKetersediaan: "available",
    lokasi: "",
    lantai: "",
    harga: "",
    deskripsi: "",
    dokumenAset: null,
    fotoAset: null,
  };

  const validationSchema = Yup.object({
    nama: Yup.string(),
    alamat: Yup.string(),
    lokasi: Yup.string().required("Lokasi Gedung is required"),
    lantai: Yup.string().required("Lantai Gedung is required"),
    harga: Yup.number()
      .typeError("Harga must be a number")
      .required("Harga Sewa is required"),
    dokumenAset: Yup.mixed().required("Dokumen Aset is required"),
    fotoAset: Yup.mixed().required("Foto Aset is required"),
  });

  const handleSave = (values) => {
    console.log("Data disimpan:", values);
  };

  const handleCancel = (resetForm) => {
    console.log("Batal simpan");
    resetForm();
  };

  const options = [
    { value: "available", label: "Tersedia" },
    { value: "unavailable", label: "Tidak Tersedia" },
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSave}
    >
      {({ setFieldValue, resetForm, values }) => (
        <Form>
          <main>
            <div className="w-full p-4 bg-white mt-4 h-full">
              <HeaderForm title="Add Tenant Asset" link="/tenants" />
              <div className="border border-gray-200 mt-4 py-4 md:px-6">
                <div className="flex items-center py-3 px-4 gap-2">
                  <p className="text-sm">User Information</p>
                  <div className="w-[10rem] h-[1px] bg-teks"></div>
                </div>

                <InputField
                  name="nama"
                  label="Nama Penyewa"
                  type="text"
                  placeholder="Masukan Nama Tenant (Optional)"
                />
                <InputField
                  name="alamat"
                  label="Alamat Penyewa"
                  type="text"
                  placeholder="Masukan Alamat Tenant (Optional)"
                />

                <div className="pt-4">
                  <div className="flex items-center py-3 px-4 gap-2">
                    <p className="text-sm">Asset Information</p>
                    <div className="w-[10rem] h-[1px] bg-teks"></div>
                  </div>

                  <InputField
                    name="lokasi"
                    label="Lokasi Gedung"
                    type="text"
                    placeholder="Masukan Nama Gedung"
                  />
                  <InputField
                    name="lantai"
                    label="Lantai"
                    type="text"
                    placeholder="Masukan Lantai Gedung"
                  />
                  <InputField
                    name="harga"
                    label="Harga"
                    type="text"
                    placeholder="Tentukan Harga Sewa"
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
                      selectedValue={values.statusKetersediaan}
                      onChange={(value) =>
                        setFieldValue("statusKetersediaan", value)
                      }
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

                  <div className="flex gap-3 justify-center pt-5 md:justify-end">
                    <Button type="submit" label="Simpan" color="bg-exni" />
                    <Button
                      type="button"
                      label="Batal"
                      color="bg-red-500"
                      onClick={() => handleCancel(resetForm)}
                    />
                  </div>
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
