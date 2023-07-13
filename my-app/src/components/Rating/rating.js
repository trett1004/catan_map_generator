import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import Btn from '../Btn/Btn.js';
import GreenAlert from '../Alert/Alert.js';

export function BasicRating({ allElements, numbers, mapName }) {
  const [value, setValue] = React.useState(2.5);
  const [alert, setAlert] = React.useState(false);


  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Please rate the board</Typography>
      <Rating
        name="simple-controlled"
        precision={0.5}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Btn onClick={() => handleRateClick(allElements, numbers, setAlert, value, mapName)} content="RATE" />
      <div>{alert ? <GreenAlert content="Rating received. Please Update page to view" severity="success" /> : <></>}</div>
    </Box>
  );
}

// Save board to db
const handleRateClick = (allElements, numbers, setAlert, value, mapName) => {
  // to check if map already exists in db, get data from database


  console.log('value', value)
  // if existing map is rated update the rating array in db
  // find map
  // const foundMap = jsnDbData.find(element => element['mapName'] === mapName)
  // console.log('foundMap', foundMap)

  // if new map post complete dataset to db
  fetch('/rate', {
    method: 'POST',
    body: JSON.stringify({
      fieldArray: allElements,
      numberArray: numbers,
      rating: [value],
      voteCount: 1,
      mapName: mapName
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