
// Project external imports
import React, { useState, useEffect } from 'react';
// Import Container from '@mui/material/Container';
import { BasicRating } from './components/Rating/rating.js'
import DenseTable from './components/Table/table_of_ratings.js'
import Typography from '@mui/material/Typography';

// Project internal imports
import { shufflelImages, landfieldsArr, shuffleNumberArray, fieldNumbersArr, getRandomName, portsArr } from './helpers/create_board.js';
import Btn from './components/Btn/Btn.js';
import { HexagonRow } from './components/HexagonRow/HexagonRow.js';

import './App.scss';

function App() {
  // Hooks
  const [landfields, setLandfields] = useState(landfieldsArr);
  const [numbers, setNumbers] = useState(fieldNumbersArr)
  const [mapName, setName] = useState(getRandomName())
  const [dbData, setData] = React.useState(null);
  const [databaseExists, setDatabaseExists] = useState(false);

  // GET Request to server
  useEffect(() => {
    fetch("/api")
      .then((res) => {
        console.info('app.js', res);
        return res.json();
      })
      .then((resJson) => {
        console.log('app.js', resJson);
        setData(resJson.array);
      })
      .then(() => setDatabaseExists(true))
      .catch(err => console.error(err))

  }, []);

  // Get the response from the server and display it
  // Function after click to shuffle backgrounds and numbers. helperfunctions called in directory 'helpers'
  const handleShuffleClick = () => {
    const shuffledElements = shufflelImages({ landfields });
    setLandfields(shuffledElements);

    const shuffledNumbers = shuffleNumberArray({ numbers, shuffledElements });
    setNumbers(shuffledNumbers);

    const mapName = getRandomName();
    setName(mapName);
  }


  return (
    <div className='main'>
      <div className='header'><Typography variant="h2" component="legend">Catan Map Generator</Typography></div>
      <Btn style={{ marginTop: '20px' }} onClick={handleShuffleClick} variant="contained" content="SHUFFLE" className="Btn" />
      <div className='mapName'><Typography variant="h4" >Map: {mapName}</Typography></div>
      <div className="hexagonField">

        {/* First row of water hexagon fields */}
        {/* The following components form each one row of hexagons. By defining the props for the arrays and their start and end in each field you are able to create the board*/}
        {/* In the helpers directory you find the basic data for the arrays */}
        <HexagonRow ports={portsArr} portIdx={0} portIdxEnd={4} landfields={landfields} numbers={numbers} arrayStart={0} arrayEnd={0} idxAdder={0} className="singleHexagon fourWaters" />

        <HexagonRow ports={portsArr} portIdx={4} portIdxEnd={5} landfields={landfields} numbers={numbers} arrayStart={0} arrayEnd={3} idxAdder={0} className="singleHexagon three" />
        <HexagonRow ports={portsArr} portIdx={6} portIdxEnd={7} landfields={landfields} numbers={numbers} arrayStart={3} arrayEnd={7} idxAdder={3} className="singleHexagon four" />
        <HexagonRow ports={portsArr} portIdx={8} portIdxEnd={9} landfields={landfields} numbers={numbers} arrayStart={7} arrayEnd={12} idxAdder={7} className="singleHexagon" />
        <HexagonRow ports={portsArr} portIdx={10} portIdxEnd={11} landfields={landfields} numbers={numbers} arrayStart={12} arrayEnd={16} idxAdder={12} className="singleHexagon four" />
        <HexagonRow ports={portsArr} portIdx={12} portIdxEnd={13} landfields={landfields} numbers={numbers} arrayStart={16} arrayEnd={19} idxAdder={16} className="singleHexagon three" />

        {/* Last row of water hexagon fields */}
        <HexagonRow ports={portsArr} portIdx={14} portIdxEnd={18} landfields={landfields} numbers={numbers} arrayStart={0} arrayEnd={0} idxAdder={0} className="singleHexagon fourWaters" />

      </div>
      {databaseExists && (
        <>
          <br></br>
          <br></br>
          <BasicRating landfields={landfields} numbers={numbers} mapName={mapName} dbData={dbData} setData={setData} />
          <br></br>
          <h3 className='tableHeader'>Top rated maps</h3>
          <DenseTable setLandfields={setLandfields} setNumbers={setNumbers} setName={setName} dbData={dbData} setData={setData} />
        </>
      )}
      {/* <p>{!data ? "Loading..." : data}</p> */}
    </div>

  );




}

export default App;