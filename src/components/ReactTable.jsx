import React, { useState } from "react";
import { useTable, useResizeColumns, useBlockLayout } from "react-table";
import styles from "../styles/table.module.css";

const Table = ({ columns, data }) => {
  const [editingCell, setEditingCell] = useState(null);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn: {
          minWidth: 100, // Set default minimum width
          width: 150, // Set default width
        },
      },
      useResizeColumns,
      useBlockLayout
    );

  const handleCellClick = (cell) => {
    setEditingCell(`${cell.row.id}-${cell.column.id}`);
  };

  const handleCellBlur = () => {
    setEditingCell(null);
  };

  console.log(headerGroups);

  return (
    <div className={styles.tableContainer}>
      <table {...getTableProps()} className={styles.excelTable}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className={styles.excelHeader}
                  key={column.id}
                >
                  {column.render("Header")}
                  <div
                    {...column.getResizerProps()}
                    className={styles.resizer}
                  />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className={`${styles.excelCell} ${
                      editingCell === `${row.id}-${cell.column.id}`
                        ? styles.editing
                        : ""
                    }`}
                    onClick={() => handleCellClick(cell)}
                    onBlur={handleCellBlur}
                    key={cell.column.id}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
