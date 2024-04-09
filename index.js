/*
Create a function that takes a grid of $ and - where each ($) represents a mine and each (-) represents mine-free spots
Return an array where each ($) is replaced by a digit indicating the number of adjacent mines
*/ 

// Variables

let emptyCell = 0
let crossCell = 1
let noughtCell = 2

let gameGrid = [0, 1, 0,
    0, 1, 0,
    2, 1, 0];

let turnCount = 1

const winningCombos = [
[1, 4, 7],
[2, 5, 8],
[3, 6, 9],
[1, 2, 3],
[4, 5, 6],
[7, 8, 9],
[1, 5, 9],
[3, 5, 7]
];

// End Variables

function isEven(n) {
    return n % 2 == 0;
 }

const checkValidity = (x = int, y = int) => arr[y] ? arr[y][x] : null

function checkWinningCombos(turnCount = Int, gameGrid = arr) {
    let player = 0
    if(isEven(turnCount)) player = 2;
    else player = 1;

    let result = []
    let placedCounters = []

    for(let i = 0; i<gameGrid.length; i++) {
        if(gameGrid[i] == player) {
            placedCounters.push(i)
        }
    }

    for(let i = 0; i < winningCombos.length; i++) {
        if(placedCounters == winningCombos[i]) result.push(player);
    }
    result.push(placedCounters)
    return result
}

function displayGameGrid(gameGrid = arr) {
    // gameGrid.forEach(v=>console.log(...v))
    console.log(`${gameGrid[0]}, ${gameGrid[1]}, ${gameGrid[2]}`);
    console.log(`${gameGrid[3]}, ${gameGrid[4]}, ${gameGrid[5]}`);
    console.log(`${gameGrid[6]}, ${gameGrid[7]}, ${gameGrid[8]}`);
}

displayGameGrid(gameGrid)
console.log(checkWinningCombos(turnCount, gameGrid))
