// HeaderSection.js
import React from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const HeaderSection = ({
  title,
  subtitle,
  linkTo,
  linkText,
  isOpen,
  onToggle,
  children,
  back,
}) => {
  return (
    <>
      <div className="flex items-center justify-between pb-1 px-3">
        <div>
          <p className="text-lg uppercase font-medium">{title}</p>
          <p className="text-xs font-medium">{subtitle}</p>
        </div>
        <div className="flex items-center gap-5">
          <IoSearch className="text-xl cursor-pointer" onClick={onToggle} />
          <Link to={linkTo} className="text-lg">
            {linkText}
          </Link>
        </div>
      </div>
      <div className="w-full h-[1px] bg-teks mt-2"></div>
      {isOpen && children}
    </>
  );
};

export default HeaderSection;
