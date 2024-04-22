//NOTE - Make a TicTacToe game for 2 players that will be represented with a 2D grid.
//TODO - Make an internal game grid
//TODO -  Find a way to display the game grid
//TODO - Detect whether or not there are 3 of the same counters in a row
//TODO - Display the correct winner
//TODO - Allow player input

// Variables
const emptyCell = 0
const nought = 1
const cross = 2

var activeCounter = 0

var turnCount = 0

var coordinates = [];
var position = 0

// Game grid will be a single array of 9 numbers sectioned in 3s
// The first entry (index 0) will be the top left corner of the grid, the 5th will be the center etc
var gameGrid = [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell];
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

// Converts x and y coorindates into a single numbered position 
function findGridPosition(x = Int, y = Int) {
    let position = 0

    switch (x, y) {
        case (1, 1): {
            position = 1
            break;
        }
        case (2, 1): {
            position = 2
            break;
        }
        case (3, 1): {
            position = 3
            break;
        }
        case (1, 2): {
            position = 4
            break;
        }
        case (2, 2): {
            position = 5
            break;
        }
        case (3, 2): {
            position = 6
            break;
        }
        case (1, 3): {
            position = 7
            break;
        }
        case (2, 3): {
            position = 8
            break;
        }
        case (3, 3): {
            position = 9
            break;
        }
        default: {
            console.log(`That is not a valid set of coordinates`);
        }
    }
    return position
}

function displayGameGrid(gameGrid = Array) {
    console.log(gameGrid[0], gameGrid[1], gameGrid[2])
    console.log(gameGrid[3], gameGrid[4], gameGrid[5])
    console.log(gameGrid[6], gameGrid[7], gameGrid[8])
}

function counterDecider(turnCount) {
    const isEven = num => num % 2 === 0;

    if(isEven(turnCount)) {
        activeCounter = 2
    }
    else{
        activeCounter = 1
    }
}

displayGameGrid(gameGrid)