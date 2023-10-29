// Project external imports
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { mediaqueryStyle, mediaqueryWidth } from "./helpers/global-variables";

// Project internal imports
import MainSection from "./components/MainSection/MainSection.js";

import "./App.css";

function App() {
  const mediaquery = useMediaQuery(`(min-width:${mediaqueryWidth})`);
  return (
    <div className="main">
      <div className="header">
        <Typography variant="h2" component="legend">
          {mediaquery ? (
            "Catan Map Gen"
          ) : (
            <span style={{ fontSize: "24px" }}>Catan Map Gen</span>
          )}
        </Typography>
      </div>
      <MainSection data-testid="mainSection" />
    </div>
  );
}

export default App;
