import Button from '@mui/material/Button';
import React, { useState } from 'react';


import './App.scss';


function App() {
  // making the array with all the content for the hexagons
  const wood = new Array(4).fill('wood');
  const weat = new Array(4).fill('weat');
  const sheep = new Array(4).fill('sheep');
  const stone = new Array(3).fill('stone');
  const clay = new Array(3).fill('clay');
  const allElementsInitial = [...wood, ...weat, ...sheep, ...stone, ...clay, 'desert'];
  let numbers = [2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12];

  const [allElements, setAllElements] = useState(allElementsInitial);

  const shuffleArray = () => {
    const shuffledElements = [...allElements];
    for (let i = shuffledElements.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledElements[i], shuffledElements[j]] = [shuffledElements[j], shuffledElements[i]];
    }
    setAllElements(shuffledElements)

    // making the array for the numbers

  };

  const shuffleNumberArray = () => {
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
  }
  numbers = shuffleNumberArray();
  console.log(numbers)

  return (
    <div className="App">
      <Button onClick={shuffleArray} variant="contained">Shuffle</Button>
      <div className="main">
        <div className="container three">
          {allElements.slice(0, 3).map((element, idx) => <div className={element}><div>{numbers[idx]}</div></div>)}
        </div>
        <div className="container four">
          {allElements.slice(3, 7).map((element, idx)=> <div className={element}><div>{numbers[idx+3]}</div></div>)}
        </div>
        <div className="container">
          {allElements.slice(7, 12).map((element, idx) => <div className={element}><div>{numbers[idx+7]}</div></div>)}
        </div>
        <div className="container four">
          {allElements.slice(12, 16).map((element, idx) => <div className={element}><div>{numbers[idx+12]}</div></div>)}
        </div>
        <div className="container three">
          {allElements.slice(16, 19).map((element, idx) => <div className={element}><div>{numbers[idx+16]}</div></div>)}
        </div>
      </div>
    </div>
  );
}

export default App;
