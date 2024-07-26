import React, { useState } from "react";
import {
  useTable,
  useResizeColumns,
  useBlockLayout,
  usePagination,
} from "react-table";
import styles from "../styles/table.module.css";
import { useCallback } from "react";

const Table = ({ columns, data, setData }) => {
  const [editingCell, setEditingCell] = useState(null);

  const updateMyData = useCallback(
    (rowIndex, columnId, value) => {
      setData((oldData) =>
        oldData.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...row,
              [columnId]: value,
            };
          }
          return row;
        })
      );
    },
    [setData]
  );

  const {
    // getTableProps, getTableBodyProps, headerGroups, rows, prepareRow
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      updateMyData,
      defaultColumn: {
        minWidth: 100, // Set default minimum width
        width: 150, // Set default width
      },
    },
    useResizeColumns,
    useBlockLayout,
    usePagination
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
          {headerGroups.map((headerGroup, i) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={`header-group-${i}`}
            >
              {headerGroup.headers.map((column, j) => (
                <th
                  {...column.getHeaderProps()}
                  className={styles.excelHeader}
                  key={`header-${i}-${j}`}
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
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={`row-${i}`}>
                {row.cells.map((cell, j) => (
                  <td
                    {...cell.getCellProps()}
                    className={`${styles.excelCell} ${
                      editingCell === `${row.id}-${cell.column.id}`
                        ? styles.editing
                        : ""
                    }`}
                    onClick={() => handleCellClick(cell)}
                    onBlur={handleCellBlur}
                    key={`cell-${i}-${j}`}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "50px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Table;
