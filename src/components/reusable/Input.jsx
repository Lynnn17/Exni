import React from "react";
import { GrFormViewHide } from "react-icons/gr";
import { FaRegEye } from "react-icons/fa";

const Input = ({
  type = "text",
  name,
  placeholder = "",
  value,
  onChange,
  showPasswordToggle = false,
  onToggle,
  nameClass = "",
}) => {
  const renderIcon = () =>
    type === "password" ? (
      <FaRegEye className="mr-1" />
    ) : (
      <GrFormViewHide className="mr-1" />
    );

  return (
    <div className="px-4 py-1 flex items-center">
      {type === "file" ? (
        <input
          type="file"
          name={name}
          accept="image/*"
          onChange={onChange}
          className={`border border-gray-200 text-black px-4 py-3 w-full ${nameClass}`}
        />
      ) : (
        <div className="relative flex w-full">
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`border border-gray-200 text-black px-4 py-2 flex-grow rounded-l-md w-[90%] ${nameClass}`}
          />
          {showPasswordToggle && (
            <button
              type="button"
              onClick={onToggle}
              className={`absolute right-0 top-0 h-full px-2 text-gray-500 rounded-r-md border border-l-0 border-gray-200 flex items-center ${nameClass}`}
            >
              {renderIcon()}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
