import EditableCell from "./EditableCell";

const groupColumns = (columns) => {
  const groups = {};
  columns.forEach((column) => {
    const [groupName, columnName] = column.split(".");
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(columnName);
  });
  return Object.entries(groups).map(([groupName, columns]) => ({
    Header: groupName,
    columns: columns.map((column) => ({
      Header: column,
      accessor: `${groupName}.${column}`,
    })),
  }));
};

export const generateColumnsFromData = (data, updateMyData) => {
  if (data.length === 0) return [];

  const sampleRow = data[0];
  const columns = Object.keys(sampleRow);

  const groupedColumns = groupColumns(columns);

  return groupedColumns.map((group) => ({
    ...group,
    columns: group.columns.map((column) => ({
      ...column,
      Cell: ({ cell }) => (
        <EditableCell
          value={cell.value}
          row={cell.row}
          column={cell.column}
          updateMyData={updateMyData}
        />
      ),
    })),
  }));
};
