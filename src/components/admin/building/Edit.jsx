import React from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../reusable/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../reusable/InputField";

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
  });

  const handleSubmit = (values) => {
    console.log("Data submitted:", values);
  };

  const handleCancel = () => {
    navigate("/buildings");
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
        fotoAset: null,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <main>
            <div className="w-full p-4 bg-white mt-4 h-full">
              <div className="flex items-center gap-2">
                <Link to="/buildings">
                  <MdKeyboardBackspace className="text-2xl" />
                </Link>
                <p className="text-lg font-medium">Edit Aset Bangunan</p>
              </div>
              <div className="w-full h-[1px] bg-teks mt-2"></div>

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

                <div className="flex gap-3 justify-center md:justify-end pt-5">
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
