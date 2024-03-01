import * as React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Box } from '@mui/system'; 
import FileUploadComponent from './FileUploadComponent'; // Replace with your implementation

function BorrowerRegistrationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [gender, setGender] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState(null);

  const onSubmit = (data) => { 
    console.log(data); 
    // Handle form submission logic
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <TextField label="First Name" {...register('firstName', { required: true })} error={errors.firstName} />
        <TextField label="Last Name" {...register('lastName', { required: true })} error={errors.lastName} />

        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select value={gender} label="Gender" onChange={(e) => setGender(e.target.value)}>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of Birth"
            value={dateOfBirth}
            onChange={(newValue) => setDateOfBirth(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <TextField label="Phone Number" type="tel" {...register('phoneNumber', { required: true })} error={errors.phoneNumber} />
        <TextField label="Other Phone Number" type="tel" {...register('otherPhoneNumber')} />
        <TextField label="NRC Number" {...register('nrcNumber', { required: true })} error={errors.nrcNumber} />
        <TextField label="Address" {...register('address', { required: true })} error={errors.address} />

        <FileUploadComponent label="NRC Attachment" {...register('nrcAttachment', { required: true })} />
        <FileUploadComponent label="Other Attachments" multiple {...register('otherAttachments')} />

        <Button variant="contained" type="submit">Register Borrower</Button>
      </Box>      
    </form>
  );
}
export default BorrowerRegistrationForm