// Project external imports
import React, { useState, useEffect } from "react";
// Import Container from '@mui/material/Container';
import { BasicRating } from "./components/Rating/rating.js";
import DenseTable from "./components/Table/table_of_ratings.js";
import Typography from "@mui/material/Typography";

// Project internal imports
import {
  shufflelImages,
  landfieldsArr,
  shuffleNumberArray,
  fieldNumbersArr,
  getRandomName,
  portsArr,
} from "./helpers/create_board.js";
import Btn from "./components/Btn/Btn.js";
import HexagonRow from "./components/HexagonRow/HexagonRow";
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
      <CatanBoard
        setLandfields={setLandfields}
        setNumbers={setNumbers}
        landfields={landfields}
        numbers={numbers}
        setName={setName}
      />
      <MapName mapName={mapName} />

      {databaseExists && (
        <>
          <br></br>
          <br></br>
          <BasicRating
            landfields={landfields}
            numbers={numbers}
            mapName={mapName}
            dbData={dbData}
            setData={setData}
          />
          <br></br>
          <DenseTable
            setLandfields={setLandfields}
            setNumbers={setNumbers}
            setName={setName}
            dbData={dbData}
            setData={setData}
          />
        </>
      )}
    </div>
  );
}

export default App;
