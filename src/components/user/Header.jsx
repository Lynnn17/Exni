import React, { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import IconUser from "../../assets/icon/user.svg";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

const Header = () => {
  const [user, setUser] = useState({ name: "John Doe", role: "Admin" }); // Default user info

  // Fungsi untuk mendekode token dan mendapatkan informasi pengguna
  const getUserInfoFromToken = () => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);
        const userName = decodedToken.company || "Anonymous"; // Ambil nama dari token, jika ada
        const userRole = decodedToken.role || "unauthorized"; // Ambil role dari token, jika ada
        setUser({ name: userName, role: userRole });
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser({ name: "Anonymous", role: "unauthorized" });
      }
    }
  };

  // Ambil informasi user saat komponen dimuat
  useEffect(() => {
    getUserInfoFromToken();
  }, []);

  return (
    <header className="bg-white hidden lg:flex py-4 px-4 w-full h-16 rounded-[8px]">
      <div className="w-full flex justify-between items-center">
        <div>
          <FaMoon className="text-1xl" />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <IoIosNotifications className="text-2xl" />
          <IoMdSettings className="text-2xl" />
          <div className="flex flex-row items-center gap-2 pl-4">
            <img src={IconUser} alt="user" className="w-8 h-8 rounded-full" />
            <div className="pr-6 pl-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
