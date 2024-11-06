import React from "react";
import StatusSelect from "./StatusSelect";
import ActionLinks from "./ActionLinks";

const DataRow = ({ item, columns, onStatusChange, actions }) => (
  <tr>
    {columns.map((column, index) => (
      <td key={index} className="py-2 px-4 text-xs sm:text-sm text-center">
        {column.key === "status" ? (
          <StatusSelect
            value={item.status}
            onChange={(e) => onStatusChange(item.id, e.target.value)}
          />
        ) : (
          item[column.key] || "N/A"
        )}
      </td>
    ))}
    {actions.length > 0 && (
      <td className="py-2 px-4 text-xs sm:text-sm">
        <ActionLinks actions={actions} itemId={item.id} />
      </td>
    )}
  </tr>
);

export default DataRow;
