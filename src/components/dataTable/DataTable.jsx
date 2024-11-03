import React from "react";
import ColumnHeader from "./ColumnHeader";
import DataRow from "./DataRow";

const DataTable = ({ columns, data, actions, onStatusChange, aksi }) => (
  <div className="w-full overflow-x-auto pt-4 md:pt-7 md:px-3 lg:px-7">
    <table className="min-w-full border-collapse border border-gray-300">
      <ColumnHeader columns={columns} actions={actions} actionLabel={aksi} />
      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <DataRow
              key={item.id}
              item={item}
              columns={columns}
              onStatusChange={onStatusChange}
              actions={actions}
            />
          ))
        ) : (
          <tr>
            <td
              colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
              className="py-2 px-4 text-center text-xs sm:text-sm"
            >
              Tidak ada data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default DataTable;
