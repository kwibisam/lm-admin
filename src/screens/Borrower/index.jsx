import React from 'react'
import { useState,useEffect } from 'react';
import {Box,useTheme,Typography} from '@mui/material'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import { tokens } from '../../theme';
import Avatar from '@mui/material/Avatar';
import { Link, useNavigate } from 'react-router-dom';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First Name', width: 130 ,
  renderCell: (params) => {
    const onClick = (e) => {
      return alert(JSON.stringify(params.row, null, 4));
    };
    const row = params.row
    const profileLink = `/borrower-profile/${row.id}`;
    return  <Link to={profileLink}>{row.firstName}</Link>;
  }},
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  { field: 'dob', headerName: 'Date of Birth', width: 130 },
  { field: 'addressLine1', headerName: 'Address Line 1', width: 150 },
  { field: 'addressLine2', headerName: 'Address Line 2', width: 150 },
  { field: 'phone', headerName: 'Phone', width: 120 },
  { field: 'alternativePhone', headerName: 'Alternative Phone', width: 170 },
  { field: 'nrc', headerName: 'NRC', width: 120 },
  { field: 'income', headerName: 'Income', width: 120 },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    disableClickEventBubbling: true,
    disableSelectionOnClick:true,
    renderCell: (params) => {
      const onClick = (e) => {
        const api= params.api;
        console.log(params.row)
        return alert(JSON.stringify(params.row, null, 4));
      };

      return <Button onClick={onClick}>Click</Button>;
    }
  },
];

// const columns = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { 
//     field: 'firstName', 
//     headerName: 'First name', 
//     width: 130 ,
//     renderCell: (params) => {
//       const onClick = (e) => {
//         return alert(JSON.stringify(params.row, null, 4));
//       };
//       const row = params.row
//       const profileLink = `/borrower-profile/${row.id}`;
//       return  <Link to={profileLink}>View Profile</Link>;
//     }
//   },
//   { field: 'lastName', headerName: 'Last name', width: 130 },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 90,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
//   {
//     field: "action",
//     headerName: "Action",
//     sortable: false,
//     disableClickEventBubbling: true,
//     disableSelectionOnClick:true,
//     renderCell: (params) => {
//       const onClick = (e) => {
//         const api= params.api;
//         console.log(params.row)
//         return alert(JSON.stringify(params.row, null, 4));
//       };

//       return <Button onClick={onClick}>Click</Button>;
//     }
//   },
 
// ];

const rows2 = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const Borrower = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows,setRows] = useState([])
  const [rowSelectionModel,setRowSelectionModel] = useState([])
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const navigate = useNavigate();

  const handleOnClick =() =>{
  }
  const handleOnDelete = () => {
    if(rowSelectionModel.length > 0){
      const filtered = rows.filter(row => !rowSelectionModel.includes(row.id))
      setRows(filtered)
    }
  }
  const handleSelectionChange = (newSelectionModel) => {
    setRowSelectionModel(newSelectionModel);
    if (newSelectionModel.length > 0) {
        setShowDeleteButton(true);
    } else {
        setShowDeleteButton(false);
    }
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/borrowers');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setRows(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    // setRows(rows2)
  }, []);

  
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" p={1} bgcolor={colors.primary[600]}>
        <Typography variant='h1'>Borrower List</Typography>
        <Fab variant="extended" color={colors.primary[400]} size='medium' onClick={() =>{ navigate("/addBorrower");}}>
          <AddIcon sx={{ mr: 1 }} />
          {/* <Typography variant='caption'>NEW</Typography> */}
          ADD NEW
        </Fab>
      </Box>

      {/* MAIN-SECTION */}
      <Box>

        <Stack direction="row" spacing={1} marginTop={1}>
          <Chip label="ACTIVE" onClick={handleOnClick} />
          <Chip label="RECENT" variant="outlined" onClick={handleOnClick}/>
          <Chip avatar={<Avatar>34</Avatar>} label="ALL" onClick={handleOnClick} on/>
        </Stack>

        <div style={{ height: 400, width: '100%', marginTop:8 }}>
          <Stack direction="row" spacing={1}>
            {showDeleteButton && (
            
            <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick={handleOnDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            )}
          </Stack>

          <DataGrid sx={{maxWidth: 1040}}
            rowSelectionModel={rowSelectionModel}
            onRowSelectionModelChange={handleSelectionChange}
            disableRowSelectionOnClick
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection/>
        </div>
      </Box>
    </Box>
  )
}

export default Borrower