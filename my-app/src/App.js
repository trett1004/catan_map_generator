'use strict';
// project external imports
import React, { useState, useEffect } from 'react';

// project internal imports
import { shuffleBackground, allElementsInitial, shuffleNumberArray, numbersInitial } from './helpers/create_board.js';
import Btn from './components/Btn/Btn.js';
import HexagonRow from './components/HexagonRow/HexagonRow.js';
import GreenAlert from './components/Alert/Alert.js';
import ButtonRating from './components/button_rate/button_rate.js'
import Box from './components/Rating/rating.js'

import './App.scss';

function App() {
  // Hooks
  const [allElements, setAllElements] = useState(allElementsInitial);
  const [numbers, setNumbers] = useState(numbersInitial)
  const [alert, setAlert] = useState(false);
  const [data, setData] = React.useState(null);

  // API check
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);


  // Save board to db
  const handleRateClick = () => {
    fetch('/rate', {
      method: 'POST',
      body: JSON.stringify({
        fieldArray: allElements,
        numberArray: numbers,
        id: -1,
        rating: -1,
        voteCount: -1
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((data) => {
        setAlert(true);
        window.setTimeout(() => setAlert(false), 2000)
        console.log('data', data.body)
        console.log('alert Status', alert)
      })
      .catch((err) => console.log(err.message));
  }

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
      <Box />
      <ButtonRating />
      <Btn onClick={handleRateClick} content="RATE" />
      <div>{alert ? <GreenAlert content="Rating received" severity="success" /> : <></>}</div>

      <Btn onClick={handleShuffleClick} variant="contained" content="SHUFFLE" />
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
      <p>{!data ? "Loading..." : data}</p>
    </div>
  );




}

export default App;