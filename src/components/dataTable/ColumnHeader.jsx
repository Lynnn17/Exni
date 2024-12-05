import React from "react";

const ColumnHeader = ({ columns }) => (
  <tr className="bg-blue-600 rounded-t-lg">
    {columns.map((column) => (
      <th
        key={column.key}
        className="py-3 px-4 font-semibold text-white border-b border-gray-300 first:rounded-tl-lg last:rounded-tr-lg"
      >
        {column.title}
      </th>
    ))}
    <th className="py-3 px-8 font-semibold text-white border-b border-gray-300 rounded-tr-lg">
      Aksi
    </th>
  </tr>
);

export default ColumnHeader;
