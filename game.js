//TODO - Create a TicTacToe game that allows 2 players to hotseat, enter an input onto the grid and then hand over the keyboard

//TODO - Set global variables for counters and turns etc
//TODO - Create a board
//TODO - Allow for user input
//TODO - Switch player
//TODO - Check for win
//TODO - Check for draw (grid full)
//TODO - Display the game grid

//NOTE - You must run: `npm install colors` in your terminal

//SECTION - Variables
let emptyPosition = 0

let turn = 1
let gameState = true

let player1Colour = `\x1b[31m`
let player2Colour = `\x1b[34m`

// Import readline function
const readline = require('readline')

// Imports colours
const colors = require('colors');

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

function strippedDisplayOfGrid() {
    gameGrid.forEach(v=>console.log(...v))
    console.log("")
}

function displayGameGrid() {
    console.log(`┏━━━┳━━━┳━━━┳━━━┓`)
    console.log(`┃y/x┃ 1 ┃ 2 ┃ 3 ┃`)
    console.log(`┣━━━╋━━━╋━━━╋━━━┫`)
    console.log(`┃ 1 ┃ ${counterDecider(gameGrid[0][0])} ┃ ${counterDecider(gameGrid[0][1])} ┃ ${counterDecider(gameGrid[0][2])} ┃`)
    console.log(`┣━━━╋━━━╋━━━╋━━━┫`)
    console.log(`┃ 2 ┃ ${counterDecider(gameGrid[1][0])} ┃ ${counterDecider(gameGrid[1][1])} ┃ ${counterDecider(gameGrid[1][2])} ┃`)
    console.log(`┣━━━╋━━━╋━━━╋━━━┫`)
    console.log(`┃ 3 ┃ ${counterDecider(gameGrid[2][0])} ┃ ${counterDecider(gameGrid[2][1])} ┃ ${counterDecider(gameGrid[2][2])} ┃`)
    console.log(`┗━━━┻━━━┻━━━┻━━━┛`)
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

function counterDecider(number) {
    if(number == 0) { return ` `}
    else if(number == 1) { return (`O`).blue}
    else if(number == 2) { return (`X`).red}
}

//NOTE - IT'S WORKING
function getUserInput() {
    let y = 0
    let x = 0

    // Include readline here for input
    console.log("")
    if(turnDecider() == 1) { console.log('It is Player 1\'s turn'.blue); }
    else if(turnDecider() == 2) { console.log((`It is Player 2's turn`).red) }
    
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

                        checkForWin()

                        checkForDraw()

                        console.log("")

                        turn++
                        if(gameState == true) { playGame() }
                        else{ process.exit() }
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
        for(let player = 1; player<=2; player++) {
            if(gameGrid[gridY][0] == player && gameGrid[gridY][1] == player && gameGrid[gridY][2] == player) {
                declareWinner(player, `by going across row ${gridY+1}`)
            }
        }
    }
    // Checks columns
    for(let gridX = 0; gridX<gameGrid.length; gridX++) {
        for(let player = 1; player<=2; player++) {
            if(gameGrid[0][gridX] == player && gameGrid[1][gridX] == player && gameGrid[2][gridX] == player) {
                declareWinner(player, `by going down column ${gridX+1}`)
            }
        }
    }
}   

function checkForDiagonals(player) {
    // Check top left to bottom right diagonal
    let firstDiagonal = false;
    let firstDiagonalCount = 0;
    for (let i = 0; i<gameGrid.length; i++) {
        if(gameGrid[i][i] == player) {
            firstDiagonalCount++
        }
    }
    // Check top left to bottom right diagonal
    let secondDiagonal = false;
    let secondDiagonalCount = 0;
    for (let i = 0; i<gameGrid.length; i++) {
        if(gameGrid[i][gameGrid.length - 1 - i] == player) {
            secondDiagonalCount++
        }
    }

    if(firstDiagonalCount == 3) { firstDiagonal = true }
    if(secondDiagonalCount == 3) { secondDiagonal = true }


    return [firstDiagonal, secondDiagonal]
}

function checkForWin() {
    checkForRowColumn()
    for(let player = 1; player<=2; player++) {
        let result = checkForDiagonals(player)
        if(result[0] == true) {declareWinner(player, `by going from the top left to the bottom right`)}
        if(result[1] == true) {declareWinner(player, `by going from the top right to the bottom left`)}
    }
}

function checkForDraw() {
    let gridFull = false
    for(let gridY = 0; gridY<gameGrid.length; gridY++) {
        if(gameGrid[gridY][0] !== 0 && gameGrid[gridY][1] !== 0 && gameGrid[gridY][2] !== 0) {
            gridFull = true
        }
        else { gridFull = false }
    }
    if(gridFull === true) { declareWinner(0) }
}

function declareWinner(player, deciderfunction) {
    console.log("")
    if(player === 0) { console.log(`This game is a draw`) }
    else if(player === 1) { console.log(`Player 1 has won, ${deciderfunction}`.blue) }
    else if(player === 2) { console.log(`Player 2 has won, ${deciderfunction}`.red) }
    gameState = false
}

function playGame() {
    // Parent function to call every playable feature
    displayGameGrid()
    getUserInput()
}

playGame()