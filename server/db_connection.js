// establish connection to couchDB
const username = 'admin', password = 'm4iF49N46_';
const db = require('nano')(`http://${username}:${password}@127.0.0.1:5984`).db;

// specify database within couch DB
let myDB = db.use(dbName);
// Needed once: Set up database
/*
const init = () => {
    db.create('games').then(
    console.log
    ).catch(
    console.warn
    );
}

init();
*/

module.exports = myDB;