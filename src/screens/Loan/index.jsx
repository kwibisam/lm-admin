import React from 'react'
import {Box,useTheme} from "@mui/material"
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import { tokens } from '../../theme';
const Loan = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Box >
        <Stack direction="row" spacing={2}>
        <Button variant="contained" startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Link to = "/add-loan">
          <Button variant="contained" endIcon={<SendIcon />}>
            New Loan
          </Button>
        </Link>
       
      </Stack>
      </Box>
    </Box>
  )
}

export default Loan