import React from 'react'
import {Box,Typography} from "@mui/material"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const data = [
    { label: 'Loan Amount', value: 'K5,000.00' },
    { label: 'Tenure (months)', value: '3' },
    { label: 'Service Fee', value: 'K500.00' },
    { label: 'Amount You Receive', value: 'K4,500.00' },
    { label: 'Monthly Repayment', value: 'K1,801.74' },
    { label: 'Next Payment', value: 'March 31, 2024' },
  ];

const AddLoan = () => {
  return (
    <Box m="20px">
        <Box display="flex">
            <Box component="aside">
                <Typography variant='h3'>Loan Summary</Typography>
                <Typography variant='p'>The following are the details of the Loan:</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>Loan Details</TableCell>
                            <TableCell align="right">Value</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.label}>
                            <TableCell>{row.label}</TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
            <Box>
            </Box>
        </Box>
    </Box>
  )
}

export default AddLoan