import React from "react";
import Button from "../../reusable/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../reusable/InputField";
import HeaderForm from "../../reusable/HeaderForm";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import StatusAlert, { StatusAlertService } from "react-status-alert"; // Import StatusAlert
import "react-status-alert/dist/status-alert.css"; // Import styles

const Edit = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const initialValues = {
    company: "",
    email: "",
    password: "",
    address: "",
    contact: "",
    pic: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    company: Yup.string().required("Company is required"),
    address: Yup.string().required("Address is required"),
    contact: Yup.string()
      .required("Contact is required")
      .matches(/^[0-9]+$/, "Contact must be a valid number"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must have at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    pic: Yup.string().required("PIC is required"),
  });

  const handleSave = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}auth/register`,
        {
          company: values.company,
          email: values.email,
          password: values.password,
          address: values.address,
          contact: values.contact,
          pic: values.pic,
        }
      );

      console.log("Data saved successfully:", response.data);
      StatusAlertService.showSuccess("User registered successfully!"); // Show success alert

      setTimeout(() => {
        navigate("/admin/user"); // Redirect to /admin/user after 2 seconds
      }, 1000);

      resetForm();
    } catch (error) {
      console.error("Error saving data:", error.response || error.message);
      StatusAlertService.showError(
        "Failed to register user. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = (resetForm) => {
    console.log("Batal simpan");
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSave}
    >
      {({ setFieldValue, resetForm, isSubmitting }) => (
        <Form>
          <main>
            <StatusAlert /> {/* Add this line to display the alert */}
            <div className="w-full p-4 bg-white mt-4 h-full">
              <HeaderForm title="Add User" link="/admin/user" />
              <div className="border border-gray-200 mt-4 py-4 md:px-6 rounded-lg">
                {/* User Information Section */}
                <div className="flex items-center py-3 px-4 gap-2">
                  <p className=" text-sm ">User Information</p>
                  <div className="w-[10rem] h-[1px] bg-teks"></div>
                </div>

                {/* Company */}
                <InputField
                  name="company"
                  label="Company"
                  type="text"
                  placeholder="Enter company name"
                />

                {/* Address */}
                <InputField
                  name="address"
                  label="Address"
                  type="text"
                  placeholder="Enter address"
                />

                {/* Contact */}
                <InputField
                  name="contact"
                  label="Contact"
                  type="text"
                  placeholder="Enter contact number"
                />

                {/* PIC */}
                <div className="mb-4">
                  <InputField
                    type="text"
                    label="PIC"
                    name="pic"
                    placeholder="Enter PIC"
                  />
                </div>

                {/* User Login Section */}
                <div className="pt-10">
                  <div className="flex items-center py-3 px-4 gap-2">
                    <p className=" text-sm ">User Login</p>
                    <div className="w-[10rem] h-[1px] bg-teks"></div>
                  </div>

                  {/* Email */}
                  <InputField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                  />

                  {/* Password */}
                  <InputField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                  />

                  {/* Confirm Password */}
                  <InputField
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm password"
                  />

                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-center pt-5 md:justify-end">
                    <Button
                      type="submit"
                      label={isSubmitting ? "Saving..." : "Save"}
                      color="bg-exni"
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      label="Cancel"
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
