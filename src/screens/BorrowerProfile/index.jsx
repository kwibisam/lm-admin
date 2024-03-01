import React from 'react'
import {Box,Typography,TextField} from '@mui/material'
import { useParams } from 'react-router-dom';
const BorrowerProfile = () => {
    const { id } = useParams();
    return (
        <Box m="20px">
            <Typography variant='h1'>Borrower Profile</Typography>
            <Box>
                <Box>
                    <Typography>Basic Details</Typography>
                    <Typography>Borrower ID</Typography>
                    <Typography variant='caption'> {id}</Typography>
                    <form>
                        <TextField>First  Name</TextField>
                    </form>                
                </Box>
            </Box>
        </Box>
    )
}

export default BorrowerProfile