import React from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";

const StatusSelect = ({ value, onChange, options = [] }) => (
  <div className="relative inline-block w-fit">
    <select
      value={value}
      onChange={onChange}
      className="border border-gray-300 bg-ungu text-white rounded text-center py-1 w-[8rem] text-xs font-semibold rounded-lg pr-2"
      style={{
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <span className="absolute right-1 top-1/2 transform -translate-y-1/2">
      <HiOutlinePencilAlt className="text-white text-lg" />
    </span>
  </div>
);

export default StatusSelect;
