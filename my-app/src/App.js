import Button from '@mui/material/Button';
import React, { useState } from 'react';

import './App.scss';


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

  const getNumber = (idx) => {
    numbers[idx] === -1 ? console.log('-1') : console.log('numbers[idx]', numbers[idx])
    return numbers[idx] === -1 ? '-1' : numbers[idx]
  }


  return (
    <div className="App">
      <Button onClick={shuffleBackground} variant="contained">Shuffle</Button>
      <div className="hexagonField">
        {/* backgroundimages-array is sliced and numbers-arrayindex is called for each row.
        Background images and numbers from the respective arrays are implemented after shuffle*/}
        <div className="singleHexagon three">
          {allElements.slice(0, 3).map((element, idx) => <div className={element}><div clasName="hexagonBG">{getNumber(idx)}</div></div>)}
        </div>
        <div className="singleHexagon four">
          {allElements.slice(3, 7).map((element, idx) => <div className={element}><div clasName="hexagonBG">{getNumber(idx + 3)}</div></div>)}
        </div>
        <div className="singleHexagon">
          {allElements.slice(7, 12).map((element, idx) => <div className={element}><div clasName="hexagonBG">{getNumber(idx + 7)}</div></div>)}
        </div>
        <div className="singleHexagon four">
          {allElements.slice(12, 16).map((element, idx) => <div className={element}><div clasName="hexagonBG">{getNumber(idx + 12)}</div></div>)}
        </div>
        <div className="singleHexagon three">
          {allElements.slice(16, 19).map((element, idx) => <div className={element}><div clasName="hexagonBG">{getNumber(idx + 16)}</div></div>)}
        </div>
      </div>
    </div>
  );
}

export default App;
// {createLine(7, 12, 7)}