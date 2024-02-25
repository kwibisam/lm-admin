import { ColorModeContext,useMode } from "./theme";
import {ThemeProvider,CssBaseline} from '@mui/material'

function App() {

  const [theme,colorMode]  = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="app">
          <main className="content"></main>
        </div>
      </ThemeProvider>
      
    </ColorModeContext.Provider>
    
  );
}

export default App;
