import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoExni from "../assets/logo/exni.svg";
import IconUser from "../assets/icon/user.svg";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State untuk toggle menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex justify-between items-center p-2 px-8 bg-white w-full h-[95px] rounded-b-[25px] drop-shadow-xl">
      <img src={LogoExni} className="w-28" alt="logo" />
      <div className="hidden xl:flex items-center gap-8 text-xl ">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "font-bold " : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "font-bold " : "")}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "font-bold " : "")}
        >
          Login
        </NavLink>
        <div className="flex items-center gap-2">
          <img src={IconUser} alt="user" className="w-10 h-10 rounded-full" />
          <div className="pr-6 pl-1">
            <p className="text-base font-medium">John Doe</p>
            <p className="text-xs">Admin</p>
          </div>
        </div>
      </div>
      {/* Mobile Menu Icon */}
      <div
        className="flex xl:hidden text-[2rem] cursor-pointer"
        onClick={toggleMenu}
      >
        {isOpen ? <IoMdClose /> : <RxHamburgerMenu />}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-white shadow-lg rounded-b-[25px] py-4 flex flex-col items-center gap-4 text-xl xl:hidden z-10 ">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
            onClick={toggleMenu}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
            onClick={toggleMenu}
          >
            Login
          </NavLink>
          <div className="flex items-center gap-2">
            <img src={IconUser} alt="user" className="w-10 h-10 rounded-full" />
            <div className="text-center">
              <p className="text-base font-medium">John Doe</p>
              <p className="text-xs">Admin</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
