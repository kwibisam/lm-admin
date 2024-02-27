import * as React from 'react';
import { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Box,
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';

const BorrowerForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    addressLine1: '', // Renamed for clarity
    addressLine2: '', // Renamed for clarity
    alternativePhone: '', // Renamed for consistency
    nrc: '',
    dob: null,
    income: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleDateChange = (event) =>{
    const dateObject = dayjs(event);
    if(dateObject.isValid()){
        const str = dateObject.toISOString()
        console.log("ISO:",str)
        setFormData({ ...formData, ['dob']: str });
    }
    
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Submit form data to your backend API or database
    const response = await fetch('http://localhost:8080/api/v1/borrowers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Borrower data submitted successfully!');
        // Handle successful submission (e.g., clear form, display success message)
      } else {
        console.error('Error submitting data:', response.statusText);
        // Handle submission error
      }
      console.log('Submitted borrower data:', formData);
  };

  return (
    <Box sx={{ border: 1, borderRadius: 2, maxWidth: 1000, mx: 'auto', p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="addressLine1"
              label="Address Line 1"
              variant="outlined"
              fullWidth
              required
              value={formData.addressLine1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="addressLine2"
              label="Address Line 2 (Optional)"
              variant="outlined"
              fullWidth
              value={formData.addressLine2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="phone"
              label="Phone Number"
              variant="outlined"
              fullWidth
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="alternativePhone"
              label="Alternate Phone Number (Optional)"
              variant="outlined"
              fullWidth
              value={formData.alternativePhone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="nrc"
              label="NRC Number"
              variant="outlined"
              fullWidth
              required
              value={formData.nrc}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                label="Date of Birth"
                name="dob"
                value={formData.dob}
                onChange={handleDateChange}
                format="MM/DD/YYYY"
                fullWidth
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="income"
              label="Income Amount"
              variant="outlined"
              fullWidth
              required
              value={formData.income}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Register Borrower
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default BorrowerForm;
