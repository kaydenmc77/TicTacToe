//NOTE - Make a TicTacToe game for 2 players that will be represented with a 2D grid.
//TODO - Make an internal game grid
//TODO -  Find a way to display the game grid
//TODO - Detect whether or not there are 3 of the same counters in a row
//TODO - Display the correct winner
//TODO - Allow player input

//SECTION Variables
const emptyCell = 0
const nought = 1
const cross = 2

var turnCount = 0

var isGameOver = false

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
    displayGameGrid(gameGrid)
}

function gridAssessmentCheck(gameGrid = Array) {

}

//SECTION - Hard coded win checks

function checkRow1() {
    let array = []
    array.push(gameGrid[0])
    array.push(gameGrid[1])
    array.push(gameGrid[2])

    let activeCounter = counterDecider(turnCount)
    let playerVictory = 0

    if(array == [activeCounter, activeCounter, activeCounter]) {
        playerVictory = 1
    }
    return playerVictory
}
function checkRow2() {
    let array = []
    array.push(gameGrid[3])
    array.push(gameGrid[4])
    array.push(gameGrid[5])

    let activeCounter = counterDecider(turnCount)
    let playerVictory = 0

    if(array == [activeCounter, activeCounter, activeCounter]) {
        playerVictory = 1
    }
    return playerVictory
}
function checkRow3() {
    let array = []
    array.push(gameGrid[6])
    array.push(gameGrid[7])
    array.push(gameGrid[8])

    let activeCounter = counterDecider(turnCount)
    let playerVictory = 0

    if(array == [activeCounter, activeCounter, activeCounter]) {
        playerVictory = 1
    }
    return playerVictory
}
function checkColumn1() {
    let array = []
    array.push(gameGrid[0])
    array.push(gameGrid[3])
    array.push(gameGrid[6])

    let activeCounter = counterDecider(turnCount)
    let playerVictory = 0

    if(array == [activeCounter, activeCounter, activeCounter]) {
        playerVictory = 1
    }
    return playerVictory
}
function checkColumn2() {
    let array = []
    array.push(gameGrid[1])
    array.push(gameGrid[4])
    array.push(gameGrid[7])

    let activeCounter = counterDecider(turnCount)
    let playerVictory = 0

    if(array == [activeCounter, activeCounter, activeCounter]) {
        playerVictory = 1
    }
    return playerVictory
}
function checkColumn3() {
    let array = []
    array.push(gameGrid[2])
    array.push(gameGrid[5])
    array.push(gameGrid[8])

    let activeCounter = counterDecider(turnCount)
    let playerVictory = 0

    if(array == [activeCounter, activeCounter, activeCounter]) {
        playerVictory = 1
    }
    return playerVictory
}
function checkDiagonalTopLeft() {
    let array = []
    array.push(gameGrid[0])
    array.push(gameGrid[4])
    array.push(gameGrid[8])

    let activeCounter = counterDecider(turnCount)
    let playerVictory = 0

    if(array == [activeCounter, activeCounter, activeCounter]) {
        playerVictory = 1
    }
    return playerVictory
}
function checkDiagonalTopRight() {
    let array = []
    array.push(gameGrid[2])
    array.push(gameGrid[4])
    array.push(gameGrid[6])

    let activeCounter = counterDecider(turnCount)
    let playerVictory = 0

    if(array == [activeCounter, activeCounter, activeCounter]) {
        playerVictory = 1
    }
    return playerVictory
}

//

function checkForWin() {
    let winCheckers = []
    
    winCheckers.push(checkRow1())
    winCheckers.push(checkRow2())
    winCheckers.push(checkRow3())
    winCheckers.push(checkColumn1())
    winCheckers.push(checkColumn2())
    winCheckers.push(checkColumn3())
    winCheckers.push(checkDiagonalTopLeft())
    winCheckers.push(checkDiagonalTopRight())

    for(let i = 0; i<winCheckers.length; i++) {
        if(winCheckers[i] == 1) {
            gameOver()
        }
    }
}

function playerInput() {

}

function gameOver() {
    let gameWinner = counterDecider(turnCount)

    isGameOver = true
    console.log(`The winner is player ${gameWinner}`)
}

function playGame() {
    displayGameGrid(gameGrid)
    playerInput()
    checkForWin()
    turnCount++
}

function main() {
    while(isGameOver = false) {
        playGame()
    }
}

displayGameGrid(gameGrid)