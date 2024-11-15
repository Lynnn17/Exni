import React, { useState } from "react";
import bgLogin from "../assets/bg-login.png";
import Input from "./reusable/Input";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "./reusable/InputField";
const Login = () => {
  const [textValue, setTextValue] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTextChange = (e) => setTextValue(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <>
      <div
        className="w-full h-screen bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${bgLogin})` }}
      >
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex ">
            {/* card */}
            <div className="bg-white w-[20rem] md:w-[25rem] py-7 xl:rounded-l-[30px] rounded-[30px] xl:rounded-none ">
              <div className="p-4">
                <p className="text-2xl font-bold text-center">Login</p>
                <div className="pt-5 ">
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={textValue}
                    onChange={handleTextChange}
                    nameClass="bg-gray-200  text-black text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-4"
                  />
                </div>
                <div className="pt-4">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    showPasswordToggle={true}
                    onToggle={togglePasswordVisibility}
                    nameClass="bg-gray-200 text-black text-base rounded-lg focus:ring-gray-500 focus:border-gray-500 block py-4"
                  />{" "}
                </div>
                <div className="flex justify-end px-4 pt-2">
                  <p className="text-sm">Lupa Password</p>
                </div>
                <div className="flex justify-center pt-5">
                  <button className="bg-[#5641BA] text-white w-[5rem]  p-2 rounded-md mt-4">
                    Login
                  </button>
                </div>
              </div>
            </div>
            {/* end card */}
            {/* gambar */}
            <div className="hidden xl:flex">
              <div
                className="w-[35rem] h-full bg-cover rounded-r-[30px]"
                style={{ backgroundImage: `url(${bgLogin})` }}
              >
                <div className=" h-full p-4 px-10 flex flex-col justify-center">
                  <h1 className="text-4xl font-bold text-center text-white ">
                    WELCOME
                  </h1>
                  <p className="text-sm text-center text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam,
                  </p>
                </div>
              </div>
            </div>
            {/* end gambar */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
