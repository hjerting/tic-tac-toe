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
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function cellClicked(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;
    console.log(`cell: ${clickedCellIndex}`);
    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        console.log("No change! Already clicked this cell!");
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

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.addEventListener('click', cellClicked, false);
});