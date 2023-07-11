'use strict';

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
  console.log('res', res)
  res.end('Rating was added');
});

// 80 ist der Standard-Port für HTTP
server.listen(port, err => console.log(err || `Server listening on port ${3300}`));



