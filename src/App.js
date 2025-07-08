import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import EmployeeTable from "./Components/EmployeeTable";
import AddEmployeeDialog from "./Components/AddEmployeeDialog";
import EditEmployeeDialog from "./Components/EditEmployeeDialog";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleAddEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: Date.now() }]);
  };

  const handleEditEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setIsEditDialogOpen(true);
  };

  return (
    <Container>
      <Card className="container-card">
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Employee Management System
          </Typography>

          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsAddDialogOpen(true)}
            >
              Add Employee
            </Button>
          </Box>

          <EmployeeTable employees={employees} onEdit={handleEditClick} />

          <AddEmployeeDialog
            open={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
            onAdd={handleAddEmployee}
          />

          {selectedEmployee && (
            <EditEmployeeDialog
              open={isEditDialogOpen}
              onClose={() => setIsEditDialogOpen(false)}
              employee={selectedEmployee}
              onEdit={handleEditEmployee}
            />
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
