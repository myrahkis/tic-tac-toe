const player1 = "✕";
const player2 = "◯";
let finished = false;

const SIZE = 3 * 3;

const cells = [];

for (let i = 0; i < SIZE; i++) {
  const divCell = document.getElementById(`${i + 1}`);
  cells.push(divCell);
}

const rows = [
  [cells[0], cells[1], cells[2]],
  [cells[3], cells[4], cells[5]],
  [cells[6], cells[7], cells[8]],
];
const colums = [
  [cells[0], cells[3], cells[6]],
  [cells[1], cells[4], cells[7]],
  [cells[2], cells[5], cells[8]],
];
const diagonals = [
  [cells[0], cells[4], cells[8]],
  [cells[2], cells[4], cells[6]],
];

const row1 = rows[0];
const row2 = rows[1];
const row3 = rows[2];

const column1 = colums[0];
const column2 = colums[1];
const column3 = colums[2];

const diagonal1 = diagonals[0];
const diagonal2 = diagonals[1];

let checkedCells = [];
let currentPlayer = player1;

const field = document.querySelector(".play-field");
const h2 = document.createElement("h2");
const btn = document.createElement("button");

field.addEventListener("click", (event) => {
  btn.style.visibility = "hidden";

  if (event.target.classList.contains("cell")) {
    const cell = event.target;
    if (!checkedCells.includes(cell)) {
      checkedCells.push(cell);
      cell.innerHTML = currentPlayer;
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
  }

  const allEqual = (arr) =>
    arr.every((v) => v.innerHTML !== "" && arr[0].innerHTML === v.innerHTML);

  function checkWin(cellGroup) {
    if (allEqual(cellGroup)) {
      if (cellGroup[0].innerHTML === player1) {
        if (cellGroup.every((cell) => cell.innerHTML === player1)) {
          h2.innerHTML = "Выиграл игрок номер 1!";
          document.body.appendChild(h2);
          finished = true;
        }
      } else if (cellGroup[0].innerHTML === player2) {
        if (cellGroup.every((cell) => cell.innerHTML === player2)) {
          h2.innerHTML = "Выиграл игрок номер 2!";
          document.body.appendChild(h2);
          finished = true;
        }
      }
    }
  }

  // row wins
  checkWin(row1);
  checkWin(row2);
  checkWin(row3);

  // columns wins
  checkWin(column1);
  checkWin(column2);
  checkWin(column3);

  // diaganal wins
  checkWin(diagonal1);
  checkWin(diagonal2);

  if (!finished && checkedCells.length === SIZE) {
    h2.innerHTML = "Ничья!";
    document.body.appendChild(h2);
    finished = true;
  }

  if (finished) {
    btn.innerHTML = "Начать заново";
    btn.style.visibility = "visible";
    document.body.appendChild(btn);
    btn.addEventListener("click", function () {
      cells.forEach((cell) => (cell.innerHTML = ""));
      currentPlayer = player1;
      checkedCells = [];
      h2.innerHTML = "";
      finished = false;
    });
  }
});
