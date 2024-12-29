import React from "react";
import { FaMoon } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import IconUser from "../../assets/icon/user.svg";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = "text-blue-500";
  const defaultStyle = "text-gray-600 hover:text-gray-800";

  return (
    <header className="bg-white hidden lg:flex py-4 px-4 w-full h-16 rounded-[8px]">
      <div className="w-full flex justify-between items-center">
        <div>
          <FaMoon className="text-1xl" />
        </div>
        <div className="flex flex-row gap-4 items-center">
          <NavLink
            to="/user/notifikasi"
            className={({ isActive }) =>
              isActive ? activeStyle : defaultStyle
            }
          >
            <IoIosNotifications className="text-2xl" />
          </NavLink>
          <IoMdSettings className="text-2xl" />
          <div className="flex flex-row items-center gap-2 pl-4">
            <img src={IconUser} alt="user" className="w-8 h-8 rounded-full" />
            <div className="pr-6 pl-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs">User</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
