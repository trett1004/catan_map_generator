'use strict';
// project external imports
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';

// project internal imports
import { shuffleBackground, allElementsInitial, shuffleNumberArray, numbersInitial } from './helpers/create_board.js';
import Btn from './components/Btn/Btn.js';
import HexagonRow from './components/HexagonRow/HexagonRow.js';
import GreenAlert from './components/Alert/Alert.js';
import ButtonRating from './components/button_rate/button_rate.js'
import Box from './components/Rating/rating.js'
import DenseTable from './components/Table/table_of_ratings.js'

import './App.scss';

function App() {
  // Hooks
  const [allElements, setAllElements] = useState(allElementsInitial);
  const [numbers, setNumbers] = useState(numbersInitial)
  const [data, setData] = React.useState(null);

  // API check
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(JSON.stringify(data.array[0]['rating'])));
  }, []);

  // get the response from the server and display it

  // function after click to shuffle backgrounds and numbers. helperfunctions called in directory 'helpers'
  const handleShuffleClick = () => {
      const shuffledElements = shuffleBackground({ allElements });
      setAllElements(shuffledElements);

      const shuffledNumbers = shuffleNumberArray({ numbers, shuffledElements });
      setNumbers(shuffledNumbers);
  }

  return (
    <div className="App">
      <Container>
      <Btn onClick={handleShuffleClick} variant="contained" content="SHUFFLE" className="Btn"/>
      <div className="hexagonField">
        {/* backgroundimages-array is sliced and numbers-arrayindex is called for each row.
        Background images and numbers from the respective arrays are implemented after shuffle*/}

        <HexagonRow allElements={allElements} numbers={numbers} arrayStart={0} arrayEnd={3} idxAdder={0} className="singleHexagon three" />
        <HexagonRow allElements={allElements} numbers={numbers} arrayStart={3} arrayEnd={7} idxAdder={3} className="singleHexagon four" />
        <HexagonRow allElements={allElements} numbers={numbers} arrayStart={7} arrayEnd={12} idxAdder={7} className="singleHexagon" />
        <HexagonRow allElements={allElements} numbers={numbers} arrayStart={12} arrayEnd={16} idxAdder={12} className="singleHexagon four" />
        <HexagonRow allElements={allElements} numbers={numbers} arrayStart={16} arrayEnd={19} idxAdder={16} className="singleHexagon three" />

      </div>
      <br></br>
      <br></br>
      <Box allElements={allElements} numbers={numbers} />
      <br></br>
      <h4>Top rated maps</h4>
      <DenseTable />
      <p>{!data ? "Loading..." : data}</p>
      </Container>
    </div>
  );




}

export default App;