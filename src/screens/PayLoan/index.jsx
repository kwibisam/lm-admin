import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@mui/material";
import { useParams } from "react-router-dom";
const PayLoan = () => {
  const { id } = useParams();

  const [paymentData, setPaymentData] = useState({
    amountPaid: null,
    dateOfPayment: null,
    fromAccount: null,
    transactionId: null,
    paymentMode: null,
    paymentCarrier: null
  });


  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setPaymentData({
      ...paymentData,
      [name]: value
    })
  }
  const handleSubmit = async () => {
    console.log(paymentData)
    try{
      const response = await fetch(`http://localhost:8080/api/v1/payments`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          loanId: id
        },
        body: JSON.stringify(paymentData)
      })

      if(!response.ok) {
        const msg = response.text
        alert(msg)
        return
      }

      alert("Payment Success!")
    }catch(error) {
      console.log("theres was an error", error)
      alert("Something went wrong")
    }
  }
  return (
    <Box m="20px">
      <Typography variant="h1">Loan Payment</Typography>
      <Box>
        <Box>
          <Typography>Loan ID</Typography>
          <Typography variant="caption"> {id}</Typography>
        </Box>
      </Box>
      <Box component="form">
        <FormControl fullWidth>
          <TextField type="number" name="amountPaid" value={paymentData.amountPaid} onChange={handleChange} label="AmountPaid" />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="dateOfPay">Date Of Payment</InputLabel>
          <TextField type="date"  name="dateOfPayment" labelId="dateOfPay" value={paymentData.dateOfPayment} onChange={handleChange}/>
        </FormControl>

        <FormControl fullWidth>
          <TextField type="text" name="fromAccount" value={paymentData.fromAccount} onChange={handleChange} label="Source" />
        </FormControl>

        
        <FormControl fullWidth>
          <TextField type="text" name="transactionId" value={paymentData.transactionId} onChange={handleChange} label="Transaction ID" />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="mode">Payment Mode</InputLabel>
          <Select labelId="mode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
            <MenuItem value="bank">Bank</MenuItem>
            <MenuItem value="mobile_money">Mobile Money</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="carrier">Carrier</InputLabel>
          <Select labelId="carrier" name="paymentCarrier" value={paymentData.paymentCarrier} onChange={handleChange}>
            <MenuItem value="Zanaco">Zanaco</MenuItem>
            <MenuItem value="Absa">Absa</MenuItem>
            <MenuItem value="MoMo">MOMO</MenuItem>
            <MenuItem value="AirtelMoney">Airtel Money</MenuItem>
          </Select>
        </FormControl>
       
        <FormControl fullWidth>
            <Button type='button' onClick={handleSubmit}>Save</Button>
        </FormControl>

      </Box>
    </Box>
  );
};

export default PayLoan;
