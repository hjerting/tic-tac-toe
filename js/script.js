let currentPlayer = 'X'; // Player X always starts
const gameBoard = [
    '', '', '',
    '', '', '',
    '', '', ''
]
const winningConditions = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // left to right diagonal
    [2, 4, 6] // right to left diagonal

]
let gameActive = true;
let clickCount = 0;

function handlePlayerTurn(clickedCellIndex) {
    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    gameBoard[clickedCellIndex] = currentPlayer;
    checkForWinOrDraw();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function cellClicked(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;
    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handlePlayerTurn(clickedCellIndex);
    updateUI();
}

function updateUI() {
    for (let i = 0; i < cells.length; ++i) {
        cells[i].innerText = gameBoard[i];
    }
}

function checkForWinOrDraw() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; ++i) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] && gameBoard[b] && gameBoard[c] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        announceWinner(currentPlayer);
        gameActive = false;
        return;
    }

    let roundDraw = !gameBoard.includes('');
    if (roundDraw) {
        announceDraw();
        gameActive = false;
        return;
    }
}

function announceWinner(player) {
    const messageElement = document.getElementById("gameMessage");
    messageElement.innerText = `Player ${player} Wins!`;
}

function announceDraw() {
    const messageElement = document.getElementById("gameMessage");
    messageElement.innerText = `Game Draw!`;
}

function resetGame() {
    for (let i = 0; i < gameBoard.length; ++i) {
        gameBoard[i] = '';
    } // Clear the game board
    gameActive = true; // Set the game to active
    currentPlayer = 'X'; // Reset to player X
    cells.forEach(cell => {
        cell.innerText = '';
    }); // Clears all cells
    document.getElementById('gameMessage').innerText = ''; // Remove game win or draw message
}

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.addEventListener('click', cellClicked, false);
});
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame, false);