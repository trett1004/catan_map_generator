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
import "./TableOfRatings.css"

function createData(rating, votes, mapName, _id) {
  return { rating, votes, mapName, _id };
}

function TableOfRatings({
  setLandfields,
  setNumbers,
  setName,
  dbData,
}) {
  // prepare data for table
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
      return createData(averageRating, ratingArr.length, element["mapName"], element._id);
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
              <TableCell align="left">Map Name</TableCell>
              <TableCell align="left">Votes</TableCell>
              <TableCell>Average Rating</TableCell>
              <TableCell align="left"></TableCell>
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
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.mapName}</TableCell>
                  <TableCell align="left">{row.votes}</TableCell>
                  <TableCell component="th" scope="row">
                    <Rating
                      name="read-only"
                      value={row.rating}
                      precision={0.5}
                      readOnly
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Btn onClick={loadMap} content={"Load Map"} />
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