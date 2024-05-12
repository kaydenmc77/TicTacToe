const readline = require('readline')
const colors = require('colors');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let turn = 1
let isGameGoing = true
const createGrid = () => { return Array(3).fill().map(() => Array(3).fill(0))};
let gameGrid = createGrid();
const turnDecider = () => {
    let player = 0;
    turn % 2 === 0 ? player = 2 : player = 1;
    return player;
}
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
        const numberInputY = parseInt(inputY, 10);
        y = numberInputY-1;
        if(y >= 0 && y <= 2) {
            rl.question('Enter your X coordinate: ', (inputX) => {
                const numberInputX = parseInt(inputX, 10);
                x = numberInputX-1;
                if(x >= 0 && x <= 2) {
                    let gridPositionValue = gameGrid[y][x];
                    if(gridPositionValue == 0) {
                        gameGrid[y][x] = player;
                        checkForWin();
                        checkForDraw();
                        console.log("");
                        turn++;
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
const checkForWin = () => {
    for(let player = 1; player<=2; player++) {
        for(const row of gameGrid) {
            if(row.every(cell => cell === player)) {
                declareWinner(player);
            }
        }
        for(let gridX = 0; gridX<gameGrid.length; gridX++) {
            if(gameGrid[0][gridX] == player && gameGrid[1][gridX] == player && gameGrid[2][gridX] == player) {
                declareWinner(player);
            }
        }
        let firstDiagonalCounters = 0;
        for (let i = 0; i<gameGrid.length; i++) {  
            if(gameGrid[i][i] == player) {
                firstDiagonalCounters++;
            }
        }
        if(firstDiagonalCounters == 3) { declareWinner(player) }
        let secondDiagonalCounters = 0;
        for (let i = 0; i<gameGrid.length; i++) {  
            if(gameGrid[i][gameGrid.length - 1 - i] == player) {
                secondDiagonalCounters++;
            }
        }
        if(secondDiagonalCounters == 3) { declareWinner(player) }
    }
}
const checkForDraw = () => {
    if(gameGrid.every(row => row.every(cell => cell !== 0))) {
        declareWinner(0);
    }
}
playGame()