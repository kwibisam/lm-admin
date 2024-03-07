import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { tokens } from "../../theme";

const DisburseLoan = () => {
  const { id } = useParams();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [disburseData, setdisburseData] = useState({
    transactionAmount: "",
    destinationAccount: "",
    transactionId: "",
    mode: "Mobile Money",
    carrier: "Airtel Money",
    date: "",
  });

  const [loan, setLoan] = useState({});
  const [isLoading, setLoading] = useState(true);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdisburseData({
      ...disburseData,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    console.log(disburseData);
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/loans/${id}/disbursement`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(disburseData),
        }
      );

      if (!response.ok) {
        const msg = response.text;
        alert(msg);
        return;
      }

      alert("Disburse Success!");
    } catch (error) {
      console.log("theres was an error", error);
      alert("Something went wrong");
    }
  };

  const fetchLoan = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/v1/loans/${id}`, {
        method: "GET",
      });
      if (!response.ok) {
        const msg = response.text();
        alert(msg);
        return;
      }
      const data = await response.json();
      setLoan(data);
      setdisburseData({
        ...disburseData,
        transactionAmount: data.loanAmount,
      });
    } catch (error) {
      alert("something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoan();
  }, []);

  const inputStyles = {
    marginBottom: "1em",
  };
  return (
    <Box sx={{
      bgcolor: colors.grey[100],
      borderRadius: '1em',
      paddingX: '2em',
      paddingY: '1em',
      m:'20px'
    }}>

      <Box sx={{marginBottom:'1em', bgcolor: '#f9f9f9', borderRadius: '1em',padding:1}}>
        <Typography variant="h1">Disburse Loan</Typography>
      </Box>
      
      {isLoading ? (
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
          <Box>
            <Box sx={{marginBottom:'1em'}}>
              <Typography>Loan ID</Typography>
              <Typography variant="h5"> {id}</Typography>
            </Box>
          </Box>

          <Box display="flex" justifyContent="flex-start" gap={4}>

            <Box component="form">
              <FormControl sx={inputStyles} fullWidth>
                <TextField
                  type="number"
                  name="transactionAmount"
                  label="Transaction Amount"
                  value={disburseData.transactionAmount}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl sx={inputStyles} fullWidth>
                <TextField
                  type="text"
                  name="destinationAccount"
                  label="To Account/Number"
                  value={disburseData.destinationAccount}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl sx={inputStyles} fullWidth>
                <TextField
                  type="text"
                  name="transactionId"
                  label="Transaction ID"
                  value={disburseData.transactionId}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl sx={inputStyles} fullWidth>
                <InputLabel id="mode">Mode</InputLabel>
                <Select
                  variant="standard"
                  labelId="mode"
                  name="mode"
                  value={disburseData.mode}
                  onChange={handleChange}
                >
                  <MenuItem value="Bank">Bank</MenuItem>
                  <MenuItem value="Mobile Money">Mobile Money</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={inputStyles} fullWidth>
                <InputLabel id="carrier">Carrier</InputLabel>
                <Select
                  variant="standard"
                  labelId="carrier"
                  name="carrier"
                  value={disburseData.carrier}
                  onChange={handleChange}
                >
                  <MenuItem value="Zanaco">Zanaco</MenuItem>
                  <MenuItem value="Absa">Absa</MenuItem>
                  <MenuItem value="MoMo">MOMO</MenuItem>
                  <MenuItem value="Airtel Money">Airtel Money</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={inputStyles} fullWidth>
                <TextField
                  variant="standard"
                  type="date"
                  label="DisbursmentDate"
                  name="date"
                  value={disburseData.date}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl fullWidth>
                <Button sx={{bgcolor:colors.primary[400]}} type="button" onClick={handleSubmit}>
                  Save
                </Button>
              </FormControl>
            </Box>

            {/* <Box bgcolor="#b5b5b5" p={2} flexGrow={2}>
              <p>HelloWolrd</p>
            </Box> */}

          </Box>
        </>
      )}
    </Box>
  );
};

export default DisburseLoan;
