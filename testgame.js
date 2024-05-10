//NOTE - Make a TicTacToe game for 2 players that will be represented with a 2D grid.
//TODO - Make an internal game grid
//TODO -  Find a way to display the game grid
//TODO - Detect whether or not there are 3 of the same counters in a row
//TODO - Display the correct winner
//TODO - Allow player input

//NOTE - npm install readline-sync

//SECTION Variables
const emptyCell = 0
const nought = 1
const cross = 2

var turnCount = 1

var isGameOver = false

const readline = require('node:readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Game grid will be a single array of 9 numbers sectioned in 3s
// The first entry (index 0) will be the top left corner of the grid, the 5th will be the center etc
var gameGrid = [emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell, emptyCell];

// Converts x and y coorindates into a single numbered position 
function findGridPosition(x, y) {
    let position = 0;

    let groupedCoordinates = `${x}${y}`;
    const input = parseInt(groupedCoordinates, 10);

    switch (input) {
        case (11): {
            position = 0
            break;
        }
        case (21): {
            position = 1
            break;
        }
        case (31): {
            position = 2
            break;
        }
        case (12): {
            position = 3
            break;
        }
        case (22): {
            position = 4
            break;
        }
        case (22): {
            position = 5
            break;
        }
        case (13): {
            position = 6
            break;
        }
        case (23): {
            position = 7
            break;
        }
        case (33): {
            position = 8
            break;
        }
        default: {
            console.log(`That is not a valid set of coordinates`);
        }
    }
    return position
}