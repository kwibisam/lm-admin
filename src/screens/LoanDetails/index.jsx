import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Fab,
  useTheme,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip
} from "@mui/material";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "../../theme";
const LoanDetails = () => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [loan, setLoan] = useState({});
  const [shouldRemount, setShouldRemount] = useState(false);

  const handleStatusChange = (event) => {
    // setLoanStatus(event.target.value);
    setLoan({
        ...loan,
        ['status']: event.target.value
    })
  };

  const handleUpdateStatus = async () => {
    try{
        const patch = {
            status: loan.status
        }

        const response = await fetch(`http://localhost:8080/api/v1/loans/${id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patch)
        })

        if(!response.ok) {
            alert("Update failed")
            return;
        }
        alert("update success")
        setShouldRemount(true);
    } catch(err) {
        alert('something went wrong')
    }
   

  };

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/loans/${id}`
        );
        if (!response.ok) {
          alert("Could not fetch loan");
          return;
        }

        const data = await response.json();
        console.log(data);
        setLoan(data);
      } catch (err) {
        alert("Something went wrong");
      }
    };

    fetchLoan();
  }, [shouldRemount]);

  return (
    <Box m="20px">
      <Typography variant="h1">Loan Details</Typography>
      <Box>
        <Box>
          <Typography>Basic Details</Typography>
          <Typography>Loan ID</Typography>
          <Typography variant="caption"> {id}</Typography>
        </Box>
        <Box display="flex" justifyContent="end">

        </Box>
        <Box maxWidth="md">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Loan Amount"
                variant="outlined"
                fullWidth
                value={7000} // Replace with loan amount from data
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="loan-status-label">Loan Status</InputLabel>
                <Select
                  labelId="loan-status-label"
                  value={loan.status}
                  onChange={handleStatusChange}
                  label="Loan Status"
                >
                  <MenuItem value="Pending">Submitted</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                </Select>
              </FormControl>
              <Chip label="UPDATE" onClick={handleUpdateStatus} sx={{m:1}} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Interest Rate"
                variant="outlined"
                fullWidth
                value={20} // Replace with interest rate from data
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Duration"
                variant="outlined"
                fullWidth
                value={5} // Replace with duration from data
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Repayment Amount"
                variant="outlined"
                fullWidth
                value={1680} // Replace with repayment amount from data
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Purpose"
                variant="outlined"
                fullWidth
                value="ghjkl" // Replace with purpose from data
                disabled
              />
            </Grid>
            {/* Add more fields for loan details */}
          </Grid>
          {/* Additional sections for borrower information, loan details, etc. */}
        </Box>
      </Box>
    </Box>
  );
};

export default LoanDetails;
