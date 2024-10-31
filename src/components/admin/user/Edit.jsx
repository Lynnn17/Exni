import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import Input from "../../reusable/Input";
import Button from "../../reusable/Button";
import React, { useState } from "react";

const Edit = () => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fotoAvatar, setFotoAvatar] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNamaChange = (e) => setNama(e.target.value);
  const handleAlamatChange = (e) => setAlamat(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleFotoAvatarChange = (e) => setFotoAvatar(e.target.files[0]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSave = () => {
    console.log("Data disimpan");
  };

  const handleCancel = () => {
    console.log("Batal simpan");
  };

  return (
    <>
      <main>
        <div className="w-full p-4 bg-white mt-4 h-full">
          <div className="flex items-center gap-2">
            <Link to="/users">
              <MdKeyboardBackspace className="text-2xl" />
            </Link>
            <p className="text-lg font-medium">Edit User</p>
          </div>
          <div className="w-full h-[1px] bg-teks mt-2"></div>

          <div className="border border-gray-200 mt-4 py-4 md:px-6">
            <div className="flex items-center py-3 px-4 gap-2">
              <p className=" text-sm ">User Information</p>
              <div className="w-[10rem] h-[1px] bg-teks"></div>
            </div>
            <Input
              type="text"
              label="Nama"
              name="nama"
              placeholder="Masukan Nama"
              value={nama}
              onChange={handleNamaChange}
            />
            <Input
              type="text"
              label="Alamat"
              name="alamat"
              placeholder="Masukan Alamat"
              value={alamat}
              onChange={handleAlamatChange}
            />

            <Input
              type="file"
              label="Foto Avatar"
              name="fotoAvatar"
              onChange={handleFotoAvatarChange}
            />
            <div className="flex gap-3 justify-center md:justify-end pt-5">
              <Button label="Simpan" color="bg-exni" onClick={handleSave} />
              <Button label="Batal" color="bg-red-500" onClick={handleCancel} />
            </div>

            <div className="pt-10">
              <div className="flex items-center py-3 px-4 gap-2 ">
                <p className=" text-sm ">User Login</p>
                <div className="w-[10rem] h-[1px] bg-teks"></div>
              </div>
              <Input
                type="email"
                label="Email"
                name="email"
                placeholder="Masukan Email"
                value={email}
                onChange={handleEmailChange}
              />
              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                placeholder="Masukan Password"
                value={password}
                onChange={handlePasswordChange}
                showPasswordToggle={true}
                onToggle={togglePasswordVisibility}
              />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Konfirmasi Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                showPasswordToggle={true}
                onToggle={toggleConfirmPasswordVisibility}
              />
              <div className="flex gap-3 justify-center pt-5 md:justify-end">
                <Button label="Simpan" color="bg-exni" onClick={handleSave} />
                <Button
                  label="Batal"
                  color="bg-red-500"
                  onClick={handleCancel}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Edit;
