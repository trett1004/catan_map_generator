import React, { useState, useEffect } from 'react';

import Btn from './components/Button/Btn.js';
import Hexagon from './components/Hexagon/Hexagon.js';

import './App.scss';
import GreenAlert from './components/Alert/Alert.js';


function App() {
  // making the array with the background images for the hexagons
  const wood = new Array(4).fill('wood');
  const weat = new Array(4).fill('weat');
  const sheep = new Array(4).fill('sheep');
  const stone = new Array(3).fill('stone');
  const clay = new Array(3).fill('clay');
  const allElementsInitial = [...wood, ...weat, ...sheep, ...stone, ...clay, 'desert'];
  // making the array for the numbers on each hexagon
  const numbersInitial = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12, -1];

  const [numbers, setNumbers] = useState(numbersInitial)
  const [allElements, setAllElements] = useState(allElementsInitial);
  const [alert, setAlert] = useState(false);

  // shuffle the backgroundimages
  const shuffleBackground = () => {
    const shuffledElements = [...allElements];
    for (let i = shuffledElements.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledElements[i], shuffledElements[j]] = [shuffledElements[j], shuffledElements[i]];
    }
    setAllElements(shuffledElements);
    shuffleNumberArray(shuffledElements);
  };

  // shuffle the numbers
  const shuffleNumberArray = (shuffledElements) => {
    const shuffledNumbers = [...numbers]
    for (let i = shuffledNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledNumbers[i], shuffledNumbers[j]] = [shuffledNumbers[j], shuffledNumbers[i]];
    }
    const x = shuffledElements.findIndex(element => element === 'desert');
    const y = shuffledNumbers.findIndex(element => element === -1);
    // console.log(x, y)
    [shuffledNumbers[x], shuffledNumbers[y]] = [shuffledNumbers[y], shuffledNumbers[x]];

    setNumbers(shuffledNumbers);
  }

  const getClass = (idx) => {
    return numbers[idx] === -1 ? "hexagonBg hidden" : "hexagonBg"
  }

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

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
        window.setTimeout( () => setAlert(false), 2000)
        console.log('data', data.body)
        console.log('alert Status', alert)
      })
       .catch((err) => console.log(err.message));
  }

  // get the response from the server and display it

  return (
    <div className="App">
      <Btn onClick={handleRateClick} content="RATE"/>
      <div>{alert ? <GreenAlert content="Rating received" severity="success" /> : <></>}</div>
      <p>{!data ? "Loading..." : data}</p>
      <Btn onClick={shuffleBackground} variant="contained" content="SHUFFLE" />
      <div className="hexagonField">
        {/* backgroundimages-array is sliced and numbers-arrayindex is called for each row.
        Background images and numbers from the respective arrays are implemented after shuffle*/}
        {/* <div className="singleHexagon three">
          {allElements.slice(0, 3).map((element, idx) => <div className={element}><div className={getClass(idx)}>{numbers[idx]}</div></div>)}
        </div> */}
        <Hexagon allElements={allElements} numbers={numbers} arrayStart={0} arrayEnd={3} idxAdder = {0} className="singleHexagon three"/>
        <Hexagon allElements={allElements} numbers={numbers} arrayStart={3} arrayEnd={7} idxAdder = {3} className="singleHexagon four"/>
        {/* <div className="singleHexagon four">
          {allElements.slice(3, 7).map((element, idx) => <div className={element}><div className={getClass(idx + 3)}>{numbers[idx + 3]}</div></div>)}
        </div> */}
        <Hexagon allElements={allElements} numbers={numbers} arrayStart={7} arrayEnd={12} idxAdder = {7} className="singleHexagon"/>
        {/* <div className="singleHexagon">
          {allElements.slice(7, 12).map((element, idx) => <div className={element}><div className={getClass(idx + 7)}>{numbers[idx + 7]}</div></div>)}
        </div> */}
        <Hexagon allElements={allElements} numbers={numbers} arrayStart={12} arrayEnd={16} idxAdder = {12} className="singleHexagon four"/>
        {/* <div className="singleHexagon four">
          {allElements.slice(12, 16).map((element, idx) => <div className={element}><div className={getClass(idx + 12)}>{numbers[idx + 12]}</div></div>)}
        </div> */}
        <Hexagon allElements={allElements} numbers={numbers} arrayStart={16} arrayEnd={19} idxAdder = {16} className="singleHexagon three"/>
        {/* <div className="singleHexagon three">
          {allElements.slice(16, 19).map((element, idx) => <div className={element}><div className={getClass(idx + 16)}>{numbers[idx + 16]}</div></div>)}
        </div> */}
      </div>
    </div>
  );




}

export default App;