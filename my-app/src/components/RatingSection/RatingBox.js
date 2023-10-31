import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import Btn from "../Btn/Btn.js";
import AlertField from "../Alert/Alert.js";
import "./RatingBox.css";
import { classes } from "../../helpers/theme";

export function RatingBox({ landfields, numbers, mapName, dbData, setData }) {
  const [value, setValue] = React.useState(2.5);
  const [alert, setAlert] = React.useState(false);
  const [noRatingAlert, setNoRatingAlert] = React.useState(false);

  const unshuffled = [
    2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12, -1,
  ];

  return (
    <div className="containerBox">
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}>
        <div className="containerTypographyAndRatingAndButton">
          <Typography sx={classes.h5Custom} variant="h5" component="legend">
            Please rate the map
          </Typography>
          <Rating
            data-testid="ratingStars"
            name="simple-controlled"
            precision={0.5}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            sx={classes.ratingMediaQuery}
            className="rating"
          />
          {JSON.stringify(numbers) !== JSON.stringify(unshuffled) ? (
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
              className="rateButton"
              sx={classes.shuffleBtnMediaQuery}
              content="RATE"
            />
          ) : (
            <Btn
              onClick={() => dontRateClick(setNoRatingAlert)}
              className="rateButton"
              sx={classes.shuffleBtnMediaQuery}
              content="RATE"
            />
          )}
        </div>
        <div className="flickerPreventer" data-testid="flickerPreventer">
          {alert && numbers !== unshuffled ? (
            <AlertField
              className="alert"
              content="Rating received"
              severity="success"
            />
          ) : noRatingAlert ? (
            <AlertField
              className="alert"
              content="Please shuffle the board first "
              severity="error"
            />
          ) : null}
        </div>
      </Box>
    </div>
  );
}

// if the board is not shuffled do nothing
const dontRateClick = (setNoRatingAlert) => {
  // console.log('No Rating saved because board is not shuffled');
  setNoRatingAlert(true);
  window.setTimeout(() => setNoRatingAlert(false), 2500);
  console.log("setNoRatingAlert", setNoRatingAlert);
};

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
      window.setTimeout(() => setAlert(false), 2500);
    })
    .catch((err) => console.log(err));
};
