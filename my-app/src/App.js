// Project external imports
import React, { useState, useEffect } from "react";

// Import Container from '@mui/material/Container';
import { RatingSection } from "./components/RatingSection/rating.js";
import TableOfRatings from "./components/TableOfRatings/table_of_ratings.js";
import Typography from "@mui/material/Typography";

// Project internal imports
import { landfieldsArr, fieldNumbersArr } from "./helpers/create_board.js";
import CatanBoard from "./components/CatanBoard/CatanBoard";
import MapName from "./components/MapName/MapName.js";
import ShuffleBtn from "./components/Btn/ShuffleBtn";

import "./App.scss";

function App() {
  // Hooks
  const [landfields, setLandfields] = useState(landfieldsArr);
  const [numbers, setNumbers] = useState(fieldNumbersArr);
  const [dbData, setData] = React.useState(null);
  const [databaseExists, setDatabaseExists] = useState(false);
  const [mapName, setName] = useState();

  // GET Request to server
  useEffect(() => {
    fetch("/api")
      .then((res) => {
        console.info("app.js", res);
        return res.json();
      })
      .then((resJson) => {
        console.log("app.js", resJson);
        setData(resJson.array);
      })
      .then(() => setDatabaseExists(true))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="main">
      <div className="header">
        <Typography variant="h2" component="legend">
          Catan Map Generator
        </Typography>
      </div>
      <ShuffleBtn
        setLandfields={setLandfields}
        setNumbers={setNumbers}
        setName={setName}
      />
      <MapName mapName={mapName} />
      <CatanBoard
        setLandfields={setLandfields}
        setNumbers={setNumbers}
        landfields={landfields}
        numbers={numbers}
        setName={setName}
      />
      {databaseExists && (
        <>
          <div className="ratingSection">
            <RatingSection
              landfields={landfields}
              numbers={numbers}
              mapName={mapName}
              dbData={dbData}
              setData={setData}
            />
          </div>
          <div className="TableOfRatings">
            <TableOfRatings
              setLandfields={setLandfields}
              setNumbers={setNumbers}
              setName={setName}
              dbData={dbData}
              setData={setData}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
