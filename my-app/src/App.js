// Project external imports
import Typography from "@mui/material/Typography";

// Project internal imports
import MainSection from "./components/MainSection/MainSection.js"

import "./App.css";

function App() {
  return (
    <div className="main">
      <div className="header">
        <Typography variant="h2" component="legend">
          Catan Map Master
        </Typography>
      </div>
      <MainSection />
    </div>
  );
}

export default App;