import React from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../reusable/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../reusable/InputField"; // Import the new InputField component
import HeaderForm from "../../reusable/HeaderForm";

const Edit = () => {
  const navigate = useNavigate();
  const initialValues = {
    nama: "",
    alamat: "",
    email: "",
    password: "",
    confirmPassword: "",
    fotoAvatar: null,
  };

  const validationSchema = Yup.object({
    nama: Yup.string().required("Nama is required"),
    alamat: Yup.string().required("Alamat is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    fotoAvatar: Yup.mixed().required("Foto Avatar is required"),
  });

  const handleSave = (values) => {
    console.log("Data disimpan:", values);
  };

  const handleCancel = () => {
    navigate("/admin/user");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSave}
    >
      {({ setFieldValue }) => (
        <Form>
          <main>
            <div className="w-full p-4 bg-white mt-4 h-full">
              <HeaderForm title="Edit User" link="/admin/user" />
              <div className="border border-gray-200 mt-4 py-4 md:px-6">
                <div className="flex items-center py-3 px-4 gap-2">
                  <p className=" text-sm ">User Information</p>
                  <div className="w-[10rem] h-[1px] bg-teks"></div>
                </div>

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

                <div className="mb-4">
                  <InputField
                    type="file"
                    label="Foto Avatar"
                    name="fotoAvatar"
                    onChange={(e) =>
                      setFieldValue("fotoAvatar", e.target.files[0])
                    }
                  />
                </div>

                <div className="pt-10">
                  <div className="flex items-center py-3 px-4 gap-2">
                    <p className=" text-sm ">User Login</p>
                    <div className="w-[10rem] h-[1px] bg-teks"></div>
                  </div>

                  <InputField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Masukan Email"
                  />
                  <InputField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Masukan Password"
                  />
                  <InputField
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Konfirmasi Password"
                  />

                  <div className="flex gap-3 justify-center pt-5 md:justify-end">
                    <Button type="submit" label="Simpan" color="bg-exni" />
                    <Button
                      type="button"
                      label="Batal"
                      color="bg-red-500"
                      onClick={() => handleCancel()}
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
