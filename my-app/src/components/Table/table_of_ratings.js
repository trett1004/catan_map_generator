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

function createData(rating, votes, fields) {
    return { rating, votes, fields };
}

export default function DenseTable() {
    const [data, setData] = React.useState(null);
    // API check
    useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(JSON.stringify(data.array)));

    }, []);

    let tableData = [];
    let jsnData = JSON.parse(data)
    console.log('jsnData', jsnData)
    if (data) {
      tableData = jsnData.map((element) => {
        return createData(element['rating'], element['voteCount'], element['fieldArray']);
      });
    }
    console.log('tableData', tableData)

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>rating</TableCell>
                        <TableCell align="left">votes</TableCell>
                        <TableCell align="left">fields</TableCell>
            {/* // <TableCell align="right">numbers</TableCell>
            // <TableCell align="right">rating</TableCell>
            // <TableCell align="right">votes</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row) => (
                        <TableRow
                            key={row.rating}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            <Rating name="read-only" value={row.rating} precision={0.5} readOnly />
                            </TableCell>
                            <TableCell align="left">{row.votes}</TableCell>
                            <TableCell align="left">{row.fields}</TableCell>
                            {/* <TableCell align="right">{row.numbers}</TableCell>
              <TableCell align="right">{row.rating}</TableCell>
              <TableCell align="right">{row.votes}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}