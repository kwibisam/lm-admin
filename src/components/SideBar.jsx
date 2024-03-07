import { React, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import { tokens } from "../theme";

import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";


const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
        component={<Link to={to}/>}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    );
  };

const SideBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    console.log("selected:", selected)
    return (
        <Box
        sx={{
            position: "sticky",
            display: "flex",
            height: "100vh",
            top: 0,
            bottom: 0,
            zIndex: 10000,
            "& .sidebar": {
              border: "none",
            },
            "& .menu-icon": {
              backgroundColor: "transparent !important",
            },
            "& .menu-item": {
              // padding: "5px 35px 5px 20px !important",
              backgroundColor: "transparent !important",
            },
            "& .menu-anchor": {
              color: "inherit !important",
              backgroundColor: "transparent !important",
            },
            "& .menu-item:hover": {
              color: `${colors.blueAccent[500]} !important`,
              backgroundColor: "transparent !important",
            },
            "& .menu-item.active": {
              color: `${colors.greenAccent[500]} !important`,
              backgroundColor: "transparent !important",
            },
          }}
      >
        <Sidebar collapsed={isCollapsed} style={{ height: "100%" }} backgroundColor={colors.primary[400]}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h4" color={colors.grey[100]}>
                    LoanPro
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
  
            {!isCollapsed && (
              <Box mb="25px">
                {/* <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`../assets/img.jpg`}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box> */}
                {/* <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    Ed Roh
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    VP Fancy Admin
                  </Typography>
                </Box> */}
              </Box>
            )}
  
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
                title="Dashboard"
                to="/"
                icon={<DashboardOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

            <Item
                title="Analytics"
                to="/analytics"
                icon={<InsightsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            <Item
                title="Loans"
                to="/loans"
                icon={<FolderOpenOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            
             
              <Item
                title="Borrower"
                to="/borrowers"
                icon={<Person2OutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              
            </Box>
          </Menu>
        </Sidebar>
      </Box>
    )
}

export default SideBar