import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../reusable/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../reusable/InputField";
import HeaderForm from "../../reusable/HeaderForm";
import SingleSelectCheckboxGroup from "../../reusable/SingleSelectCheckboxGroup";

const Add = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    nama: Yup.string().required("Nama is required"),
    noPlat: Yup.number()
      .typeError("Nomor Plat must be a number")
      .required("Nomor Plat is required"),
    tahun: Yup.number()
      .typeError(" Tahun must be a number")
      .required(" Tahun is required"),
    noMesin: Yup.string().required("Nomor Mesin is required"),
    noRangka: Yup.string().required("Nomor Rangka is required"),
    kondisi: Yup.string().required("Kondisi is required"),
    fotoAset: Yup.mixed().required("Foto Aset is required"),
  });

  const handleSubmit = (values) => {
    console.log("Data submitted:", values);
  };
  const handleCancel = () => {
    navigate("/buildings");
  };

  const options = [
    { value: "baik", label: "Baik" },
    { value: "butuh perbaikan", label: "Butuh Perbaikan" },
  ];

  return (
    <Formik
      initialValues={{
        nama: "",
        noPlat: "",
        tahun: "",
        noMesin: "",
        noRangka: "",
        kondisi: "baik",
        fotoAset: null,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <main>
            <div className="w-full p-4 bg-white mt-4 h-full">
              <HeaderForm title="Add Vehicle Asset" link="/vehicles" />
              <div className="border border-gray-200 mt-4 py-4 md:px-6">
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
                <div className="px-3 pb-3">
                  <SingleSelectCheckboxGroup
                    label="Kondisi"
                    options={options}
                    selectedValue={values.kondisi}
                    onChange={(value) => setFieldValue("kondisi", value)}
                  />
                </div>
                <div className="mb-4">
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
