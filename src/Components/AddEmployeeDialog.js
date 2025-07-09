import React, { useState } from "react";
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

function AddEmployeeDialog({ open, onClose, onAdd }) {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    state: "",
    city: "",
    isActive: true,
  });

  const handleChange = (field, value) => {
    setEmployee({ ...employee, [field]: value });
    if (field === "state") setEmployee({ ...employee, state: value, city: "" });
  };

  const handleSubmit = () => {
    onAdd(employee);
    onClose();
    setEmployee({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phoneNumber: "",
      state: "",
      city: "",
      isActive: true,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add Employee</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
              label={<span>First Name <span style={{ color: "red" }}>*</span></span>}
              value={employee.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              label={<span>Last Name <span style={{ color: "red" }}>*</span></span>}
              value={employee.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              value={employee.email}
              onChange={(e) => handleChange("email", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              label={<span>Phone Number <span style={{ color: "red" }}>*</span></span>}
              value={employee.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              value={employee.address}
              onChange={(e) => handleChange("address", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="State"
              value={employee.state}
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
              value={employee.city}
              onChange={(e) => handleChange("city", e.target.value)}
              fullWidth
              margin="dense"
              disabled={!employee.state}
            >
              {(citiesByState[employee.state] || []).map((city) => (
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
                  checked={employee.isActive}
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
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEmployeeDialog;
