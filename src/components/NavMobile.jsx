import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoExni from "../assets/logo/exni.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp, IoHome } from "react-icons/io5";
import { FaUsers, FaBuilding, FaCarSide } from "react-icons/fa";
import { TbBuildingWarehouse } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { IoIosCube } from "react-icons/io";
import { FaHandshakeSimple } from "react-icons/fa6";
import IconUser from "../assets/icon/user.svg";

const NavMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const activeClass = "text-black font-semibold"; // Active class styling

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
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs">Admin</p>
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
                  <p className="text-sm uppercase pl-3">Dashboard</p>
                </NavLink>

                <div>
                  <div className="text-xs text-teks pt-14 flex items-center">
                    <p className="uppercase">Main Menu</p>
                    <div className="w-20 h-[0.3px] bg-teks ml-1"></div>
                  </div>

                  <NavLink
                    to="/users"
                    className={({ isActive }) =>
                      `flex items-center pt-4 ${
                        isActive ? activeClass : "text-teks"
                      }`
                    }
                  >
                    <FaUsers className="text-2xl" />
                    <p className="text-sm uppercase pl-3 font-medium">Users</p>
                  </NavLink>

                  <NavLink
                    to="/assets"
                    className={({ isActive }) =>
                      `flex items-center pt-4 ${
                        isActive ? activeClass : "text-teks"
                      }`
                    }
                  >
                    <TbBuildingWarehouse className="text-2xl" />
                    <p className="text-sm uppercase pl-3 font-medium">Assets</p>
                  </NavLink>

                  <NavLink
                    to="/submissions"
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
                    to="/transactions"
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
                    to="/buildings"
                    className={({ isActive }) =>
                      `flex items-center pt-4 ${
                        isActive ? activeClass : "text-teks"
                      }`
                    }
                  >
                    <FaBuilding className="text-2xl" />
                    <p className="text-sm uppercase pl-3 font-medium">
                      Buildings
                    </p>
                  </NavLink>

                  <NavLink
                    to="/tenants"
                    className={({ isActive }) =>
                      `flex items-center pt-4 ${
                        isActive ? activeClass : "text-teks"
                      }`
                    }
                  >
                    <IoIosCube className="text-2xl" />
                    <p className="text-sm uppercase pl-3 font-medium">Tenant</p>
                  </NavLink>

                  <NavLink
                    to="/vehicles"
                    className={({ isActive }) =>
                      `flex items-center pt-4 ${
                        isActive ? activeClass : "text-teks"
                      }`
                    }
                  >
                    <FaCarSide className="text-2xl" />
                    <p className="text-sm uppercase pl-3 font-medium">
                      Vehicle
                    </p>
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
