import { useState, useMemo } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import generateFakeData from "./generateFakeData";
import Table from "./components/ReactTable";
import EditableCell from "./components/EditableCell";
import { useEffect } from "react";
import sampleData from "./data.json";

function App() {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
            Cell: EditableCell,
          },
          {
            Header: "Last Name",
            accessor: "lastName",
            Cell: EditableCell,
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
            Cell: EditableCell,
          },
          {
            Header: "Visits",
            accessor: "visits",
            Cell: EditableCell,
          },
          {
            Header: "Status",
            accessor: "status",
            Cell: EditableCell,
          },
          {
            Header: "Progress",
            accessor: "progress",
            Cell: EditableCell,
          },
        ],
      },
    ],
    []
  );

  const [data, setData] = useState(sampleData);

  return (
    <>
      <Table data={data} columns={columns} />
    </>
  );
}

export default App;
