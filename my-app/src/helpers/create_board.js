var dockerNames = require('docker-names');

// creating the array with the background images for the hexagons
const wood = new Array(4).fill('wood');
const weat = new Array(4).fill('weat');
const sheep = new Array(4).fill('sheep');
const stone = new Array(3).fill('stone');
const clay = new Array(3).fill('clay');
const landfieldsArr = [...wood, ...weat, ...sheep, ...stone, ...clay, 'desert'];
// create the array for the numbers on each hexagon
const fieldNumbersArr = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12, -1];
const portsArr = ['threeToOnePort', 'water', 'weatPort', 'water', 'water', 'stonePort', 'threeToOnePort', 'water', 'water','threeToOnePort', 'clayPort', 'water', 'water', 'sheepPort', 'threeToOnePort', 'water',  'woodPort', 'water' ];


// shuffle the backgroundimages
const shufflelImages = ({ landfields }) => {
    const shuffledElements = [...landfields];
    for (let i = shuffledElements.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // swap
        [shuffledElements[i], shuffledElements[j]] = [shuffledElements[j], shuffledElements[i]];
    }

    return shuffledElements;
};

// shuffle the numbers
const shuffleNumberArray = ({numbers, shuffledElements}) => {
    const shuffledNumbers = [...numbers];
    for (let i = shuffledNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // swap
        [shuffledNumbers[i], shuffledNumbers[j]] = [shuffledNumbers[j], shuffledNumbers[i]];
    }
    // to prevent the display of the number (the number is always -1) on the desert-field
    const x = shuffledElements.findIndex(element => element === 'desert');
    const y = shuffledNumbers.findIndex(element => element === -1);
    [shuffledNumbers[x], shuffledNumbers[y]] = [shuffledNumbers[y], shuffledNumbers[x]];

    return shuffledNumbers;
}

const getRandomName = () => {
    const randomName = dockerNames.getRandomName()
    return randomName
}


export { shufflelImages, landfieldsArr, shuffleNumberArray, fieldNumbersArr, getRandomName, portsArr }