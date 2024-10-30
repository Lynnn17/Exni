import React, { useState } from "react";
import LogoExni from "../assets/logo/exni.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { TbBuildingWarehouse } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { FaBuilding } from "react-icons/fa";
import { IoIosCube } from "react-icons/io";
import { FaCarSide } from "react-icons/fa";
import IconUser from "../assets/icon/user.svg";

const NavMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-white flex lg:hidden w-full rounded-[8px] p-4 items-center justify-between ">
        <img src={LogoExni} alt="logo" className="w-[100px] h-[38px]" />
        <button onClick={toggleSidebar}>
          <GiHamburgerMenu className="text-3xl" />
        </button>

        {isOpen && (
          <div className="h-full w-[300px] bg-white absolute top-0 right-0 rounded-[10px]">
            <div className="text-4xl pr-4 pt-3 flex justify-end">
              <button onClick={toggleSidebar}>
                <IoCloseSharp />
              </button>
            </div>
            <div>
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
                  <div className="text-2xl text-teks pt-8  cursor-pointer flex items-center">
                    <IoHome />
                    <p className="text-sm uppercase pl-3 ">Dashboard</p>
                  </div>

                  <div>
                    <div className="text-xs text-teks pt-14 cursor-pointer flex items-center">
                      <p className="uppercase ">Main Menu</p>
                      <div className="w-20 h-[0.3px] bg-teks ml-1"></div>
                    </div>

                    <div className="flex pt-4">
                      <FaUsers className="text-2xl " />
                      <p className="text-sm uppercase pl-3 font-medium ">
                        Users
                      </p>
                    </div>

                    <div className="flex pt-4">
                      <TbBuildingWarehouse className="text-2xl " />
                      <p className="text-sm uppercase pl-3 font-medium ">
                        Assets
                      </p>
                    </div>

                    <div className="flex pt-4">
                      <GiReceiveMoney className="text-2xl " />
                      <p className="text-sm uppercase pl-3 font-medium ">
                        Transactions
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-teks pt-14 cursor-pointer flex items-center">
                      <p className="uppercase ">Assets</p>
                      <div className="w-20 h-[0.3px] bg-teks ml-1"></div>
                    </div>

                    <div className="flex pt-4">
                      <FaBuilding className="text-2xl " />
                      <p className="text-sm uppercase pl-3 font-medium ">
                        Buildings
                      </p>
                    </div>

                    <div className="flex pt-4">
                      <IoIosCube className="text-2xl " />
                      <p className="text-sm uppercase pl-3 font-medium ">
                        Tenant
                      </p>
                    </div>

                    <div className="flex pt-4">
                      <FaCarSide className="text-2xl " />
                      <p className="text-sm uppercase pl-3 font-medium ">
                        Vehicle
                      </p>
                    </div>
                  </div>
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
