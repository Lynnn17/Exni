import React from "react";
import { GrFormViewHide } from "react-icons/gr";
import { FaRegEye } from "react-icons/fa";
import { ErrorMessage, Field } from "formik";

const Input = ({
  type,
  label,
  name,
  placeholder,
  value,
  onChange,
  showPasswordToggle,
  onToggle,
}) => {
  return (
    <div className="px-4 py-1 flex items-center">
      <p className="w-[13rem]">{label}</p>
      {type === "file" ? (
        <>
          <Field
            type="file"
            name={name}
            accept="image/*"
            onChange={onChange}
            className="border border-gray-200 text-black px-4 py-3 w-[100%]"
          />
          <ErrorMessage
            name={name}
            component="div"
            className="text-red-500 pl-4"
          />
        </>
      ) : (
        <div className="relative flex w-full ">
          <Field
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="border border-gray-200 text-black px-4 py-2 flex-grow rounded-l-md w-[90%]"
          />
          {showPasswordToggle && (
            <button
              type="button"
              onClick={onToggle}
              className="absolute right-0 top-0 h-full px-2 text-gray-500 rounded-r-md border border-l-0 border-gray-200 flex items-center"
            >
              {type === "password" ? (
                <FaRegEye className="mr-1" />
              ) : (
                <GrFormViewHide className="mr-1" />
              )}
            </button>
          )}
          <ErrorMessage
            name={name}
            component="div"
            className="text-red-500 pl-4"
          />
        </div>
      )}
    </div>
  );
};

export default Input;
