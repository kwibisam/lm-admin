import React from 'react'
import {Box,useTheme,Grid,Button} from '@mui/material'
import { tokens } from '../../theme';
import Header from '../../components/Header';
import Divider from '@mui/material/Divider';

import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import BorrowerForm from './BorrowerForm';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import BorrowerRegistration2 from './BorrowerRegistration2.JSX';

const AddBorrower = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const handleBack = () => {
      navigate("/borrowers"); // Go back one step in the history stack
    };
  
    return (
        <Box ml="20px">
            <Header title = "Add Borrower" subtitle="add new borrower"/>
            <Grid item xs={12}>
                <Button variant="contained" onClick={handleBack}>Back</Button>
            </Grid>
            <Divider sx={{marginBottom: 4}}/>
            <BorrowerForm/>
        </Box>
      )
}

export default AddBorrower