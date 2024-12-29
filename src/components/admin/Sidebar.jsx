import React from "react";
import { NavLink } from "react-router-dom";
import LogoExni from "../../assets/logo/exni.svg";
import { IoHome } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { TbBuildingWarehouse } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { FaBuilding } from "react-icons/fa";
import { IoIosCube } from "react-icons/io";
import { FaCarSide } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";

const Sidebar = () => {
  const activeStyle = "text-black font-semibold";
  const defaultStyle = "text-teks";
  return (
    <aside className=" bg-white border-gray-200 border-2 px-2 sm:px-4 py-2.5 rounded left-0 top-0 overflow-y-auto w-60 ">
      <div className="px-1">
        <img src={LogoExni} alt="logo" className="w-[100px] h-[38px]" />

        <div className="text-2xl text-teks pt-8 cursor-pointer flex items-center">
          <IoHome />
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? activeStyle : defaultStyle} text-sm uppercase pl-3`
            }
          >
            Beranda
          </NavLink>
        </div>

        <div className="text-2xl text-teks pt-4 cursor-pointer flex items-center">
          <MdSpaceDashboard />
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `${isActive ? activeStyle : defaultStyle} text-sm uppercase pl-3`
            }
          >
            Dashboard
          </NavLink>
        </div>

        <div className="text-2xl text-teks pt-4 cursor-pointer flex items-center">
          <IoIosNotifications />
          <NavLink
            to="/admin/notifikasi"
            className={({ isActive }) =>
              `${isActive ? activeStyle : defaultStyle} text-sm uppercase pl-3`
            }
          >
            Notifikasi
          </NavLink>
        </div>

        <div>
          <div className="text-xs text-teks pt-10 cursor-pointer flex items-center">
            <p className="uppercase">Main Menu</p>
            <div className="w-20 h-[0.3px] bg-teks ml-1"></div>
          </div>

          <div className="flex pt-4 items-center">
            <FaUsers className="text-2xl" />
            <NavLink
              to="/admin/user"
              className={({ isActive }) =>
                `${
                  isActive ? activeStyle : defaultStyle
                } text-sm uppercase pl-3 font-medium`
              }
            >
              Akun pelanggan
            </NavLink>
          </div>

          <div className="flex pt-4 items-center">
            <TbBuildingWarehouse className="text-2xl" />
            <NavLink
              to="/admin/asset/sewa-aset"
              className={({ isActive }) =>
                `${
                  isActive ? activeStyle : defaultStyle
                } text-sm uppercase pl-3 font-medium`
              }
            >
              Aset Sewa
            </NavLink>
          </div>

          <div className="flex pt-4 items-center">
            <FaHandshakeSimple className="text-2xl" />
            <NavLink
              to="/admin/submission"
              className={({ isActive }) =>
                `${
                  isActive ? activeStyle : defaultStyle
                } text-sm uppercase pl-3 font-medium`
              }
            >
              Pengajuan
            </NavLink>
          </div>

          <div className="flex pt-4 items-center">
            <GiReceiveMoney className="text-2xl" />
            <NavLink
              to="/admin/transaction"
              className={({ isActive }) =>
                `${
                  isActive ? activeStyle : defaultStyle
                } text-sm uppercase pl-3 font-medium`
              }
            >
              Transaksi
            </NavLink>
          </div>
        </div>

        <div>
          <div className="text-xs text-teks pt-10 cursor-pointer flex items-center">
            <p className="uppercase">Assets</p>
            <div className="w-20 h-[0.3px] bg-teks ml-1"></div>
          </div>

          <div className="flex pt-4 items-center">
            <FaBuilding className="text-2xl" />
            <NavLink
              to="/admin/asset/building"
              className={({ isActive }) =>
                `${
                  isActive ? activeStyle : defaultStyle
                } text-sm uppercase pl-3 font-medium`
              }
            >
              Gedung
            </NavLink>
          </div>

          <div className="flex pt-4 items-center">
            <IoIosCube className="text-2xl" />
            <NavLink
              to="/admin/asset/tenant"
              className={({ isActive }) =>
                `${
                  isActive ? activeStyle : defaultStyle
                } text-sm uppercase pl-3 font-medium`
              }
            >
              Tenant
            </NavLink>
          </div>

          <div className="flex pt-4 items-center">
            <FaCarSide className="text-2xl" />
            <NavLink
              to="/admin/asset/vehicle"
              className={({ isActive }) =>
                `${
                  isActive ? activeStyle : defaultStyle
                } text-sm uppercase pl-3 font-medium`
              }
            >
              Kendaraan
            </NavLink>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
