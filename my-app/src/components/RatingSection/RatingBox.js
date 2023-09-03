import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import Btn from "../Btn/Btn.js";
import GreenAlert from "../Alert/Alert.js";
import "./RatingBox.css"

export function RatingBox({ landfields, numbers, mapName, dbData, setData }) {
  const [value, setValue] = React.useState(2.5);
  const [alert, setAlert] = React.useState(false);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography variant="h5" component="legend">
        Please rate the map
      </Typography>
      <Rating
        name="simple-controlled"
        precision={0.5}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Btn
        onClick={() =>
          handleRateClick(
            landfields,
            numbers,
            setAlert,
            value,
            mapName,
            dbData,
            setData
          )
        }
        content="RATE"
      />
      <div>
        {alert && (
          <GreenAlert
            content="Rating received. Please Update page to view"
            severity="success"
          />
        )}
      </div>
    </Box>
  );
}

// Save board to db
const handleRateClick = (
  landfields,
  numbers,
  setAlert,
  value,
  mapName,
  dbData,
  setData
) => {
  // find map to determine if an existing map should be updated or a new entry should be created
  let foundMap = dbData.find((element) => element["mapName"] === mapName);
  let ratePromise;
  // if existing map is rated update the rating array in db
  if (typeof foundMap != "undefined") {
    ratePromise = fetch("/rate_existing_map", {
      method: "POST",
      body: JSON.stringify({
        _id: foundMap["_id"],
        rev: foundMap["_rev"],
        rating: value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
  } else {
    // else it is a new map, so post complete dataset to db
    ratePromise = fetch("/rate_new_map", {
      method: "POST",
      body: JSON.stringify({
        _id: 0,
        fieldArray: landfields,
        numberArray: numbers,
        rating: [value],
        voteCount: 1,
        mapName: mapName,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
  }
  ratePromise
    .then((res) => {
      return res.json();
    })
    .then((dbData) => {
      setData(dbData.array);
    })
    .then((_) => {
      setAlert(true);
      window.setTimeout(() => setAlert(false), 2000);
    })
    .catch((err) => console.log(err));
};