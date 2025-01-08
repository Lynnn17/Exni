import React, { useState } from "react";
import axios from "axios";
import bgLogin from "../../assets/bg-login.png";
import fbgLogin from "../../assets/front-bg-login.png";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../reusable/InputField";
import { useNavigate } from "react-router-dom";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
<<<<<<< HEAD
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
=======
    email: Yup.string().required("Email is required"),
>>>>>>> refs/remotes/origin/main
    password: Yup.string()
      .min(6, "Password must have at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("Login attempt:", values); // Debug input login

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}auth/login`,
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login response:", response.data);
      const token = response.data.data.access_token;
<<<<<<< HEAD
      const user = {
        company: response.data.data.company,
        role: response.data.data.role,
        user_id: response.data.data.user_id,
      };
      if (!token) {
        throw new Error("Token not received from server");
      }

      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(user));
      StatusAlertService.showSuccess("Login successfully!"); // Menampilkan alert sukses
=======
      localStorage.setItem("token", token);
      StatusAlertService.showSuccess("Login berhasil!");
>>>>>>> refs/remotes/origin/main
      resetForm();

      navigate("/admin/dashboard"); // Redirect setelah login
    } catch (error) {
<<<<<<< HEAD
      console.error("Login failed:", error.response || error.message); // Debug error
      StatusAlertService.showError(
        "Login failed. Please check your credentials."
      ); // Menampilkan alert gagal
=======
      StatusAlertService.showError(
        "Login gagal. Silakan periksa kembali email atau password Anda."
      );
>>>>>>> refs/remotes/origin/main
    } finally {
      setSubmitting(false);
    }
  };

  return (
<<<<<<< HEAD
    <main>
      <StatusAlert className="" />
      <div
        className="w-full h-screen bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${bgLogin})` }}
      >
        <div className="h-full flex justify-center items-center">
=======
    <>
      <StatusAlert />
      <div
        className="w-full h-screen bg-cover bg-no-repeat bg-center -mt-4"
        style={{ backgroundImage: `url(${bgLogin})` }}
      >
        <div className="h-full flex justify-center items-center">
          <div className="absolute z-[100]"></div>
>>>>>>> refs/remotes/origin/main
          <div className="flex">
            {/* Card */}
            <div className="bg-white w-[20rem] md:w-[25rem] py-7 xl:rounded-l-[30px] rounded-[30px] xl:rounded-none">
              <div className="p-4">
                <p className="text-2xl font-bold text-center">Login Admin</p>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleLogin}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="pt-5">
                        <InputField
                          type="text"
                          name="email"
                          label="Email"
                          placeholder="Enter your Email"
                          nameClass="bg-gray-200 text-black text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-4"
                        />
                      </div>
                      <div className="">
                        <InputField
                          type={showPassword ? "text" : "password"}
                          name="password"
                          label="Password"
                          placeholder="Enter your password"
                          nameClass="bg-gray-200 text-black text-base rounded-lg focus:ring-gray-500 focus:border-gray-500 block py-4"
                          onToggle={togglePasswordVisibility}
                          showPasswordToggle={true}
                        />
                      </div>
                      <div className="flex justify-end px-4 pt-2">
                        <p className="text-sm cursor-pointer text-blue-600">
                          Forgot Password?
                        </p>
                      </div>
                      <div className="flex justify-center pt-5">
                        <button
                          type="submit"
                          className="bg-[#5641BA] text-white w-[8rem] p-2 rounded-md mt-4"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Logging in..." : "Login"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            {/* End Card */}

            {/* Image Section */}
            <div className="hidden xl:flex">
              <div
                className="w-[35rem] h-full bg-cover rounded-r-[30px]"
                style={{ backgroundImage: `url(${fbgLogin})` }}
              >
                <div className="h-full p-4 px-10 flex flex-col justify-center">
                  <h1 className="text-4xl font-bold text-center text-white">
                    WELCOME
                  </h1>
                  <p className="text-sm text-center text-white">
                    Welcome back! Please log in to continue.
                  </p>
                </div>
              </div>
            </div>
            {/* End Image Section */}
          </div>
        </div>
      </div>
<<<<<<< HEAD
    </main>
=======
    </>
>>>>>>> refs/remotes/origin/main
  );
};

export default Login;
