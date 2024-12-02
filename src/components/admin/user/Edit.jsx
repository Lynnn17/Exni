import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../reusable/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../reusable/InputField";
import HeaderForm from "../../reusable/HeaderForm";
import axios from "axios";
import getAuthHeaders from "../../../utils/authUtils";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [initialValues, setInitialValues] = useState({
    pic: "",
    address: "",
    company: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch user data by ID
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const headers = await getAuthHeaders();
        const endpoint = `${import.meta.env.VITE_API_URL}users/${id}`;
        const response = await axios.get(endpoint, {
          headers,
        });
        const data = response.data.data.user;

        console.log("Fetched user data:", data);

        // Update initial values with the fetched data
        setInitialValues({
          pic: data.pic || "",
          address: data.address || "",
          company: data.company || "",
          contact: data.contact || "",
          password: "", // password is intentionally left empty for security
          confirmPassword: "", // confirmPassword is intentionally left empty
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const infoValidationSchema = Yup.object({
    pic: Yup.string().required("Pic is required"),
    address: Yup.string().required("Alamat is required"),
    contact: Yup.number()
      .typeError("Kontak harus berupa angka")
      .required("Kontak is required"),
    company: Yup.string().required("Nama Perusahaan is required"),
  });

  const loginValidationSchema = Yup.object({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Save Handler
  const handleSave = async (values) => {
    const filteredValues = { ...values };
    if (!showLoginForm) {
      delete filteredValues.password;
      delete filteredValues.confirmPassword;
    } else {
      delete filteredValues.company;
      delete filteredValues.address;
      delete filteredValues.contact;
      delete filteredValues.pic;
    }
    setIsSaving(true);
    try {
      const headers = await getAuthHeaders();
      const endpoint = `${import.meta.env.VITE_API_URL}users/${id}`;
      const response = await axios.put(endpoint, filteredValues, { headers }); // Use PUT for updates
      console.log("Update successful:", response.data);
      navigate("/admin/user"); // Redirect after successful save
    } catch (error) {
      console.error("Error updating information:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Cancel Handler
  const handleCancel = () => {
    navigate("/admin/user");
  };

  if (loading) {
    return <p>Loading...</p>; // Show a loading indicator
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={
        showLoginForm ? loginValidationSchema : infoValidationSchema
      }
      onSubmit={handleSave}
      enableReinitialize
    >
      {() => (
        <Form>
          <main>
            <div className="w-full p-4 bg-white mt-4 h-full">
              <HeaderForm title="Edit User" link="/admin/user" />
              <div className="border border-gray-200 mt-4 py-4 md:px-6">
                <div className="flex justify-end pr-4">
                  <button
                    type="button"
                    className="bg-exni text-white py-2 px-4 rounded-md text-sm md:text-base"
                    onClick={() => setShowLoginForm(!showLoginForm)}
                  >
                    {showLoginForm
                      ? "Sembunyikan Form Login"
                      : "Edit User Login"}
                  </button>
                </div>

                {/* User Information Form */}
                {!showLoginForm && (
                  <>
                    <div className="flex items-center py-3 px-4 gap-2">
                      <p className="text-sm">User Information</p>
                      <div className="w-[10rem] h-[1px] bg-teks"></div>
                    </div>
                    <InputField
                      name="pic"
                      label="PIC"
                      type="text"
                      placeholder="Masukan Nama PIC"
                    />
                    <InputField
                      name="address"
                      label="Alamat"
                      type="text"
                      placeholder="Masukan Alamat"
                    />
                    <InputField
                      name="contact"
                      label="Kontak"
                      type="text"
                      placeholder="Masukan No.Kontak HP"
                    />
                    <InputField
                      name="company"
                      label="Nama Perusahan"
                      type="text"
                      placeholder="Masukan Nama Perusahaan"
                    />
                  </>
                )}

                {/* User Login Form */}
                {showLoginForm && (
                  <div>
                    <div className="flex items-center py-3 px-4 gap-2">
                      <p className="text-sm">User Login</p>
                      <div className="w-[10rem] h-[1px] bg-teks"></div>
                    </div>
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
                  </div>
                )}

                <div className="flex gap-3 justify-center pt-5 md:justify-end">
                  <Button
                    type="submit"
                    color="bg-exni"
                    label={isSaving ? "Loading..." : "Simpan"}
                    disabled={isSaving}
                  />
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
