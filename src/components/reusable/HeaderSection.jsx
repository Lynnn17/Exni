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
  hiddenSearch = false,
}) => {
  return (
    <header className="space-y-2">
      <div className="flex items-center justify-between pb-1 px-3">
        <div>
          <p className="text-lg uppercase font-medium">{title}</p>
          <p className="text-xs font-medium text-gray-500">{subtitle}</p>
        </div>
        <div className="flex items-center gap-5">
          {!hiddenSearch && (
            <button
              onClick={onToggle}
              aria-label="Toggle Search"
              className="text-xl cursor-pointer text-gray-700 hover:text-gray-900"
            >
              <IoSearch />
            </button>
          )}
          {linkTo && (
            <Link
              to={linkTo}
              className="text-lg text-black hover:text-blue-700"
            >
              {linkText}
            </Link>
          )}
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-300 mt-2"></div>
      {isOpen && <div className="mt-2">{children}</div>}
    </header>
  );
};

export default HeaderSection;
