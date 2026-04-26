export function renderBoard(gb) {
  const board = document.createElement("table");
  board.classList.add("board");

  /**
   * handler is needed because we need to use a named function if we want
   * to remove the event listener to prevent "O" to become "X".
   * No need to worry about the `this` in definition, as the value of this in JavaScript
   * depends on how a function is invoked, not how it is defined. So, on runtime,
   * this will be the calling element (i.e) cell.
   *
   * handler is also not defined outside renderBoard because we need to use the gb parameter
   */
  const handler = function () {
    updateBoard(gb, this);
  };

  for (let i = 0; i < 10; i++) {
    const row = document.createElement("tr");
    row.classList.add(`row${i}`);

    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("td");
      cell.classList.add("cell", `col${j}`, "empty");

      cell.addEventListener("click", handler);

      // set cell value here
      switch (gb.board[i][j]) {
        case 1:
          cell.textContent = "S";
          break;
        case 2:
          cell.textContent = "O";
          cell.classList.toggle("empty");
          cell.classList.toggle("hit");
          cell.removeEventListener("click", handler);
          break;
        case 3:
          cell.textContent = "X";
          cell.classList.toggle("empty");
          cell.classList.toggle("miss");
          cell.removeEventListener("click", handler);
          break;
        default:
          break;
      }

      row.appendChild(cell);
    }
    board.appendChild(row);
  }
  return board;
}

function updateBoard(gb, cell) {
  const row = cell.parentElement.classList[0].at(-1);
  const col = cell.classList[1].at(-1);

  gb.receiveAttack(row, col);

  const newBoard = renderBoard(gb);

  const content = document.querySelector(".content");
  // remove old board
  content.removeChild(document.querySelector(".board"));
  // add new board
  content.appendChild(newBoard);
}
