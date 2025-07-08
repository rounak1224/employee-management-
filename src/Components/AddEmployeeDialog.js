import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Grid
} from "@mui/material";

const statesAndCities = {
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
};

function AddEmployeeDialog({ open, onClose, onAdd }) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", address: "",
    phoneNumber: "", state: "", city: "", isActive: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onAdd(form);
    onClose();
    setForm({
      firstName: "", lastName: "", email: "", address: "",
      phoneNumber: "", state: "", city: "", isActive: false,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add Employee</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <TextField label="First Name" name="firstName" fullWidth value={form.firstName} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Last Name" name="lastName" fullWidth value={form.lastName} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" name="email" type="email" fullWidth value={form.email} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Address" name="address" fullWidth value={form.address} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Phone Number" name="phoneNumber" fullWidth value={form.phoneNumber} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="State"
              name="state"
              fullWidth
              value={form.state}
              onChange={handleChange}
            >
              {Object.keys(statesAndCities).map((state) => (
                <MenuItem key={state} value={state}>{state}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="City"
              name="city"
              fullWidth
              value={form.city}
              onChange={handleChange}
              disabled={!form.state}
            >
              {form.state && statesAndCities[form.state].map((city) => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEmployeeDialog;
