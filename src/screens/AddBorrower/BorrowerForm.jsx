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
    console.log("the file",file)
    setFormData({
      ...formData,['nrcFile']:file
    })


  }

  const handleAttachements = (event) => {
    const files = event.target.files
    console.log(files)
    setFormData({
      ...formData,['attachments']:files
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();    
    const Data = new FormData(); // Create a FormData object

    // Append form data fields
    Data.append('firstName', formData.firstName);
    Data.append('lastName', formData.lastName);
    Data.append('addressLine1', formData.addressLine1);
    Data.append('phone', formData.phone);
    Data.append('alternativePhone', formData.alternativePhone);
    Data.append('nrc', formData.nrc);
    Data.append('dob', formData.dob);
    Data.append('income', formData.income);
    Data.append('gender', formData.gender);

     // Append NRC file
     Data.append('nrcFile', formData.nrcFile,formData.nrcFile.name);

    // Append other attachments
    for (let att of formData.attachments) {
      Data.append('attachments', att,att.name);
    }

    try{
      for(const key of Data.keys()){
        // console.log(key)
      }
      const response = await fetch('http://localhost:8080/api/v1/borrowers', {
        method: 'POST',
        body: Data, // Pass formData directly as the body
      });
  
      if (response.ok) {
        console.log('Borrower data submitted successfully!');
        // Handle successful submission (e.g., clear form, display success message)
        alert("Registration Success!")
      } else {
        console.error('Error submitting data:', response.statusText);
        // Handle submission error
        alert(response.statusText)
      }
    }catch(err){
      alert(err) 
    }
   
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
