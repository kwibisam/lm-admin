import TopBar from "./components/TopBar";
import Borrower from "./screens/Borrower";
import Dashboard from "./screens/Dashboard";
import Loan from "./screens/Loan";
import Analytics from "./screens/Analytics";

import { ColorModeContext,useMode } from "./theme";
import {ThemeProvider,CssBaseline} from '@mui/material'

import { Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";

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
              <Route path="/" element = {<Analytics/>}/>
              <Route path="" element = {<Borrower/>} />
              <Route path="" element = {<Loan/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
      
    </ColorModeContext.Provider>
    
  );
}

export default App;
