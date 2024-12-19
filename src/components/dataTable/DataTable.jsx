import React from "react";
import ColumnHeader from "./ColumnHeader";
import DataRow from "./DataRow";

const DataTable = ({
  columns,
  data,
  actions,
  onStatusChange,
  options,
  aksi,
}) => (
  <div className="overflow-x-auto pt-4 lg:px-2 w-full ">
    <div className="overflow-x-auto rounded-t-lg border border-gray-300">
      <table className="w-full table-auto">
        <ColumnHeader columns={columns} actions={actions} actionLabel={aksi} />
        <tbody>
          {data?.length > 0 ? (
            data?.map((item) => (
              <DataRow
                key={item.no}
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

export default DataTable;
