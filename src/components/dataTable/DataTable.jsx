import React from "react";
import ColumnHeader from "./ColumnHeader";
import DataRow from "./DataRow";

const DataTable = ({
  columns = [],
  data = [],
  actions = [],
  onStatusChange,
  options,
  aksi,
}) => {
  return (
    <div className=" max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-auto pt-4 lg:px-2 w-full">
      <div className="overflow-x-auto rounded-t-lg border border-gray-300">
        <table className="w-full table-auto">
          <ColumnHeader
            columns={columns}
            actions={actions}
            actionLabel={aksi}
          />
          <tbody className="">
            {data.length > 0 ? (
              data.map((item) => (
                <DataRow
                  key={item.no} // Ensure `item.no` is unique
                  item={item}
                  columns={columns}
                  onStatusChange={onStatusChange}
                  actions={actions}
                  options={options}
                  status={item.status}
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
    </div>
  );
};

export default DataTable;
