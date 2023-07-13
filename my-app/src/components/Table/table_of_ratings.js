import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';

import Btn from '../Btn/Btn.js'

function createData(rating, votes, mapName) {
    return { rating, votes, mapName };
}

export default function DenseTable({ setAllElements, setNumbers, setName }) {
    const [dbData, setData] = React.useState(null);
    // Get data from database
    useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((dbData) => setData(dbData.array));
    }, []);
    console.log('data', dbData)

    // prepare data for table
    let tableData = [];
    if (dbData) {
        tableData = dbData.map((element) => {
            // rating is an array, so compute average of array
            const ratingArr = element['rating']
            const sumOfRatings = ratingArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            const averageRating =  sumOfRatings / ratingArr.length
            // return average Rating, number of votes and the name of the map
            return createData(averageRating, ratingArr.length, element['mapName']);
        });
    }
    return (
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
                        // find if there are matching map names
                        const currentTableRowData = dbData.find(element => element.mapName === row.mapName)
                        // change the states so the map is desplayed in the hexagonfields
                        const loadMap = () => {
                            setAllElements(currentTableRowData['fieldArray']);
                            setNumbers(currentTableRowData['numberArray']);
                            setName(currentTableRowData['mapName']);
                        };
                        console.log('row.rating', row.rating)
                        return (
                            <TableRow
                                key={row.rating}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{row.mapName}</TableCell>
                                <TableCell align="left">{row.votes}</TableCell>
                                <TableCell component="th" scope="row">
                                    <Rating name="read-only" value={row.rating} precision={0.5} readOnly />
                                </TableCell>
                                <TableCell align="left"><Btn onClick={loadMap} content={"Load Map"} /></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}