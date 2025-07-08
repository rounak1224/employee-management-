import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, MenuItem, FormControlLabel, Checkbox
} from "@mui/material";

const cityOptions = {
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
};

function EditEmployeeDialog({ open, onClose, employee, onEdit }) {
  const [form, setForm] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    state: "",
    city: "",
    isActive: false,
  });

  useEffect(() => {
    if (employee) setForm(employee);
  }, [employee]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (name === "state") setForm((prev) => ({ ...prev, city: "" }));
  };

  const handleSubmit = () => {
    onEdit(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Employee</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ pt: 1 }}>
          <Grid item xs={6}>
            <TextField fullWidth name="firstName" label="First Name" value={form.firstName} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth name="lastName" label="Last Name" value={form.lastName} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth name="email" label="Email" value={form.email} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth name="address" label="Address" value={form.address} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth name="phoneNumber" label="Phone Number" value={form.phoneNumber} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              name="state"
              label="State"
              value={form.state}
              onChange={handleChange}
            >
              {Object.keys(cityOptions).map((state) => (
                <MenuItem key={state} value={state}>{state}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              name="city"
              label="City"
              value={form.city}
              onChange={handleChange}
              disabled={!form.state}
            >
              {(cityOptions[form.state] || []).map((city) => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                />
              }
              label="Is Active"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditEmployeeDialog;
