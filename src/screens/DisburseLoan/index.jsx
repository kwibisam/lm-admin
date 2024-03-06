import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
const DisburseLoan = () => {
  const { id } = useParams();

  const [disburseData, setdisburseData] = useState({
    transactionAmount: null,
    destinationAccount: null,
    transactionId: null,
    mode: null,
    carrier: null,
    date: null
  });


  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setdisburseData({
      ...disburseData,
      [name]: value
    })
  }
  const handleSubmit = async () => {
    console.log(disburseData)
    try{
      const response = await fetch(`http://localhost:8080/api/v1/loans/${id}/disbursement`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(disburseData)
      })

      if(!response.ok) {
        const msg = response.text
        alert(msg)
        return
      }

      alert("Disburse Success!")
    }catch(error) {
      console.log("theres was an error", error)
      alert("Something went wrong")
    }
  }
  return (
    <Box m="20px">
      <Typography variant="h1">Disburse Loan</Typography>
      <Box>
        <Box>
          <Typography>Basic Details</Typography>
          <Typography>Loan ID</Typography>
          <Typography variant="caption"> {id}</Typography>
        </Box>
      </Box>
      <Box component="form">
        <FormControl fullWidth>
          <TextField
            type="number"
            name="transactionAmount"
            label="Transaction Amount"
            value={disburseData.transactionAmount}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            type="text"
            name="destinationAccount"
            label="To Account/Number"
            value={disburseData.destinationAccount}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField type="text" name="transactionId" label="Transaction ID" value={disburseData.transactionId} onChange={handleChange}/>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="mode">Mode</InputLabel>
          <Select labelId="mode" name="mode" value={disburseData.mode} onChange={handleChange}>
            <MenuItem value="bank">Bank</MenuItem>
            <MenuItem value="mobile_money">Mobile Money</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="carrier">Carrier</InputLabel>
          <Select labelId="carrier" name="carrier" value={disburseData.carrier} onChange={handleChange}>
            <MenuItem value="Zanaco">Zanaco</MenuItem>
            <MenuItem value="Absa">Absa</MenuItem>
            <MenuItem value="MoMo">MOMO</MenuItem>
            <MenuItem value="AirtelMoney">Airtel Money</MenuItem>
          </Select>
        </FormControl>

        
        <FormControl fullWidth>
          <InputLabel id="transactionDate">Transaction Date</InputLabel>
          <TextField type="date"  name="date" labelId="transactionDate" value={disburseData.date} onChange={handleChange}/>
        </FormControl>

        <FormControl fullWidth>
          <Button type="button" onClick={handleSubmit}>Save</Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default DisburseLoan;
