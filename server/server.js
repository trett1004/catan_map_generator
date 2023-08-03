'use strict';
const fs = require('fs');

const express = require('express');
const path = require('path');

const server = express();
const port = process.env.PORT || 3300;

// Einbinden der Middleware, die die statischen Dateien ausliefert
server.use(express.static(path.join(__dirname + '/public')));
server.use(express.json());

// handle get request (table of best maps)
server.get("/api", (req, res) => {
  fs.readFile("./databases.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file", err);
      return res.status(500).json({error: err });
    }
    try {
      const mapsArray = JSON.parse(data);
      res.json({ array: mapsArray['allMapsArray'], message: "API TEST:Hello from server!" });
    } catch (parseErr) {
      console.error("Error parsing JSON file", parseErr);
      res.status(500).json({ error: parseErr });
    }
  })
});

//********************************************************* */
// handle post request for rating a new map
server.post('/rate_new_map', function requestHandler(req, res) {

  const mapData = JSON.stringify(req.body);
  console.log('req.body', req.body);
  fs.readFile("./databases.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file", err);
      return res.status(500).json({error: err });
    } try {

       // Parse the existing JSON data
      const allMapsData = JSON.parse(data);

      // check length of map array and give the next id to the newly rated map
      const arrLength = allMapsData.allMapsArray.length
      req.body['_id'] = arrLength + 1;

      // Add the new user to the 'users' array
      allMapsData.allMapsArray.push(req.body);
      // Convert the updated data back to JSON
      const updatedData = JSON.stringify(allMapsData, null, 2);

      // Write the updated data back to the JSON file
      fs.writeFile("./databases.json", updatedData, (err) => {
        if (err) {
          console.error("Error writing file", err);
          return res.status(500).json({error: err });
        }
        console.log(`File is written successfully!`)
      });
    }
    catch (parseErr) {
      console.error("Error parsing JSON file", parseErr);
    }
  });
});


// handle post request for rating an existing map
server.post('/rate_existing_map', function requestHandler(req, res) {

  //req>
//   {
//   id: '5d3f7f24a4e4202411a911488a025b80',
//   rev: '8-dcc03e9f55290be31615be71b9005682',
//   rating: 0.5
// }

  const newRating = req.body['rating'];
  const mapName = req.body['mapName'];
  const id = req.body['_id']
  console.log('id', req.body);

  fs.readFile("./databases.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file", err);
      return res.status(500).json({error: err });
    } try {
      const mapsArray = JSON.parse(data);
      res.json({ array: mapsArray['allMapsArray'], message: "API TEST:Hello from server!" });

      const foundMap = mapsArray['allMapsArray'].find(element => element['_id'] === id);
      foundMap['rating'].push(newRating);
      foundMap['voteCount'] += 1;
      console.log('mapsArray', mapsArray)

    } catch (parseErr) {
      console.error("Error parsing JSON file", parseErr);
      res.status(500).json({ error: parseErr });
    }
  })
});

//   return myDB.get(id)
//     .then(doc => {
//       console.log('doc', doc);
//       doc['rating'].push(newRating)
//       return myDB.insert(doc)
//     })
//     .then(() => {
//       return myDB.list({
//         include_docs: true
//       })
//     })
//     .then(
//       dbRes => {
//         const myArray = dbRes.rows.map(val => val.doc);
//         console.log('myarray', myArray);
//         res.json({ array: myArray, message: "API TEST:Hello from server!" });
//       }
//     )
//   .catch(err => console.error(err));
// });

// 80 ist der Standard-Port für HTTP
server.listen(port, err => console.log(err || `Server listening on port ${3300}`));
