import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoExni from "../../assets/logo/exni.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  IoCloseSharp,
  IoHome,
  IoChevronDown,
  IoChevronUp,
} from "react-icons/io5";
import { FaUsers, FaBuilding } from "react-icons/fa";
import { TbBuildingWarehouse } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { IoIosCube } from "react-icons/io";
import { FaHandshakeSimple } from "react-icons/fa6";
import IconUser from "../../assets/icon/user.svg";
import { MdSpaceDashboard } from "react-icons/md";
import { jwtDecode } from "jwt-decode";

const NavMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State untuk dropdown

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const activeClass = "text-black font-semibold"; // Active class styling
  const [user, setUser] = useState({ name: "John Doe", role: "Admin" }); // Default user info

  // Fungsi untuk mendekode token dan mendapatkan informasi pengguna
  const token =
    sessionStorage.getItem("token") || localStorage.getItem("token");
  const getUserInfoFromToken = () => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);
        const userName = decodedToken.company || "Anonymous";
        const userRole = decodedToken.role || "unauthorized";
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
  }, [token]);

  return (
    <>
      <nav className="bg-white flex lg:hidden w-full rounded-[8px] p-4 items-center justify-between h-full">
        <img src={LogoExni} alt="logo" className="w-[100px] h-[38px]" />
        <button onClick={toggleSidebar}>
          <GiHamburgerMenu className="text-3xl" />
        </button>

        {isOpen && (
          <div className="h-screen w-[250px] bg-white fixed top-0 right-0 rounded-[10px] z-10">
            <div className="text-4xl pr-4 pt-3 flex justify-end">
              <button onClick={toggleSidebar}>
                <IoCloseSharp />
              </button>
            </div>
            <div className="overflow-y-auto px-4">
              <div className="px-1">
                <div className="flex items-center gap-2">
                  <img
                    src={IconUser}
                    alt="user"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="pr-6 pl-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs">{user.role}</p>
                  </div>
                </div>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-2xl pt-8 flex items-center ${
                      isActive ? activeClass : "text-teks"
                    }`
                  }
                >
                  <IoHome />
                  <p className="text-sm uppercase pl-3">Beranda</p>
                </NavLink>

                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) =>
                    `text-2xl pt-4 flex items-center ${
                      isActive ? activeClass : "text-teks"
                    }`
                  }
                >
                  <MdSpaceDashboard />
                  <p className="text-sm uppercase pl-3">Dashboard</p>
                </NavLink>

                <div>
                  <div className="text-xs text-teks pt-14 flex items-center">
                    <p className="uppercase">Main Menu</p>
                    <div className="w-20 h-[0.3px] bg-teks ml-1"></div>
                  </div>

                  <NavLink
                    to="/admin/user"
                    className={({ isActive }) =>
                      `flex items-center pt-4 ${
                        isActive ? activeClass : "text-teks"
                      }`
                    }
                  >
                    <FaUsers className="text-2xl" />
                    <p className="text-sm uppercase pl-3 font-medium">
                      Akun Pengguna
                    </p>
                  </NavLink>

                  {/* Dropdown untuk Aset Sewa */}
                  <div className="pt-4">
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center w-full text-teks"
                    >
                      <TbBuildingWarehouse className="text-2xl" />
                      <p className="text-sm uppercase pl-3 font-medium">
                        Aset Sewa
                      </p>
                      {dropdownOpen ? (
                        <IoChevronUp className="ml-auto text-xl" />
                      ) : (
                        <IoChevronDown className="ml-auto text-xl" />
                      )}
                    </button>
                    {dropdownOpen && (
                      <div className="pl-8">
                        <NavLink
                          to="/admin/asset/sewa-tenant"
                          className={({ isActive }) =>
                            `flex items-center pt-2 ${
                              isActive ? activeClass : "text-teks"
                            }`
                          }
                        >
                          <IoIosCube className="text-xl" />
                          <p className="text-sm pl-2">Sewa Tenant</p>
                        </NavLink>
                        <NavLink
                          to="/admin/asset/sewa-building"
                          className={({ isActive }) =>
                            `flex items-center pt-2 ${
                              isActive ? activeClass : "text-teks"
                            }`
                          }
                        >
                          <FaBuilding className="text-xl" />
                          <p className="text-sm pl-2">Sewa Bangunan</p>
                        </NavLink>
                      </div>
                    )}
                  </div>

                  <NavLink
                    to="/admin/submission"
                    className={({ isActive }) =>
                      `flex items-center pt-4 ${
                        isActive ? activeClass : "text-teks"
                      }`
                    }
                  >
                    <FaHandshakeSimple className="text-2xl" />
                    <p className="text-sm uppercase pl-3 font-medium">
                      Pengajuan
                    </p>
                  </NavLink>

                  <NavLink
                    to="/admin/transaction"
                    className={({ isActive }) =>
                      `flex items-center pt-4 ${
                        isActive ? activeClass : "text-teks"
                      }`
                    }
                  >
                    <GiReceiveMoney className="text-2xl" />
                    <p className="text-sm uppercase pl-3 font-medium">
                      Transaksi
                    </p>
                  </NavLink>
                </div>

                <div>
                  <div className="text-xs text-teks pt-14 flex items-center">
                    <p className="uppercase">Aset</p>
                    <div className="w-20 h-[0.3px] bg-teks ml-1"></div>
                  </div>

                  <NavLink
                    to="/admin/asset/building"
                    className={({ isActive }) =>
                      `flex items-center pt-4 ${
                        isActive ? activeClass : "text-teks"
                      }`
                    }
                  >
                    <FaBuilding className="text-2xl" />
                    <p className="text-sm uppercase pl-3 font-medium">Gedung</p>
                  </NavLink>

                  <NavLink
                    to="/admin/asset/tenant"
                    className={({ isActive }) =>
                      `flex items-center pt-4 ${
                        isActive ? activeClass : "text-teks"
                      }`
                    }
                  >
                    <IoIosCube className="text-2xl" />
                    <p className="text-sm uppercase pl-3 font-medium">Tenant</p>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavMobile;
