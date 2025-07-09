import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";

const citiesByState = {
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
};

function EditEmployeeDialog({ open, onClose, employee, onEdit }) {
  const [updatedEmployee, setUpdatedEmployee] = useState({ ...employee });

  useEffect(() => {
    setUpdatedEmployee(employee);
  }, [employee]);

  const handleChange = (field, value) => {
    setUpdatedEmployee({ ...updatedEmployee, [field]: value });
    if (field === "state") {
      setUpdatedEmployee({ ...updatedEmployee, state: value, city: "" });
    }
  };

  const handleSubmit = () => {
    onEdit(updatedEmployee);
    onClose();
  };

  if (!employee) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Employee</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
              label={<span>First Name <span style={{ color: "red" }}>*</span></span>}
              value={updatedEmployee.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              label={<span>Last Name <span style={{ color: "red" }}>*</span></span>}
              value={updatedEmployee.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              value={updatedEmployee.email}
              onChange={(e) => handleChange("email", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              label={<span>Phone Number <span style={{ color: "red" }}>*</span></span>}
              value={updatedEmployee.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              value={updatedEmployee.address}
              onChange={(e) => handleChange("address", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="State"
              value={updatedEmployee.state}
              onChange={(e) => handleChange("state", e.target.value)}
              fullWidth
              margin="dense"
            >
              {Object.keys(citiesByState).map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="City"
              value={updatedEmployee.city}
              onChange={(e) => handleChange("city", e.target.value)}
              fullWidth
              margin="dense"
              disabled={!updatedEmployee.state}
            >
              {(citiesByState[updatedEmployee.state] || []).map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={updatedEmployee.isActive}
                  onChange={(e) => handleChange("isActive", e.target.checked)}
                />
              }
              label="Is Active"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditEmployeeDialog;
