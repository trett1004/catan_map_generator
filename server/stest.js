const jsonfile = require('jsonfile')

jsonfile.readFile('./databases.json', (err, databases) => {
  if (err) {
    console.log(`Error reading file from disk: ${err}`)
  } else {
    databases.forEach(db => {
      console.log(`${db.name}: ${db.type}`)
    })
  }
})