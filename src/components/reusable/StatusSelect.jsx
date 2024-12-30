import React from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useFormikContext } from "formik";

const StatusSelect = ({
  value = "",
  options = [],
  customStyles = {}, // Custom styles prop
  name, // Add name prop
}) => {
  const formikContext = useFormikContext();
  const isFormik = !!formikContext;

  // Handle perubahan nilai
  const handleChange = (e) => {
    const selectedValue = e.target.value;

    if (isFormik) {
      // Jika digunakan dengan Formik
      formikContext.setFieldValue(name, selectedValue);
    } else if (onChange) {
      // Jika digunakan tanpa Formik
      onChange(selectedValue);
    }
  };

  return (
    <div className="relative inline-block w-fit">
      <select
        name={name} // Pass the name prop here
        value={value}
        onChange={handleChange}
        className={`border border-gray-300 text-center py-1 w-[8rem] text-xs font-semibold rounded-lg pr-8 ${
          customStyles.selectBg || "bg-ungu"
        } ${customStyles.textColor || "text-white"}`}
        style={{
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          ...customStyles.select, // Merging custom styles for select
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <HiOutlinePencilAlt
          className={`text-lg ${customStyles.iconColor || "text-white"}`}
        />
      </span>
    </div>
  );
};

export default StatusSelect;
