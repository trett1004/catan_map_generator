const fs = require('fs')

let user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 27,
    gender: 'Male',
    profession: 'Software Developer'
  }
  
  // convert JSON object to a string
const data = JSON.stringify(user, null, 4)
  
  // write file to disk
  fs.writeFile('./databases.json', data, 'utf8', err => {
    if (err) {
      console.log(`Error writing file: ${err}`)
    } else {
      console.log(`File is written successfully!`)
    }
  })


  {
    "allMapsArrauy": []
  }