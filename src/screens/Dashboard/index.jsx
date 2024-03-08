import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Icon,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaidIcon from "@mui/icons-material/Paid";
import SellIcon from "@mui/icons-material/Sell";
import PeopleIcon from "@mui/icons-material/People";
import { tokens } from "../../theme";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [statsData,setStatsData] = useState({
  })

  const base_url = process.env.REACT_APP_BASE_URL
  useEffect(()=>{

    const fetchStats = async () =>{
      try {
        const response = await fetch(`${base_url}app/stats`)
        if(!response.ok){
          const msg = response.text
          alert(msg)
          return
        }

        const data = await response.json()
        setStatsData(data)
      } catch (error) {
        console.log(error)
      }
    }
   fetchStats()
  },[])

  return (
    <>
      <Box m="20px" display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome" />
      </Box>

      <Box
        m="20px"
        sx={{
          bgcolor: colors.grey[100],
          borderRadius: "1em",
          paddingX: "2em",
          paddingY: "1em",
          m: "20px",
        }}
      >
        <Box display="flex" gap={4} justifyContent="space-evenly">
          <Card sx={{ width: "100%", maxWidth: 445 }}>
            <CardContent>
              <SellIcon sx={{color:colors.blueAccent[400], fontSize:36}}/>
              <Typography gutterBottom  sx={{fontWeight:900,color:colors.greenAccent[400]}} variant="h3" component="div">
                {"K"}{statsData.portfolioSize} 
              </Typography>
              <Typography variant="body2" color="text.secondary">
                PORTFOLIO SIZE
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ width: "100%", maxWidth: 445 }}>
            <CardContent>
              <PeopleIcon sx={{color:colors.blueAccent[400], fontSize:36}}/>
              <Typography gutterBottom variant="h3" sx={{fontWeight:900,color:colors.greenAccent[400]}} component="div">
                {statsData.activeBorrowers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ActiveBorrowers
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ width: "100%", maxWidth: 445 }}>
            <CardContent>
              <AttachMoneyIcon sx={{color:colors.blueAccent[400], fontSize:36}}/>
              <Typography gutterBottom  sx={{fontWeight:900,color:colors.greenAccent[400]}} variant="h3" component="div">
                {statsData.activeLoans}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ActiveLoans
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
