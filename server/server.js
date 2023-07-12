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

// handle get request (table of best maps)
server.get("/api", (req, res) => {
  myDB.list({
    include_docs: true
  }).then(
    dbRes => {
      const myArray = dbRes.rows.map(val => val.doc);
      console.log('myarray', myArray);
      res.json({ array: myArray, message: "API TEST:Hello from server!" });
    }
  ).catch(
    console.warn
  )

});

// // get data from db
// myDB.list({
//   include_docs: true
// }).then(
//   res => res.rows.map(val => val.doc)
// ).then(
//   res => console.log(res)
// ).catch(
//   console.warn
// )

// handle post request (rating)
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





