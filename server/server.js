'use strict';

// establish connection to couchDB
const username = 'admin', password = 'm4iF49N46_';
const db = require('nano')(`http://${username}:${password}@127.0.0.1:5984`).db;
const dbName = "games";
let myDB = db.use(dbName);

const express = require('express');

const server = express();
const port = 3300;

// Einbinden der Middleware, die die statischen Dateien ausliefert
server.use(express.static('public'));
server.use(express.json());

// api test
server.get("/api", (req, res) => {
  res.json({ message: "API TEST:Hello from server!" });
});

// handle post request
server.post('/rate', function requestHandler(req, res) {
  const data = req.body;
  console.log('res', req.body)
  res.end('Rating was added');

  // save to couchDB
  myDB.insert(req.body).then(
    console.log
  ).catch(
    console.warn
  )
});




// 80 ist der Standard-Port für HTTP
server.listen(port, err => console.log(err || `Server listening on port ${3300}`));





