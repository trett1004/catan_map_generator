import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import Btn from '../Btn/Btn.js';
import GreenAlert from '../Alert/Alert.js';

export default function BasicRating({allElements, numbers}) {
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
      <Btn onClick={() => handleRateClick(allElements, numbers, setAlert, value)} content="RATE" />
      <div>{alert ? <GreenAlert content="Rating received" severity="success" /> : <></>}</div>
    </Box>
  );
}

// Save board to db
const handleRateClick = (allElements, numbers, setAlert, value) => {
    console.log('value', value)
    fetch('/rate', {
      method: 'POST',
      body: JSON.stringify({
        fieldArray: allElements,
        numberArray: numbers,
        rating: value,
        voteCount: 1
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