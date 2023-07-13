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
    const [data, setData] = React.useState(null);
    // API check
    useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(JSON.stringify(data.array)));

    }, []);

    // prepare data for table
    let tableData = [];
    let jsnData = JSON.parse(data)
    console.log('jsnData', jsnData)
    if (data) {
        tableData = jsnData.map((element) => {
            // rating is an array. compute average of array
            const ratingArr = element['rating']
            const sumOfRatings = ratingArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            const averageRating =  sumOfRatings / ratingArr.length
            // return average Rating, number of votes and the name of the map
            return createData(averageRating, ratingArr.length, element['mapName']);
        });
    }
    console.log('tableData', tableData)

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
                        const currentTableRowData = jsnData.find(element => element.mapName === row.mapName)
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