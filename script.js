let inputFields = [null, null, null, null, null, null, null, null, null];
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonal
];
let currentPlayer = "cross";
let setSymbol = value === "cross" ? "X" : "O"
const board = document.getElementById("board");

function initRender() {
    board.innerHTML = "";
    inputFields.forEach((value, index) => {
        let cell = createCell(index);
        cell.innerHTML = value ? setSymbol : "";
        disableIfContentInCell(value);
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

function disableIfContentInCell(value) {
    if (value) {
        cell.classList.add("taken"); // if already clicked disable
    };
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (inputFields[index]) return;
    inputFields[index] = currentPlayer;
    let nextPlayer = currentPlayer === "cross" ? "circle" : "cross";
    currentPlayer = nextPlayer;
    initRender();
    checkWinner();
}

function checkWinner() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (inputFields[a] && inputFields[a] === inputFields[b] && inputFields[a] === inputFields[c]) {
            document.getElementById("winner").innerText = `${inputFields[a] === "cross" ? "X" : "O"} gewinnt!`;
            return true;
        }
    }
    if (!inputFields.includes(null)) {
        document.getElementById("winner").innerText = "Unentschieden!";
        return true;
    }
    return false;
}

function resetGame() {
    inputFields = [null, null, null, null, null, null, null, null, null];
    currentPlayer = "cross";
    document.getElementById("winner").innerText = "";
    initRender();
}
