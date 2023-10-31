// Project external imports
import Typography from "@mui/material/Typography";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { mediaqueryStyle, mediaqueryWidth } from "./helpers/global-variables";
import { ThemeProvider } from "@mui/material/styles";

import { theme, classes } from "./helpers/theme";

// Project internal imports
import MainSection from "./components/MainSection/MainSection.js";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="main">
        <div className="header">
          <Typography sx={classes.h1Custom} variant="h1" component="legend">
            Catan Map Gen
          </Typography>
        </div>
        <MainSection data-testid="mainSection" />
      </div>
    </ThemeProvider>
  );
}

export default App;
