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
    renderCurrentPlayer();
    renderAllCells();
}

function renderAllCells() {
    inputFields.forEach((value, index) => {
        let cell = createCell(index);
        let setSymbol = value === "cross" ? "X" : "O";
        cell.innerHTML = value ? setSymbol : "";
        disableAndColorClickedCell(cell, value);
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    });
}

function renderCurrentPlayer() {
    document.getElementById("current-player").innerText = `Spieler ${currentPlayer === "cross" ? "X" : "O"} ist dran`;
}

function createCell(index) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    return cell;
}

function disableAndColorClickedCell(cell, value) {
    if (value && value === "cross") {
        cell.classList.add("taken");
        cell.style.backgroundColor ="rgb(101, 160, 180)";
    }
    if (value && value === "circle") {
        cell.classList.add("taken");
        cell.style.backgroundColor ="rgb(235, 165, 105)";
    }
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
            document.getElementById("current-player").innerText = `Spiel vorbei!`;
            highlightWinningPattern([a, b, c]);
            disableAllCells();
        }
    }
    if (!inputFields.includes(null)) {
        document.getElementById("winner").innerText = "Unentschieden!";
    }
}

function highlightWinningPattern(pattern) {
    pattern.forEach((index) => {
        let cell = document.querySelector(`[data-index='${index}']`);
        cell.style.backgroundColor = "lime";
        cell.style.border = "3px solid rgb(105, 176, 105)";
    });
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
