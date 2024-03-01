import TopBar from "./components/TopBar";
import Borrower from "./screens/Borrower";
import Dashboard from "./screens/Dashboard";
import Loan from "./screens/Loan";
import Analytics from "./screens/Analytics";

import { ColorModeContext,useMode } from "./theme";
import {ThemeProvider,CssBaseline} from '@mui/material'

import { Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import AddBorrower from "./screens/AddBorrower";
import AddLoan from "./screens/AddLoan";
import BorrowerProfile from "./screens/BorrowerProfile";
import CreateLoan from "./screens/CreateLoan";
import LoanDetails from "./screens/LoanDetails";
import DisburseLoan from "./screens/DisburseLoan";
import PayLoan from "./screens/PayLoan";

function App() {

  const [theme,colorMode]  = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="app">
          <SideBar/>
          <main className="content">
            <TopBar/>
            <Routes>
              <Route path="/" element = {<Dashboard/>} />
              <Route path="/analytics" element = {<Analytics/>}/>
              <Route path="/borrowers" element = {<Borrower/>} />
              <Route path="/loans" element = {<Loan/>} />
              <Route path="/addBorrower" element = {<AddBorrower/>}/>
              <Route path="/add-loan" element = {<AddLoan/>}/>
              <Route path="/borrower-profile/:id" element = {<BorrowerProfile/>}/>
              <Route path="/create-loan" element = {<CreateLoan/>}/>
              <Route path="/loan-details/:id" element ={<LoanDetails/>}/>
              <Route path="/disburse-loan/:id" element ={<DisburseLoan/>}/>
              <Route path="/pay-loan/:id" element ={<PayLoan/>}/>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
      
    </ColorModeContext.Provider>
    
  );
}

export default App;
