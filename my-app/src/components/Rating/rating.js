import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import Btn from '../Btn/Btn.js';
import GreenAlert from '../Alert/Alert.js';

export function BasicRating({ allElements, numbers, mapName, dbData, setData }) {
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
      <Btn onClick={() => handleRateClick(allElements, numbers, setAlert, value, mapName, dbData, setData)} content="RATE" />
      <div>{alert ? <GreenAlert content="Rating received. Please Update page to view" severity="success" /> : <></>}</div>
    </Box>
  );
}

// Save board to db
const handleRateClick = (allElements, numbers, setAlert, value, mapName, dbData, setData) => {
  // to check if map already exists in db, get data from database

  // find map
  let foundMap = dbData.find(element => element['mapName'] === mapName)
  let ratePromise;
  // if existing map is rated update the rating array in db
  if (typeof foundMap != "undefined") {
    ratePromise = fetch('/rate_existing_map', {
      method: 'POST',
      body: JSON.stringify({
        id: foundMap['_id'],
        rev: foundMap['_rev'],
        rating: value,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });
  } else {
    // else it is a new map, so post complete dataset to db
    ratePromise = fetch('/rate_new_map', {
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
  }
  ratePromise
  .then((res) => res.json())
  .then((dbData) => {
    setData(dbData.array);
    console.log(dbData.array)
  })
  .then((_) => {
    setAlert(true);
    window.setTimeout(() => setAlert(false), 2000)
  })
  .catch ((err) => console.log(err.message))
}