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

// handle post request for rating a new map
server.post('/rate_new_map', function requestHandler(req, res) {
  const data = req.body;

  // save to couchDB
  return myDB.insert(req.body).then(() => {
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
  }
  )
});

// handle post request for rating an existing map
server.post('/rate_existing_map', function requestHandler(req, res) {
  const newRating = req.body['rating'];

  // save to couchDB
  const id = req.body['id']
  return myDB.get(id)
    .then(doc => {
      doc['rating'].push(newRating)
      return myDB.insert(doc)
    })
    .then(() => {
      return myDB.list({
        include_docs: true
      })
    })
    .then(
      dbRes => {
        const myArray = dbRes.rows.map(val => val.doc);
        console.log('myarray', myArray);
        res.json({ array: myArray, message: "API TEST:Hello from server!" });
      }
    )
  .catch(err => console.error(err));
});

// 80 ist der Standard-Port für HTTP
server.listen(port, err => console.log(err || `Server listening on port ${3300}`));
