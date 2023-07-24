
// project external imports
import React, { useState, useEffect } from 'react';
// import Container from '@mui/material/Container';
import { BasicRating } from './components/Rating/rating.js'
import DenseTable from './components/Table/table_of_ratings.js'
import Typography from '@mui/material/Typography';

// project internal imports
import { shuffleBackground, allElementsInitial, shuffleNumberArray, numbersInitial, getRandomName, ports } from './helpers/create_board.js';
import Btn from './components/Btn/Btn.js';
import {Hexagon as HexagonRow} from './components/HexagonRow/HexagonRow.js';

import './App.scss';



function App() {
  // Hooks
  const [allElements, setAllElements] = useState(allElementsInitial);
  const [numbers, setNumbers] = useState(numbersInitial)
  const [mapName, setName] = useState(getRandomName())
  // const [data, setData] = React.useState(null);
  const [dbData, setData] = React.useState(null);

  // GET Request
  useEffect(() => {
      fetch("/api")
          .then((res) => res.json())
          .then((dbData) => setData(dbData.array));
  }, []);

  // get the response from the server and display it

  // function after click to shuffle backgrounds and numbers. helperfunctions called in directory 'helpers'
  const handleShuffleClick = () => {
      const shuffledElements = shuffleBackground({ allElements });
      setAllElements(shuffledElements);

      const shuffledNumbers = shuffleNumberArray({ numbers, shuffledElements });
      setNumbers(shuffledNumbers);

      const mapName = getRandomName();
      setName(mapName);
  }

  return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100vh'
        // marginLeft: '200px'
      }}>
      <Typography style={{marginTop: '20px', alignItems: 'center'}}variant="h2" component="legend">Catan Map Generator</Typography>
      <Btn style={{marginTop: '20px'}} onClick={handleShuffleClick} variant="contained" content="SHUFFLE" className="Btn"/>
      <Typography style={{marginTop: '20px', marginBottom: '20px'}} variant="h4" >Map: {mapName}</Typography>
      <div className="hexagonField">


      {/* <h1 style={{ textAlign: 'center' }}>Map: {mapName}</h1> */}
        {/* backgroundimages-array is sliced and numbers-arrayindex is called for each row.
        Background images and numbers from the respective arrays are implemented after shuffle*/}

      {/* <div className='singleHexagon'>
        <div className='water'> */}
          {/* <div className={getClass(idx, idxAdder, numbers)}>{numbers[idx + idxAdder]}</div> */}
        {/* </div>
      </div> */}

        {/* First row of water hexagon fields */}
        <HexagonRow ports={ports} portIdx={0} portIdxEnd ={4} allElements={allElements} numbers={numbers} arrayStart={0} arrayEnd={0} idxAdder={0} className="singleHexagon fourWaters" />

        <HexagonRow ports={ports} portIdx={4} portIdxEnd={5} allElements={allElements} numbers={numbers} arrayStart={0} arrayEnd={3} idxAdder={0} className="singleHexagon three" />
        <HexagonRow ports={ports} portIdx={6} portIdxEnd={7} allElements={allElements} numbers={numbers} arrayStart={3} arrayEnd={7} idxAdder={3} className="singleHexagon four" />
        <HexagonRow ports={ports} portIdx={8} portIdxEnd={9} allElements={allElements} numbers={numbers} arrayStart={7} arrayEnd={12} idxAdder={7} className="singleHexagon" />
        <HexagonRow ports={ports} portIdx={10} portIdxEnd={11} allElements={allElements} numbers={numbers} arrayStart={12} arrayEnd={16} idxAdder={12} className="singleHexagon four" />
        <HexagonRow ports={ports} portIdx={12} portIdxEnd={13} allElements={allElements} numbers={numbers} arrayStart={16} arrayEnd={19} idxAdder={16} className="singleHexagon three" />

      {/* Last row of water hexagon fields */}
        <HexagonRow ports={ports} portIdx={14} portIdxEnd ={18} allElements={allElements} numbers={numbers} arrayStart={0} arrayEnd={0} idxAdder={0} className="singleHexagon fourWaters" />

      </div>
      <br></br>
      <br></br>
      <BasicRating allElements={allElements} numbers={numbers} mapName={mapName} dbData={dbData} setData={setData}/>
      <br></br>
      <h3 className='tableHeader'>Top rated maps</h3>
      <DenseTable setAllElements={setAllElements} setNumbers={setNumbers} setName={setName} dbData={dbData} setData={setData}/>
      {/* <p>{!data ? "Loading..." : data}</p> */}
      </div>

  );




}

export default App;