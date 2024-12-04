import React from "react";

const ColumnHeader = ({ columns }) => (
  <tr className="bg-blue-600">
    {columns.map((column) => (
      <th
        key={column.key}
        className="py-3 px-4 font-semibold text-white border-b border-gray-300"
      >
        {column.title}
      </th>
    ))}
    <th className="py-3 px-4 font-semibold text-white border-b border-gray-300">
      Aksi
    </th>
  </tr>
);

export default ColumnHeader;
