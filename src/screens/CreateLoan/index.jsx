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

const CreateLoan = () => {
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
          totalPayOff: totalPayment
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
    setLoanData({
      ...loanData,
      frequency: value,
      interestRate: loanP.interestRate*100,
      interestAmount: i,
      totalPayOff: totalPayment
    });
    setLoanProd(loanP)

  };

  const style = {
    marginBottom: 4,
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
      <Box bgcolor="#b5b5b5">
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
          <Typography variant="body2">Demo Name</Typography>
          <Divider />

          <Typography variant="h6">Last Name</Typography>
          <Typography variant="body2">Demo Last</Typography>
          <Divider />

          <Typography variant="h6">Phone Number</Typography>
          <Typography variant="body2">Demo Phone</Typography>
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
          />
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
        <Button type="button" fullWidth>
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default CreateLoan;
