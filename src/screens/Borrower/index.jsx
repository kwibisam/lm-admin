import React from 'react'
import {Box,useTheme} from '@mui/material'

import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Stack from '@mui/material/Stack';
import Header from '../../components/Header'

import Divider from '@mui/material/Divider';

import { tokens } from '../../theme';
import DataTable from '../../components/DataTable';

const Borrower = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const style = {
    py: 0,
    width: '100%',
    borderRadius: 2,
    borderColor: 'divider',
  };
  return (
    <Box m="20px">
      <Header title = "Borrower" subtitle="Borrower List"/>
      <Divider sx={style}/>
      <Box display="flex" justifyContent="end" alignItems="center" m={4}>
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="add"  style={{
            backgroundColor: colors.primary[800], // Customize background color
            padding: '10px', }}
            >
            <AddOutlinedIcon />
          </IconButton>
        </Stack>
      </Box>
      <Divider sx={style}/>
      <DataTable/>
    </Box>
  )
}

export default Borrower