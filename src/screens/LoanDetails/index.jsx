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
  Chip,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "../../theme";
const LoanDetails = () => {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);

  const [loan, setLoan] = useState({});
  const [loanUpdate, setLoanUpdate] = useState({});

  const [shouldRemount, setShouldRemount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleStatusChange = (event) => {
    // setLoanStatus(event.target.value);
    setLoan({
      ...loan,
      ["status"]: event.target.value,
    });
  };

  const handleUpdateStatus = async () => {
    try {
      const patch = {
        status: loan.status,
      };

      const response = await fetch(`http://localhost:8080/api/v1/loans/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });

      if (!response.ok) {
        alert("Update failed");
        return;
      }
      alert("update success");
      setShouldRemount(true);
    } catch (err) {
      alert("something went wrong");
    }
  };

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoan();
  }, [shouldRemount]);

  return isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 400,
      }}
    >
      <CircularProgress sx={{ color: colors.primary[400] }} />
    </Box>
  ) : (
    <>
      <Box m="20px">
        <Typography variant="h1">Manage Loan</Typography>
        <Box>
          <Box>
            <Typography>Basic Details</Typography>
            <Typography>Loan ID</Typography>
            <Typography variant="h5"> {id}</Typography>

            <Typography>Loan State</Typography>
            <Typography variant="caption" sx={{fontSize: 18}}> {loan.status}</Typography>
          </Box>
          <Box display="flex" justifyContent="end"></Box>

          <Box maxWidth="md">
            <Box>
              {loan.status.toLowerCase() === "approved" &&
                !loan.isDisbursed && (
                  <Fab
                    variant="extended"
                    color={colors.primary[400]}
                    size="medium"
                    onClick={() => {
                      navigate(`/disburse-loan/${id}`);
                    }}
                  >
                    <AddIcon sx={{ mr: 1 }} />
                    {/* <Typography variant='caption'>NEW</Typography> */}
                    DISBURSE
                  </Fab>
                )}

              {loan.isDisbursed && loan.status.toLowerCase() === "approved" && (
                <Fab
                  variant="extended"
                  color={colors.primary[400]}
                  size="medium"
                  onClick={() => {
                    navigate(`/pay-loan/${id}`);
                  }}
                >
                  <AddIcon sx={{ mr: 1 }} />
                  {/* <Typography variant='caption'>NEW</Typography> */}
                  ADD PAYMENT
                </Fab>
              )}
            </Box>

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
              <Chip label="UPDATE" onClick={handleUpdateStatus} sx={{ m: 1 }} />
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Loan Amount"
                  variant="outlined"
                  fullWidth
                  value={loan.loanAmount}
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Interest Rate"
                  variant="outlined"
                  fullWidth
                  value={loan.interestRate} // Replace with interest rate from data
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Duration"
                  variant="outlined"
                  fullWidth
                  value={loan.duration}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Repayment Amount"
                  variant="outlined"
                  fullWidth
                  value={loan.repaymentAmount} // Replace with repayment amount from data
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Purpose"
                  variant="outlined"
                  fullWidth
                  value={loan.purpose}
                  disabled
                />
              </Grid>
              {/* Add more fields for loan details */}
            </Grid>
            {/* Additional sections for borrower information, loan details, etc. */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LoanDetails;
