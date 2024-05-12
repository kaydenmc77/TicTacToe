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
let turn = 1
let gameState = true

// Import readline function
const readline = require('readline')

// Imports colours
const colors = require('colors');

//Create an interfacefor the input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Function to create a 2D array for the game grid. Creates an array with a length of 3, then fills those elements with a map of an array again with a length of 3, before filling that array with 0s
const createGrid = () => { return Array(3).fill().map(() => Array(3).fill(0))};
let gameGrid = createGrid();

// If number of turn is even, it is Player 2's turn
const turnDecider = () => {
    let player = 0; 
    // Finds the remainder of a number when divided by 2. If no remainder, number is even
    turn % 2 === 0 ? player = 2 : player = 1;
    return player;
}

// If number is 1, return a blue naught. If number is 1, return a red cross. Else, it is a blank space
const counterDecider = (number) => {
    return number == 1 ? (`O`).blue : (number == 2 ? (`X`).red : ` `)
}

const displayGameGrid = () => {
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

const getUserInput = () => {
    let y = 0;
    let x = 0;

    console.log("");
    turnDecider() == 1 ? console.log('It is Player 1\'s turn'.blue) : console.log('It is Player 2\'s turn'.red);

    rl.question('Enter your Y coordinate: ', (inputY) => {
        // Quick exit function for testing
        if(inputY.toLowerCase === 'end') { process.exit() };

        // Converts string input to number for grid access
        const numberInputY = parseInt(inputY, 10);
        y = numberInputY-1;

        // Checks if entered number is within the grid
        if(y >= 0 && y <= 2) {
            rl.question('Enter your X coordinate: ', (inputX) => {
                // Quick exit function for testing
                if(inputX.toLowerCase === 'end') { process.exit() };

                // Converts string input to number for grid access
                const numberInputX = parseInt(inputX, 10);
                x = numberInputX-1;

                // Checks if entered number is within the grid
                if(x >= 0 && x <= 2) {
                    // Check if position is empty, if not, callback
                    let gridPositionValue = gameGrid[y][x];
                    if(gridPositionValue == 0) {
                        // Sets position to the player's counter
                        gameGrid[y][x] = turnDecider();

                        checkForWin();

                        checkForDraw();

                        console.log("");

                        turn++;

                        gameState == true ? playGame() : process.exit();
                    }
                    else if(gridPositionValue !== 0) {
                        console.log("This spot is already taken");
                        getUserInput();
                    }
                }
                else { getUserInput() };
            });
        }
        else { getUserInput() };
    });
}

const checkRows = () => {
    for(const row of gameGrid) {
        for(let player = 1; player<=2; player++) {
            if(row.every(cell => cell === player)) {
                declareWinner(player);
            }
        }
    }
}

const checkColumns = () => {
    for(let gridX = 0; gridX<gameGrid.length; gridX++) {
        for(let player = 1; player<=2; player++) {
            if(gameGrid[0][gridX] == player && gameGrid[1][gridX] == player && gameGrid[2][gridX] == player) {
                declareWinner(player)
            }
        }
    }
}

const checkMainDiagonal = () => {
    for(let player = 1; player<=2; player++) {
        let diagonalCounters = 0;
        for (let i = 0; i<gameGrid.length; i++) {  
            if(gameGrid[i][i] == player) {
                diagonalCounters++
            }
        }
        if(diagonalCounters == 3) { declareWinner(player) }
    } 
}

const checkSecondaryDiagonal = () => {
    for(let player = 1; player<=2; player++) {
        let diagonalCounters = 0;
        for (let i = 0; i<gameGrid.length; i++) {  
            if(gameGrid[i][gameGrid.length - 1 - i] == player) {
                diagonalCounters++
            }
            
        }
        if(diagonalCounters == 3) { declareWinner(player) }
    } 
}

const checkForWin = () => {
    checkRows()
    checkColumns()
    checkMainDiagonal()
    checkSecondaryDiagonal
}

// Checks if every cell is full, if yes, gives declareWinner a 0 to announce a draw
const checkForDraw = () => {
    if (gameGrid.every(row => row.every(cell => cell !== 0))) {
        declareWinner(0);
    }
}

const declareWinner = () => {
    console.log("");
    player === 1 ? console.log(`Player 1 has won`.blue) : ( player === 2 ? console.log(`Player 2 has won`.red) : console.log(`This game is a draw`)):
    gameState = false
}

const playGame = () => {
    displayGameGrid()
    getUserInput()
}

playGame()