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

function getUserInput() {
    // Include readline here for input
    let x = 0
    let y = 0

    // Check if input is valid, if not, perform recursion
    let gridPositionValue = gameGrid[y][x]
    console.log(gridPositionValue)
    if(gridPositionValue == 0) {
        console.log("This is a valid spot")
        gameGrid[y][x] = turnDecider()
    }
    else if(gridPositionValue !== 0) {
        console.log("This spot is already taken")
        getUserInput()
    }
}

function checkForWin() {

}

function checkForDraw() {

}

function playGame() {
    // Parent function to call every playable feature
    displayGameGrid()

    getUserInput()

    checkForWin()
    
    checkForDraw()

    turn++

}

displayGameGrid()
console.log(getUserInput())