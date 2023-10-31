import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";

import Btn from "../Btn/Btn.js";
import "./TableOfRatings.css";
import { classes } from "../../helpers/theme";

function createData(rating, votes, mapName, _id) {
  return { rating, votes, mapName, _id };
}

function TableOfRatings({ setLandfields, setNumbers, setName, dbData }) {
  let tableData = [];
  if (dbData) {
    tableData = dbData.map((element) => {
      // calculate the average rating. rating is an array, so compute average of array elements
      const ratingArr = element["rating"];
      const sumOfRatings = ratingArr.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const averageRating = sumOfRatings / ratingArr.length;
      // return average Rating, number of votes and the name of the map
      return createData(
        averageRating,
        ratingArr.length,
        element["mapName"],
        element._id
      );
    });
    // Sort the tableData array according to best averagerating in descending order after mapping all the elements so the table displays the top rated maps
    tableData.sort((a, b) => b.rating - a.rating);
  }
  return (
    <>
      <h3 className="tableHeader">Top rated maps</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={classes.tableCells} align="left">
                Map Name
              </TableCell>
              <TableCell sx={classes.tableCells} align="left">
                Votes
              </TableCell>
              <TableCell sx={classes.tableCells}>Average Rating</TableCell>
              <TableCell sx={classes.tableCells} align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => {
              // iterate the db entries to find the respective map
              // find matching map names
              const currentTableRowData = dbData.find(
                (element) => element.mapName === row.mapName
              );
              // change the states of the hexagonfields so the selected map is desplayed
              const loadMap = () => {
                setLandfields(currentTableRowData["fieldArray"]);
                setNumbers(currentTableRowData["numberArray"]);
                setName(currentTableRowData["mapName"]);
              };
              return (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell sx={classes.tableCells} align="left">
                    {row.mapName}
                  </TableCell>
                  <TableCell sx={classes.tableCells} align="left">
                    {row.votes}
                  </TableCell>
                  <TableCell sx={classes.tableCells} component="th" scope="row">
                    <Rating
                      name="read-only"
                      value={row.rating}
                      precision={0.5}
                      readOnly
                      sx={classes.ratingMediaQuery}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Btn
                      sx={classes.shuffleBtnMediaQuery}
                      onClick={loadMap}
                      content={"Load Map"}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableOfRatings;
