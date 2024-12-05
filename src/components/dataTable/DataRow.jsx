import React from "react";
import StatusSelect from "../reusable/StatusSelect";
import ActionLinks from "./ActionLinks";

const DataRow = ({ item, columns, onStatusChange, actions, options }) => (
  <tr>
    {columns.map((column, index) => (
      <td
        key={index}
        className="py-4 px-4 text-xs sm:text-sm text-center border-b"
      >
        {column.key === "status" ? (
          <StatusSelect
            value={item.status}
            options={options}
            onChange={(e) => onStatusChange(item.id, e.target.value)}
          />
        ) : (
          item[column.key] || "N/A"
        )}
      </td>
    ))}
    {actions.length > 0 && (
      <td className="py-2 px-4 text-xs sm:text-sm cursor-pointer border-b">
        <ActionLinks actions={actions} item={item} />
      </td>
    )}
  </tr>
);

export default DataRow;
