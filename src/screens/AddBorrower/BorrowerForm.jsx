import * as React from 'react';
import { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Box,
  InputLabel,
  
} from '@mui/material';
import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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
    gender: '',
    nrcFile: null,
    attachments: [],
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

  const handleNrcFile =(event) =>{
    const file = event.target.files[0]
    if(file.type !== 'image/jpeg' || file.type !==  'application/pdf') {
      alert("please provide jpeg imae or pdf file")
      return
    }else if (file.size > 1024 * 1024) {
      alert('File size should not exceed 1MB.');
      return;
    } else{
      setFormData({
        ...formData,['nrcFile']:file
      })
    }


  }

  const handleAttachements = (event) => {
    const files = event.target.files
    setFormData({
      ...formData,['attachments']:files
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(); // Create a FormData object

    // Append form data fields
    formData.append('firstName', formData.firstName);
    formData.append('lastName', formData.lastName);
    formData.append('addressLine1', formData.addressLine1);
    formData.append('phone', formData.phone);
    formData.append('alternativePhone', formData.alternativePhone);
    formData.append('nrc', formData.nrc);
    formData.append('dob', formData.dob);
    formData.append('income', formData.income);
    formData.append('gender', formData.gender);

     // Append NRC file
    formData.append('nrcFile', formData.nrcFile);

    // Append other attachments
    const otherAttachments = document.getElementById('attachments').files;
    for (let i = 0; i < otherAttachments.length; i++) {
      formData.append('attachments[]', otherAttachments[i]);
    }

    // const response = await fetch('http://localhost:8080/api/v1/borrowers', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // });

    const response = await fetch('http://localhost:8080/api/v1/borrowers', {
      method: 'POST',
      body: formData, // Pass formData directly as the body
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
              variant="filled"
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
              variant="filled"
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
              variant="filled"
              fullWidth
              required
              value={formData.addressLine1}
              onChange={handleChange}
            />
          </Grid>
     
          <Grid item xs={6}>
            <TextField
              name="phone"
              label="Phone Number"
              variant="filled"
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
              variant="filled"
              fullWidth
              value={formData.alternativePhone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="nrc"
              label="NRC Number"
              variant="filled"
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
                variant='filled'
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
              variant="filled"
              fullWidth
              required
              value={formData.income}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid>
              <FormControl fullWidth>
                <InputLabel id="gender-select">Gender</InputLabel>
                  <Select
                    name='gender'
                    variant='filled'
                    labelId="gender-select"
                    id="gender-select"
                    value={formData.gender}
                    label="Gender"
                    onChange={handleChange}
                  >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
            <Box>
                <label htmlFor='nrcFile'>NRC Copy</label>
              </Box>
            <Box>
              <input type='file' name='nrcFile' id ='nrcFile'  required onChange={handleNrcFile}/>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box>
                <label htmlFor='attachments'>Other Attachments</label>
              </Box>
            <Box>
              <input type='file' name='attachments[]' multiple id ='attachments' onChange={handleAttachements}/>
            </Box>
          </Grid>

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
