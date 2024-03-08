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
  Button,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { tokens } from "../../theme";
import { Link, useNavigate } from "react-router-dom";
const PayLoan = () => {
  const base_url = process.env.REACT_APP_BASE_URL
  const { id } = useParams();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    amountPaid: "",
    dateOfPayment: "",
    fromAccount: "",
    transactionId: "",
    paymentMode: "Mobile Money",
    paymentCarrier: "AirtelMoney"
  });

  const [loan,setLoan] = useState({})
  const [isLoading, setLoading] = useState(true)

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      const response = await fetch(`${base_url}payments`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          loanId: id
        },
        body: JSON.stringify(paymentData)
      })

      if(!response.ok) {
        const message = await response.text()
        throw new Error(JSON.parse(message).message);
      }

      alert("Payment Success!")
      navigate(`/loan-details/${id}`)
    }catch(error) {
      console.log("theres was an error", error)
      alert("Something went wrong"+error.message)
    }
  }

  const fetchLoan = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${base_url}loans/${id}`,{
        method: 'GET'
      })
      if(!response.ok){
        const msg = response.text()
        alert(msg)
        return
      }
      const data = await response.json()
      setLoan(data)
      setPaymentData({
        ...paymentData,
        amountPaid: data.repaymentAmount,

      })
    } catch (error) {
      alert("something went wrong")
      console.log(error)
    } finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchLoan()
  }, [])

  const inputStyles={
    marginBottom:'1em',
  }
  return (
    <Box sx={{
      bgcolor: colors.grey[100],
      borderRadius: '1em',
      paddingX: '2em',
      paddingY: '1em',
      m:'20px'
    }}>
      
      <Box sx={{marginBottom:'1em', bgcolor: '#f9f9f9', borderRadius: '1em',padding:1}}>
        <Typography variant="h1">Loan Payment</Typography>
      </Box>
      
      <Box m="10px">
        <Box>
          <Typography>Loan ID</Typography>
          <Typography variant="h5"> {id}</Typography>
        </Box>
      </Box>

      <Box m="10px" display="flex" justifyContent='space-between'>
      <Box component="form">

        <FormControl fullWidth sx={inputStyles}>
          <TextField variant="standard" type="number" name="amountPaid" value={paymentData.amountPaid} onChange={handleChange} label="AmountPaid" />
        </FormControl>

        <FormControl fullWidth sx={inputStyles}>
          <TextField variant="standard" type="date" label="PaymentDate" name="dateOfPayment" value={paymentData.dateOfPayment} onChange={handleChange}/>
        </FormControl>

        <FormControl fullWidth sx={inputStyles}>
          <TextField variant="standard" type="text" name="fromAccount" value={paymentData.fromAccount} onChange={handleChange} label="Source" />
        </FormControl>

        
        <FormControl fullWidth sx={inputStyles}>
          <TextField variant="standard" type="text" name="transactionId" value={paymentData.transactionId} onChange={handleChange} label="Transaction ID" />
        </FormControl>

        <FormControl fullWidth sx={inputStyles}>
          <InputLabel id="mode">Payment Mode</InputLabel>
          <Select variant="standard" labelId="mode" name="paymentMode" value={paymentData.paymentMode} onChange={handleChange}>
            <MenuItem value="Bank">Bank</MenuItem>
            <MenuItem value="Mobile Money">Mobile Money</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={inputStyles}>
          <InputLabel id="carrier">Carrier</InputLabel>
          <Select variant="standard" defaultValue=" " labelId="carrier" name="paymentCarrier" value={paymentData.paymentCarrier} onChange={handleChange}>
            <MenuItem value="Zanaco">Zanaco</MenuItem>
            <MenuItem value="Absa">Absa</MenuItem>
            <MenuItem value="MoMo">MOMO</MenuItem>
            <MenuItem value="AirtelMoney">Airtel Money</MenuItem>
          </Select>
        </FormControl>
       
        <FormControl fullWidth>
            <Button sx={{bgcolor:colors.primary[400]}} type='button' onClick={handleSubmit}>Save</Button>
        </FormControl>

      </Box>
        <Box flexGrow={2}>

        </Box>
     
      </Box>
      
    </Box>
  );
};


export default PayLoan;
