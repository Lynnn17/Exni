import React from "react";
import { FaChevronDown } from "react-icons/fa";

const StatusSelect = ({ value, onChange }) => (
  <div className="relative inline-block">
    <select
      value={value}
      onChange={onChange}
      className="border border-gray-300 bg-exni text-white rounded text-center px-2 pr-8"
      style={{
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
      }}
    >
      <option value="Aktif">Aktif</option>
      <option value="Tidak Aktif">Tidak Aktif</option>
      <option value="Pending">Pending</option>
    </select>
    <span className="absolute right-1 top-1/2 transform -translate-y-1/2">
      <FaChevronDown className="text-gray-600" />
    </span>
  </div>
);

export default StatusSelect;
