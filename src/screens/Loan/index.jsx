import AddIcon from "@mui/icons-material/Add";
import MoneyOutlinedIcon from '@mui/icons-material/MoneyOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import { useState, useEffect } from "react";
import {
  Box,
  useTheme,
  Typography,
  Button,
  Stack,
  Fab,
  Chip,
  IconButton,
  Tooltip,
  MenuItem
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "loanAmount",
    headerName: "LoanAmount",
    width: 130,
    type:"number",
    renderCell: (params) => {
      const onClick = (e) => {
        return alert(JSON.stringify(params.row, null, 4));
      };
      const row = params.row;
      const profileLink = `/loan-details/${row.id}`;
      return <Link to={profileLink}>{row.loanAmount}</Link>;
    },
  },
  { field: "interestAmount", headerName: "Interest Amount", width: 130,type:"number" },
  {
    field: "interestRate",
    headerName: "Interest Rate",
    type: "number",
    width: 90,
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 160,
  },
  {
    field: "frequency",
    headerName: "Frequency",
    width: 160,
  },

  {
    field: "repaymentAmount",
    headerName: "RepaymentAmount",
    width: 160,
  },
  {
    field: "startDate",
    headerName: "StartDate",
    width: 160,
  },

  {
    field: "status",
    headerName: "Status",
    width: 160,
  },

  {
    field: "loanBalance",
    headerName: "LoanBalance",
    width: 160,
  },

  {
    field: "totalPayOff",
    headerName: "TotalPayOff",
    width: 160,
  },

  {
    field: "isDisbursed",
    headerName: "IsDisbursed",
    width: 160,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    disableClickEventBubbling: true,
    disableSelectionOnClick: true,
    renderCell: (params) => {
      const onClick = (e) => {
        const api = params.api;
        console.log(params.row);
        return alert(JSON.stringify(params.row, null, 4));
      };

      return <Button onClick={onClick}>Approve</Button>;
    },
  },
];

const rows2 = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const Loan = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const navigate = useNavigate();

  const handleOnClick = () => {};
  const handleOnDisburse = () => {
    if(rowSelectionModel.length == 1) {
      const id = rowSelectionModel[0]
      navigate(`/disburse-loan/${id}`)
    }
    
  };

  const handleOnPay = () => {
    if(rowSelectionModel.length == 1) {
      const id = rowSelectionModel[0]
      navigate(`/pay-loan/${id}`)
    }
    
  };

  const handleOnDelete = () => {
    if (rowSelectionModel.length > 0) {
      const filtered = rows.filter(
        (row) => !rowSelectionModel.includes(row.id)
      );
      setRows(filtered);
    }
  };
  const handleSelectionChange = (newSelectionModel) => {
    setRowSelectionModel(newSelectionModel);
    if (newSelectionModel.length > 0) {
      setShowDeleteButton(true);
    } else {
      setShowDeleteButton(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/loans");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // setRows(rows2);
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={1}
        bgcolor={colors.primary[600]}
      >
        <Typography variant="h1">Loans</Typography>

        <Fab
          variant="extended"
          color={colors.primary[400]}
          size="medium"
          onClick={() => {
            navigate("/create-loan");
          }}
        >
          <AddIcon sx={{ mr: 1 }} />
          {/* <Typography variant='caption'>NEW</Typography> */}
          ADD NEW
        </Fab>
      </Box>

      {/* MAIN-SECTION */}
      <Box>
        <Stack direction="row" spacing={1} marginTop={1}>
        <Chip
            avatar={<Avatar>34</Avatar>}
            label="ALL"
            onClick={handleOnClick}
            on
          />
          <Chip label="RECENT" onClick={handleOnClick} />
          <Chip label="APPROVED" onClick={handleOnClick} />
          <Chip label="ACTIVE" onClick={handleOnClick} />
          <Chip label="COMPLETED" onClick={handleOnClick}  avatar={<Avatar>14</Avatar>}/>
        </Stack>

        <div style={{ height: 400, width: "100%", marginTop: 8 }}>
          <Stack direction="row" spacing={1}>
            {showDeleteButton && (
              <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={handleOnDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Disburse">
                <IconButton aria-label="disburse" onClick={handleOnDisburse}>
                  <BookmarkAddedOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Payment">
                <IconButton aria-label="add payment" onClick={handleOnPay}>
                  <PostAddOutlinedIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="APPROVE">
                <IconButton aria-label="approve" onClick={handleOnDelete}>
                  <TaskOutlinedIcon />
                </IconButton>
              </Tooltip>
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
            checkboxSelection
          />
        </div>
      </Box>
    </Box>
  );
};

export default Loan;
