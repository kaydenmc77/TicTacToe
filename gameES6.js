//NOTE - You must run: `npm install colors` in your terminal

//SECTION - Imports
const readline = require('readline')
const colors = require('colors');

//Creates an interface for the input and output to be used in the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
//!SECTION

//SECTION - Variables
let turn = 1
let isGameGoing = true

// Function to create a 2D array for the game grid. Creates an array with a length of 3, then fills those elements with a map of another array with a length of 3, before filling that array with 0s
const createGrid = () => { return Array(3).fill().map(() => Array(3).fill(0))};
let gameGrid = createGrid();
//!SECTION

//SECTION - Turn determination functions
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
//!SECTION

//SECTION - User interface and display functions. Shows players necessary information and allows them to enter inputs
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

// Announces who the winner of the game is (0/any value other than 1 or 2 is considered a draw) and sets isGameGoing to false to be read by the playGame function
const declareWinner = (player) => {
    console.log("");
    player === 1 ? console.log(`Player 1 has won`.blue) : ( player === 2 ? console.log(`Player 2 has won`.red) : console.log(`This game is a draw`));
    isGameGoing = false
}

const playGame = () => {
    displayGameGrid()

    let y = 0;
    let x = 0;
    player = turnDecider();

    console.log("");
    player == 1 ? console.log('It is Player 1\'s turn'.blue) : console.log('It is Player 2\'s turn'.red);

    rl.question('Enter your Y coordinate: ', (inputY) => {
        // Converts string input to number for grid access
        const numberInputY = parseInt(inputY, 10);
        y = numberInputY-1;
        // Checks if entered number is within the grid, else get player to enter a new pair of coordinates
        if(y >= 0 && y <= 2) {
            rl.question('Enter your X coordinate: ', (inputX) => {
                // Converts string input to number for grid access
                const numberInputX = parseInt(inputX, 10);
                x = numberInputX-1;
                // Checks if entered number is within the grid, else get player to enter a new pair of coordinates
                if(x >= 0 && x <= 2) {
                    // Check if position is empty, if not, get player to enter a new pair of coordinates
                    let gridPositionValue = gameGrid[y][x];
                    if(gridPositionValue == 0) {
                        // Sets position to the player's counter
                        gameGrid[y][x] = player;
                        checkForWin();
                        checkForDraw();
                        console.log("");
                        turn++;
                        // If game is still going, callback and repeat the function, else, kill the process
                        isGameGoing == true ? playGame() : process.exit();
                    }
                    else if(gridPositionValue !== 0) {
                        console.log("");
                        console.log("This spot is already taken".orange);
                        playGame();
                    }
                }
                else { playGame() };
            });
        }
        else { playGame() };
    });
}
//!SECTION

//SECTION - Win & Draw Checking Conditions aka game condition logic
const checkForWin = () => {
    // For each player, check every available combination of winning placements
    for(let player = 1; player<=2; player++) {
        // Row checks
        for(const row of gameGrid) {
            // Checks if every element in a row is the same
            if(row.every(cell => cell === player)) {
                declareWinner(player);
            }
        }
        // Column checks
        for(let gridX = 0; gridX<gameGrid.length; gridX++) {
            // Checks if elements in the same index on the 3 different nested arrays are the same
            if(gameGrid[0][gridX] == player && gameGrid[1][gridX] == player && gameGrid[2][gridX] == player) {
                declareWinner(player);
            }
        }
        // Top left to bottom right check
        let firstDiagonalCounters = 0;
        for (let i = 0; i<gameGrid.length; i++) {  
            // Checks down 1 and across 1 with each loop
            if(gameGrid[i][i] == player) {
                // Adds to a counter, if it reaches 3, it means there are 3 counters in a diagonal row
                firstDiagonalCounters++;
            }
        }
        if(firstDiagonalCounters == 3) { declareWinner(player) }
        // Top right to bottom left check
        let secondDiagonalCounters = 0;
        for (let i = 0; i<gameGrid.length; i++) {  
            // Checks down 1 and back 1 with each loop
            if(gameGrid[i][gameGrid.length - 1 - i] == player) {
                // Adds to a counter, if it reaches 3, it means there are 3 counters in a diagonal row
                secondDiagonalCounters++;
            }
        }
        if(secondDiagonalCounters == 3) { declareWinner(player) }
    }
}

// Checks if every cell is full, if yes, gives declareWinner a 0 to announce a draw
const checkForDraw = () => {
    if(gameGrid.every(row => row.every(cell => cell !== 0))) {
        declareWinner(0);
    }
}
//!SECTION

// Starts the game
playGame()