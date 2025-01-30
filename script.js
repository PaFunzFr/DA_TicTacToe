let inputFields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "cross";
const board = document.getElementById("board");
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonal
];

function initRender() {
    board.innerHTML = "";
    inputFields.forEach((value, index) => {
        let cell = createCell(index);
        let setSymbol = value === "cross" ? "X" : "O";
        cell.innerHTML = value ? setSymbol : "";
        disableIfContentInCell(cell, value);
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    });
}

function createCell(index) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    return cell;
}

function disableIfContentInCell(cell, value) {
    if (value) {
        cell.classList.add("taken");
    };
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (inputFields[index]) return;
    inputFields[index] = currentPlayer;
    let nextPlayer = currentPlayer === "cross" ? "circle" : "cross";
    currentPlayer = nextPlayer;
    initRender();
    checkForEnd();
}

function checkForEnd() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (inputFields[a] && inputFields[a] === inputFields[b] && inputFields[a] === inputFields[c]) {
            document.getElementById("winner").innerText = `${inputFields[a] === "cross" ? "X" : "O"} gewinnt!`;
            disableAllCells();
        }
    }
    if (!inputFields.includes(null)) {
        document.getElementById("winner").innerText = "Unentschieden!";
    }
}

function disableAllCells() {
    let allCells = document.querySelectorAll(".cell");
    allCells.forEach((cell) => {
        cell.classList.add("taken");
        cell.removeEventListener("click", handleClick);
    });
}

function resetGame() {
    inputFields = [null, null, null, null, null, null, null, null, null];
    currentPlayer = "cross";
    document.getElementById("winner").innerText = "";
    initRender();
}
