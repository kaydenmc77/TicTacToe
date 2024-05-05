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
function findGridPosition(groupedCoordinates) {
    let position = 0;

    
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

//SECTION - Hard coded win checks
const winConditions = {
    checkRow1: 
    function() {
        let array = []
        array.push(gameGrid[0])
        array.push(gameGrid[1])
        array.push(gameGrid[2])

        let playerVictory = 0
        let countO = 0;
        let countX = 0;

        for(let i = 0; 0<array.length; i++) {
            if(array[i] === 1) {
                countO ++;
            }
            else if(array[i] === 2) {
                countX ++;
            }
        }
        if(countO === 3) {
            playerVictory = 1
        }
        else if(countX === 3) {
            playerVictory = 2
        }
        return playerVictory
    },
    checkRow2: function() {
        let array = []
        array.push(gameGrid[3])
        array.push(gameGrid[4])
        array.push(gameGrid[5])

        let playerVictory = 0
        let countO = 0;
        let countX = 0;

        for(let i = 0; 0<array.length; i++) {
            if(array[i] === 1) {
                countO ++;
            }
            else if(array[i] === 2) {
                countX ++;
            }
        }
        if(countO === 3) {
            playerVictory = 1
        }
        else if(countX === 3) {
            playerVictory = 2
        }
        return playerVictory
    },
    checkRow3: 
    function() {
        let array = []
        array.push(gameGrid[6])
        array.push(gameGrid[7])
        array.push(gameGrid[8])

        let playerVictory = 0
        let countO = 0;
        let countX = 0;

        for(let i = 0; 0<array.length; i++) {
            if(array[i] === 1) {
                countO ++;
            }
            else if(array[i] === 2) {
                countX ++;
            }
        }
        if(countO === 3) {
            playerVictory = 1
        }
        else if(countX === 3) {
            playerVictory = 2
        }
        return playerVictory
    },
    checkColumn1: 
    function() {
        let array = []
        array.push(gameGrid[0])
        array.push(gameGrid[3])
        array.push(gameGrid[6])

        let playerVictory = 0
        let countO = 0;
        let countX = 0;

        for(let i = 0; 0<array.length; i++) {
            if(array[i] === 1) {
                countO ++;
            }
            else if(array[i] === 2) {
                countX ++;
            }
        }
        if(countO === 3) {
            playerVictory = 1
        }
        else if(countX === 3) {
            playerVictory = 2
        }
        return playerVictory
    },
    checkColumn2:
    function() {
        let array = []
        array.push(gameGrid[1])
        array.push(gameGrid[4])
        array.push(gameGrid[7])

        let playerVictory = 0
        let countO = 0;
        let countX = 0;

        for(let i = 0; 0<array.length; i++) {
            if(array[i] === 1) {
                countO ++;
            }
            else if(array[i] === 2) {
                countX ++;
            }
        }
        if(countO === 3) {
            playerVictory = 1
        }
        else if(countX === 3) {
            playerVictory = 2
        }
        return playerVictory
    },
    checkColumn3: 
    function() {
        let array = []
        array.push(gameGrid[2])
        array.push(gameGrid[5])
        array.push(gameGrid[8])

        let playerVictory = 0
        let countO = 0;
        let countX = 0;

        for(let i = 0; 0<array.length; i++) {
            if(array[i] === 1) {
                countO ++;
            }
            else if(array[i] === 2) {
                countX ++;
            }
        }
        if(countO === 3) {
            playerVictory = 1
        }
        else if(countX === 3) {
            playerVictory = 2
        }
        return playerVictory
    },
    checkDiagonalTopLeft: 
    function() {
        let array = []
        array.push(gameGrid[0])
        array.push(gameGrid[4])
        array.push(gameGrid[8])

        let playerVictory = 0
        let countO = 0;
        let countX = 0;

        for(let i = 0; 0<array.length; i++) {
            if(array[i] === 1) {
                countO ++;
            }
            else if(array[i] === 2) {
                countX ++;
            }
        }
        if(countO === 3) {
            playerVictory = 1
        }
        else if(countX === 3) {
            playerVictory = 2
        }
        return playerVictory
    },
    checkDiagonalTopRight: function() {
        let array = []
        array.push(gameGrid[2])
        array.push(gameGrid[4])
        array.push(gameGrid[6])

        let playerVictory = 0
        let countO = 0;
        let countX = 0;

        for(let i = 0; 0<array.length; i++) {
            if(array[i] === 1) {
                countO ++;
            }
            else if(array[i] === 2) {
                countX ++;
            }
        }
        if(countO === 3) {
            playerVictory = 1
        }
        else if(countX === 3) {
            playerVictory = 2
        }
        return playerVictory
    }
}
//

function checkForWin() {
    let playerVictory = 0;
    console.log("Player victory set")

    // for(let i = 0; i<winCheckers.length; i++) {
    //     let vicRoy = winCheckers[i];
    //     console.log(`Win func ${i+1} reports ${vicRoy}`)
    //     if(winCheckers[i] === 1) {
    //         playerVictory = 1;
    //     }
    //     else if(winCheckers[i] === 2) {
    //         playerVictory = 2;
    //     }
    // }
    for(let i = 0; i<winConditions; i++) {
        let test = winConditions[i]
        console.log(test)

    }
    return playerVictory;
}

function displayGameGrid(gameGrid = Array) {
    console.log(gameGrid[0], gameGrid[1], gameGrid[2])
    console.log(gameGrid[3], gameGrid[4], gameGrid[5])
    console.log(gameGrid[6], gameGrid[7], gameGrid[8])
}

function counterDecider(turnCount) {
    const isEven = num => num % 2 === 0;
    let activeCounter = 0

    if(isEven(turnCount)) {
        activeCounter = 2
    }
    else{
        activeCounter = 1
    }
    return activeCounter
}

function updateGameGrid(x, y) {
    let activeCounter = counterDecider(turnCount)
    let positionToChange = findGridPosition(x, y)

    gameGrid[positionToChange] = activeCounter;
}

function getInputX() {
    return new Promise(resolve => {
        rl.question('Enter your X coordinate: ', (answer) => {
            const input = parseInt(answer, 10);
            if (input >= 1 && input <= 3) {
                console.log(`Your chosen X coordinate is: ${input}`);
                resolve(input);
            } 
            // Emergency exit feature for testing purposes
            else if(answer == "END") {
                gameOver()
            } 
            else {
                console.log(`That is not a valid X coordinate`);
                resolve(getInputX());  // Resolve with the new promise for the retry
            }
        });
    });
}

function getInputY() {
    return new Promise(resolve => {
        rl.question('Enter your Y coordinate: ', (answer) => {
            const input = parseInt(answer, 10);
            if (input >= 1 && input <= 3) {
                console.log(`Your chosen Y coordinate is: ${input}`);
                resolve(input);
            } 
            // Emergency exit feature for testing purposes
            else if(answer == "END") {
                gameOver()
            } 
            else {
                console.log(`That is not a valid Y coordinate`);
                resolve(getInputY());  // Resolve with the new promise for the retry
            }
        });
    });
}

async function enterCoordinates() {
    let result = 0
    let x = await getInputX();
    let y = await getInputY();

    let grouped = `${x}${y}`;
    let gridPosition = findGridPosition(grouped);
    if(gameGrid[gridPosition] !== 0) {
        result = gridPosition;
    }
    else if(gameGrid[gridPosition] == 0) {
        enterCoordinates()
    }
    return result
}

async function playerInput() {
    let activePlayer = counterDecider(turnCount)

    console.log(`It is Player ${activePlayer}\'s turn`)

    let groupedCoordinates = enterCoordinates();
    return groupedCoordinates
}

function gameOver(playerVictory) {
    let gameWinner = playerVictory

    rl.close()
    isGameOver = true
    console.log(`The winner is player ${gameWinner}`)
}

async function playGame() {
    while(isGameOver === false) {   
        displayGameGrid(gameGrid);
        console.log("Game grid displayed");

        let coordinates = await playerInput();
        console.log("Input received");

        updateGameGrid(coordinates);
        console.log("Game grid updated");

        let victoryState = checkForWin();
        console.log("Win conditions checked");

        if(victoryState !== 0) {
            gameOver(victoryState);
            console.log("Game over reached");
        }
        else console.log("Game continues")

        turnCount++;
        console.log("Turn count updated");
    }
}

playGame()