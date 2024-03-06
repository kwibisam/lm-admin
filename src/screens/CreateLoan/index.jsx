import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Container,
  Typography,
  Divider,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";

import { Link, useNavigate } from 'react-router-dom';

const CreateLoan = () => {

  const navigate = useNavigate()
  const [borrower,setBorrower] = useState({
    firstName: "",
    lastName: "",
    phone:"",
    id: ""
  })

  
  const [loanProducts, setLoanProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loanProd,setLoanProd] = useState(null)
  const [loanData, setLoanData] = useState({
    loanAmount: 0,
    duration: "",
    interestRate: "",
    interestAmount: "",
    repaymentAmount: "",
    totalPayOff: "",
    purpose: "",
    frequency: null,
  });

  const [loanProduct, setLoanProduct] = useState(null);

  const onChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setLoanData({
      ...loanData, 
      [name]: value,
    })

    if (name === "loanAmount") {
      if(loanData.frequency) {
        const loanP = loanProducts.find((p) => p.frequency === loanData.frequency);
        console.log("thefreq",loanData.frequency)
        console.log(loanP)
        const i = loanP.interestRate*value
        // const tp = loanData.loanAmount+i
        const totalPayment = Math.floor(i) + Math.floor(value);
        console.log(totalPayment)
        setLoanData({
          ...loanData,
          interestRate: loanP.interestRate,
          interestAmount: i,
          totalPayOff: totalPayment,
          loanAmount: value
        });
      }
    }

    if(name === "duration") {
      const v = Math.floor(loanData.totalPayOff)/Math.floor(value)
      setLoanData({
        ...loanData, 
        repaymentAmount:v,
        duration:value
      })
    }

  };

  const onFrequencyChange = (event) => {
    const value = event.target.value;
    const loanP = loanProducts.find((p) => p.frequency === value);
    const i = loanP.interestRate*loanData.loanAmount
    
    // const tp = loanData.loanAmount+i
    const totalPayment = Math.floor(i) + Math.floor(loanData.loanAmount);
    const repayAmt = Math.floor(totalPayment)/Math.floor(loanData.duration)

    setLoanData({
      ...loanData,
      frequency: value,
      interestRate: loanP.interestRate*100,
      interestAmount: i,
      totalPayOff: totalPayment,
      repaymentAmount: repayAmt
    });
    
    setLoanProd(loanP)

  };

  const style = {
    marginBottom: 4,
  };

  const onChangeId =(event)=>{
    setBorrower({
      ...borrower,['id']:event.target.value
    })
  }

  const handleBorrower = async (event) => {
    const id = borrower.id;
    if(id.length===0){
      alert("provide borrower id")
      return
    }
    try {
      const response = await fetch(`http://localhost:8080/api/v1/borrowers/${id}`, {
        method: 'GET'
      });
  
      if (!response.ok) {
        const message = await response.text();
        throw new Error(`Error fetching borrower: ${message}`);
      }
  
      const data = await response.json();
      setBorrower({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        id:data.id
      });
    } catch (err) {
      alert("Something went wrong: " + err.message);
    }
  };
  
  const handleSubmit = async () => {
    try {
      // Prepare the request body
      const requestBody = {
        loanAmount: loanData.loanAmount,
        duration: loanData.duration,
        interestRate: loanData.interestRate,
        interestAmount: loanData.interestAmount,
        repaymentAmount: loanData.repaymentAmount,
        totalPayOff: loanData.totalPayOff,
        purpose: loanData.purpose,
        frequency: loanData.frequency,
      };
  
      // Set the request headers
      const headers = {
        'Content-Type': 'application/json',
        'borrowerId': 3,
      };

      console.log("id",borrower.id)
      const response = await fetch("http://localhost:8080/api/v1/loans", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          borrowerId:borrower.id
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`Error creating loan: ${response.status}`);
      }
  
      alert("Loan Created!");
      navigate("/loans")
      return;
    } catch (error) {
      console.error("Error creating loan:", error);
      setError(error.message); // Set error state for rendering
      alert("Something went wrong while creating the loan.");
    }
  };
  

  useEffect(() => {
    const fetchLoanProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/loan-products"
        );
        if (!response.ok) {
          throw new Error(`Error fetching loan products: ${response.status}`);
        }
        const data = await response.json();
        setLoanProducts(data);
      } catch (error) {
        console.error("Error fetching loan products:", error);
        setError(error.message); // Set error state for rendering
      } finally {
        setIsLoading(false); // Set loading state to false after completion, even on error
      }
    };
    fetchLoanProducts();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <Box m="20px" display="flex" justifyContent="center" gap={4}>
      <Box bgcolor="#b5b5b5" p={2} flexGrow={2}>
        <Box>
          <Typography variant="h2">Loan Summary</Typography>
          <Box>
            <Typography variant="h6">Loan Amount</Typography>
            <Typography variant="body2">{loanData.loanAmount}</Typography>
            <Divider />
            <Typography variant="h6">Duration</Typography>
            <Typography variant="body2">{loanData.duration} {loanProd? loanProd.duration: ""}</Typography>
            <Divider />
            <Typography variant="h6">Interest Rate</Typography>
            <Typography variant="body2">{loanData.interestRate} {"%"}</Typography>
            <Divider />
            <Typography variant="h6">Interest Amount</Typography>
            <Typography variant="body2">{loanData.interestAmount}</Typography>
            <Divider />
            <Typography variant="h6">Repayment</Typography>
            <Typography variant="body2">{loanData.repaymentAmount}</Typography>
            <Divider />
            <Typography variant="h6">Total Payoff</Typography>
            <Typography variant="body2">{loanData.totalPayOff}</Typography>
            <Divider />
          </Box>
        </Box>
        <Box>
          <Typography variant="h2">Borrower Info</Typography>

          <Typography variant="h6">First Name</Typography>
          <Typography variant="body2">{borrower.firstName}</Typography>
          <Divider />

          <Typography variant="h6">Last Name</Typography>
          <Typography variant="body2">{borrower.lastName}</Typography>
          <Divider />

          <Typography variant="h6">Phone Number</Typography>
          <Typography variant="body2">{borrower.phone}</Typography>
          <Divider />
        </Box>
      </Box>

      <Box>
        <Box sx={style}>
          <InputLabel id="borrower_id">Borrower ID</InputLabel>
          <TextField
            required
            fullWidth
            label="borrower_id"
            variant="filled"
            id="borrower_id"
            name="borrower_id"
            value={borrower.id}
            onChange={onChangeId}
          />
          <Button type="button" onClick={handleBorrower}>find</Button>
        </Box>

        <Box sx={style}>
          <FormControl fullWidth sx={{ marginBottom: 4 }}>
            <TextField
              variant="standard"
              type="number"
              name="loanAmount"
              label="Loan Amount"
              required
              onChange={onChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="pay_frequency">Payment Frequency</InputLabel>
            <Select
              variant="filled"
              name="frequency"
              label="Payment Frequency"
              labelId="pay_frequency"
              required
              onChange={onFrequencyChange}
            >
              {loanProducts.map((loanProduct) => (
                <MenuItem
                  key={loanProduct.id}
                  value={loanProduct.frequency}
                >
                  {loanProduct.frequency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={style}>
          <FormControl fullWidth sx={{ marginBottom: 4 }}>
            <TextField
              type="number"
              variant="standard"
              name="duration"
              label="Duration"
              required
              onChange={onChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              type="text"
              variant="standard"
              name="purpose"
              label="Loan Purpose"
              onChange={onChange}
            />
          </FormControl>
        </Box>
        <Button type="button" fullWidth onClick={handleSubmit}>
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default CreateLoan;
