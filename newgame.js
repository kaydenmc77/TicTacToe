//TODO - Create a TicTacToe game that allows 2 players to hotseat, enter an input onto the grid and then hand over the keyboard

//TODO - Set global variables for counters and turns etc
//TODO - Create a board
//TODO - Allow for user input
//TODO - Switch player
//TODO - Check for win
//TODO - Check for draw (grid full)
//TODO - Display the game grid

//SECTION - Variables
let emptyPosition = 0
let naught = 1
let cross = 2

let turn = 1
let gameState = true

const { get } = require('https')
const { getuid } = require('process')
// Import readline function
const readline = require('readline')

//Create an interfacefor the input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let gameGrid = createGrid()
//

function createGrid() {
    // Get Grid size, (keep x & y the same for square grid)
    // Create a 2 dimensional array (arrays within array)
    // Create y amount of arrays, add x number of values within it
    let gridSize = 3

    let gameGrid = []
    for(let gridY = 0; gridY<gridSize; gridY++) {
        let nestedArray = []
        for(let gridX = 0; gridX<gridSize; gridX++) {
            nestedArray.push(emptyPosition)
        }
        gameGrid.push(nestedArray)
    }
    return gameGrid
}

function displayGameGrid() {
    gameGrid.forEach(v=>console.log(...v))
    console.log("")
}

function turnDecider() {
    const isEven = num => num % 2 === 0;
    let player = 0

    if(isEven(turn)) {
        player = 2
    }
    else{
        player = 1
    }
    return player
}

//NOTE - IT'S WORKING
function getUserInput() {
    let y = 0
    let x = 0

    // Include readline here for input
    rl.question('Enter your Y coordinate: ', (inputY) => {
        // Quick exit function for testing
        if(inputY === 'end') { process.exit() }
        // Converts string input to number for grid access
        const numberInputY = parseInt(inputY, 10);
        y = numberInputY-1

        if(y >= 0 && y <= 2) {
            rl.question('Enter your X coordinate: ', (inputX) => {
                // Quick exit function for testing
                if(inputX === 'end') { process.exit() }
                // Converts string input to number for grid access
                const numberInputX = parseInt(inputX, 10);
                x = numberInputX-1

                if(x >= 0 && x <= 2) {
                    // Check if position is empty, if not, callback
                    let gridPositionValue = gameGrid[y][x]
                    if(gridPositionValue == 0) {
                        // Sets position to the player's counter
                        gameGrid[y][x] = turnDecider()

                        console.log("")
                        displayGameGrid()

                        checkForWin()

                        checkForDraw()

                        rl.close();
                    }
                    else if(gridPositionValue !== 0) {
                        console.log("This spot is already taken")
                        getUserInput()
                    }
                }
                else { getUserInput() }
            });
        }
        else { getUserInput() }
    });
}

function checkForRowColumn() {
    // Checks rows
    for(let gridY = 0; gridY<gameGrid.length; gridY++) {
        for(let player = 1; player<2; player++) {
            if(gameGrid[gridY][0] == player && gameGrid[gridY][1] == player && gameGrid[gridY][2] == player) {
                declareWinner(player)
            }
        }
    }
    // Checks columns
    for(let gridX = 0; gridX<gameGrid.length; gridX) {
        for(let player = 1; player<2; player++) {
            if(gameGrid[0][gridX] == player && gameGrid[1][gridX] == player && gameGrid[2][gridX] == player) {
                declareWinner(player)
            }
        }
    }
}   

function checkForDiagonals(player) {
    // Check top left to bottom right diagonal
    let firstDiagonal = false;
    for (let i = 0; i<gameGrid.length; i++) {
        if(gameGrid[i][i] == player) {
            firstDiagonal = true
        }
        else{ firstDiagonal = false }
    }
    // Check top left to bottom right diagonal
    let secondDiagonal = false;
    for (let i = 0; i<gameGrid.length; i++) {
        if(gameGrid[i][gameGrid.length - 1 - i] == player) {
            secondDiagonal = true
        }
        else{ secondDiagonal = false }
    }

    return firstDiagonal || secondDiagonal;
}

function checkForWin() {
    checkForRowColumn()
    for(let player = 1; player<2; player++) {
        let result = checkForDiagonals(player)
        if(result == true) {declareWinner(player)}
    }
}

function checkForDraw() {
    let gridFull = false
    for(let gridY = 0; gridY<gameGrid.length; gridY++) {
        if(gameGrid[gridY][0] !== 0 && gameGrid[gridY][1] !== 0 && gameGrid[gridY][2] !== 0) {
            gridFull = true
        }
    }
    if(gridFull === true) { declareWinner(0) }
}

function declareWinner(player) {
    if(player === 0) { console.log(`This game is a draw`) }
    else{ console.log(`Player ${player} has won`) }
    process.exit()
}

function playGame() {
    // Parent function to call every playable feature

    // Replace with while loop that checks if game is still going
    displayGameGrid()

    getUserInput()
}

playGame()