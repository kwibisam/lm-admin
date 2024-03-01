import React from 'react'
import {Box,Typography,TextField} from '@mui/material'
import { useParams } from 'react-router-dom';
const LoanDetails = () => {
    const { id } = useParams();
    return (
        <Box m="20px">
            <Typography variant='h1'>Loan Details</Typography>
            <Box>
                <Box>
                    <Typography>Basic Details</Typography>
                    <Typography>Loan ID</Typography>
                    <Typography variant='caption'> {id}</Typography>
                              
                </Box>
            </Box>
        </Box>
    )
}

export default LoanDetails