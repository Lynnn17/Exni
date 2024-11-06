import React from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";

const StatusSelect = ({ value, onChange }) => (
  <div className="relative inline-block">
    <select
      value={value}
      onChange={onChange}
      className="border border-gray-300 bg-ungu text-white rounded text-center py-1 w-[8rem] text-sm font-semibold rounded-lg pr-2"
      style={{
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
      }}
    >
      <option value="pengajuan">Pengajuan</option>
      <option value="Tidak Aktif">Tidak Aktif</option>
      <option value="Pending">Pending</option>
    </select>
    <span className="absolute right-1 top-1/2 transform -translate-y-1/2">
      <HiOutlinePencilAlt className="text-white text-lg" />
    </span>
  </div>
);

export default StatusSelect;
