import React from "react";

const ColumnHeader = ({ columns, actions, actionLabel }) => (
  <thead>
    <tr className="border border-gray-400 uppercase">
      {columns.map((column, index) => (
        <th key={index} className="py-2 px-4 text-center text-xs sm:text-sm">
          {column.title}
        </th>
      ))}
      {actions.length > 0 && (
        <th className="py-2 px-4 text-center text-xs sm:text-sm">
          {actionLabel}
        </th>
      )}
    </tr>
  </thead>
);

export default ColumnHeader;
