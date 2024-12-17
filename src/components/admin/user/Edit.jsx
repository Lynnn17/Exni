import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../reusable/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../reusable/InputField";
import HeaderForm from "../../reusable/HeaderForm";
import axios from "axios";
import { handleTokenRefresh } from "../../../utils/authUtils";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [initialValues, setInitialValues] = useState({
    pic: "",
    address: "",
    company: "",
    contact: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch user data by ID
  const fetchUserData = async () => {
    setLoading(true);
    try {
      let token = localStorage.getItem("token");
      const endpoint = `${import.meta.env.VITE_API_URL}users/${id}`;

      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.data.user;
        setInitialValues({
          pic: data.pic || "",
          address: data.address || "",
          company: data.company || "",
          contact: data.contact || "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (error) {
        if (error.response?.data?.message === "jwt expired") {
          token = await handleTokenRefresh();
          const refreshedResponse = await axios.get(endpoint, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = refreshedResponse.data.data.user;
          setInitialValues({
            pic: data.pic || "",
            address: data.address || "",
            company: data.company || "",
            contact: data.contact || "",
            newPassword: "",
            confirmPassword: "",
          });
          StatusAlertService.showSuccess("Data berhasil dimuat!");
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      StatusAlertService.showError("Gagal memuat data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
    newPassword: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Save Handler
  const handleSave = async (values) => {
    const filteredValues = { ...values };
    if (!showLoginForm) {
      delete filteredValues.newPassword;
      delete filteredValues.confirmPassword;
    } else {
      delete filteredValues.company;
      delete filteredValues.address;
      delete filteredValues.contact;
      delete filteredValues.pic;
      delete filteredValues.confirmPassword;
    }

    setIsSaving(true);
    try {
      let token = localStorage.getItem("token");
      const endpoint = showLoginForm
        ? `${import.meta.env.VITE_API_URL}users/${id}/password/admin`
        : `${import.meta.env.VITE_API_URL}users/${id}`;

      try {
        await axios.put(endpoint, filteredValues, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        StatusAlertService.showSuccess("Data berhasil disimpan!");
        setTimeout(() => navigate("/admin/user"), 2000);
      } catch (error) {
        if (error.response?.data?.message === "jwt expired") {
          token = await handleTokenRefresh();
          await axios.put(endpoint, filteredValues, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          StatusAlertService.showSuccess("Data berhasil disimpan!");
          setTimeout(() => navigate("/admin/user"), 2000);
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error("Error updating information:", error);
      StatusAlertService.showError("Gagal menyimpan data. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/user");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <StatusAlert /> {/* Komponen untuk menampilkan alert */}
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
              <div className="w-full p-4 bg-white mt-4 h-full rounded-lg">
                <HeaderForm title="Edit User" link="/admin/user" />
                <div className="border border-gray-200 mt-4 py-4 md:px-6 rounded-lg">
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

                  {showLoginForm && (
                    <div>
                      <div className="flex items-center py-3 px-4 gap-2">
                        <p className="text-sm">User Login</p>
                        <div className="w-[10rem] h-[1px] bg-teks"></div>
                      </div>
                      <InputField
                        name="newPassword"
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
    </>
  );
};

export default Edit;
