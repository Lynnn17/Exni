import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoExni from "../assets/logo/exni.svg";
import IconUser from "../assets/icon/user.svg";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { jwtDecode } from "jwt-decode"; // Perbaiki impor menjadi default import

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); // Gunakan null untuk default
  const navigate = useNavigate();

  // Fungsi untuk mengambil dan mendekode token
  const getUserInfoFromToken = () => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        const userName = decodedToken.company || "Annonymous"; // Ambil nama dari token, jika ada
        const userRole = decodedToken.role || "Unauthorized"; // Ambil role dari token, jika ada

        setUser({ name: userName, role: userRole });
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null); // In case the token is invalid
      }
    } else {
      setUser(null); // If no token found, user is not logged in
    }
  };

  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  // Ambil informasi user saat komponen dimuat
  useEffect(() => {
    console.log("Navbar component mounted");
    getUserInfoFromToken();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-between items-center p-2 px-8 bg-white w-full h-[76px] rounded-b-[20px] drop-shadow-xl">
      <img src={LogoExni} className="w-24" alt="logo" />
      <div className="hidden xl:flex items-center gap-10 text-sm">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to={user?.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"}
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          Dashboard
        </NavLink>

        {/* Show Login link if not logged in, otherwise show user profile */}
        {!user?.role ? (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
          >
            Login
          </NavLink>
        ) : (
          <div className="flex items-center gap-2">
            <img src={IconUser} alt="user" className="w-10 h-10 rounded-full" />
            <div className="pr-6 pl-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs">{user.role}</p>
              <button
                onClick={handleLogout}
                className="text-red-500 text-xs mt-1"
              >
                Logout
              </button>
            </div>
          </div>
        )}
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
        <div className="absolute top-[80px] left-0 w-full bg-white shadow-lg rounded-b-[25px] py-4 flex flex-col items-center gap-4 text-xl xl:hidden z-10">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "font-bold" : "")}
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <NavLink
            to={user?.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"}
            className={({ isActive }) => (isActive ? "font-bold" : "")}
            onClick={toggleMenu}
          >
            Dashboard
          </NavLink>

          {/* Show Login link if not logged in, otherwise show user profile */}
          {!user?.role ? (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "font-bold" : "")}
              onClick={toggleMenu}
            >
              Login
            </NavLink>
          ) : (
            <div className="flex items-center gap-2">
              <img
                src={IconUser}
                alt="user"
                className="w-10 h-10 rounded-full"
                loading="lazy"
              />
              <div className="text-center">
                <p className="text-base font-medium">{user.name}</p>
                <p className="text-xs">{user.role}</p>
                <button
                  onClick={() => {
                    toggleMenu();
                    handleLogout();
                  }}
                  className="text-red-500 text-xs mt-1"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
