import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";

const stateCityMap = {
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

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setEmployee({ ...employee, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!employee.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!employee.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!employee.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!/^[0-9]{10}$/.test(employee.phoneNumber.trim())) {
      newErrors.phoneNumber = "Phone Number must be exactly 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
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
    setErrors({});
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
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
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
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
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
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) {
                  handleChange("phoneNumber", value);
                }
              }}
              inputProps={{ maxLength: 10 }}
              fullWidth
              margin="dense"
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber}
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
              {Object.keys(stateCityMap).map((state) => (
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
              {(stateCityMap[employee.state] || []).map((city) => (
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
