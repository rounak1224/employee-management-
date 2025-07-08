import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Checkbox } from "@mui/material";

function EmployeeTable({ employees, onEdit }) {
  const columns = [
    { field: "id", headerName: "ID", flex: 1 }, 
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
    { field: "state", headerName: "State", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    {
      field: "isActive",
      headerName: "Is Active",
      flex: 0.5,
      renderCell: (params) => <Checkbox checked={params.value} disabled />,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.7,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => onEdit(params.row)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={employees}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        columnVisibilityModel={{ id: false }} 
      />
    </div>
  );
}

export default EmployeeTable;
