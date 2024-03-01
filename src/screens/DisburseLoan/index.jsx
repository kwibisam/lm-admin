import React from "react";
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
const DisburseLoan = () => {
  const { id } = useParams();
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
          <TextField type="number" name="amount" label="Amount" />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="carrier">Carrier</InputLabel>
          <Select labelId="carrier" name="carrier">
            <MenuItem value="Zanaco">Zanaco</MenuItem>
            <MenuItem value="Absa">Absa</MenuItem>
            <MenuItem value="MoMo">MOMO</MenuItem>
            <MenuItem value="AirtelMoney">Airtel Money</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <TextField type="text" name="account_dst" label="Account/Phone" />
        </FormControl>

        <FormControl fullWidth>
          <TextField type="text" name="account_from" label="Account/Phone" />
        </FormControl>

        <FormControl fullWidth>
            <Button type='button'>Save</Button>
        </FormControl>

      </Box>
    </Box>
  );
};

export default DisburseLoan;
