const adjectives = ["happy", "sad", "funny", "serious", "kind", "brave", "clever", "honest", "gentle", "creative", "determined", "grateful", "patient", "generous"]
const names = ["Arthur", "Guinevere", "Lancelot", "Galahad", "Isolde", "Tristan", "Morgana", "Merlin", "Gawain", "Elaine", "Perceval", "Gwendolyn", "Gareth", "Iseult"];
var dockerNames = require('docker-names');
console.log(dockerNames.getRandomName());