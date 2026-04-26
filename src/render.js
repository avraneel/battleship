export function renderBoard(gb, computer) {
  const board = document.createElement("table");
  if (computer) {
    board.classList.add("board", "computer-board");
  } else {
    board.classList.add("board", "player-board");
  }

  /**
   * handler is needed because we need to use a named function if we want
   * to remove the event listener to prevent "O" to become "X".
   * No need to worry about the `this` in definition, as the value of this in JavaScript
   * depends on how a function is invoked, not how it is defined. So, on runtime,
   * this will be the calling element (i.eg) cell.
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
          if (!computer) {
            cell.textContent = "S";
          }
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

  if (computer) {
    const boardPlaceholder = document.querySelector(
      ".player-board-placeholder",
    );
    boardPlaceholder.appendChild(board);
  } else {
    const boardPlaceholder = document.querySelector(
      ".computer-board-placeholder",
    );
    boardPlaceholder.appendChild(board);
  }
}

function updateBoard(gb, cell) {
  const row = cell.parentElement.classList[0].at(-1);
  const col = cell.classList[1].at(-1);

  const whichBoard = cell.parentElement.parentElement.classList[1];
  const computer = whichBoard === "computer-board" ? true : false;
  gb.receiveAttack(row, col);

  if (computer) {
    const boardPlaceholder = document.querySelector(
      ".player-board-placeholder",
    );
    boardPlaceholder.removeChild(document.querySelector(".computer-board"));
  } else {
    const boardPlaceholder = document.querySelector(
      ".computer-board-placeholder",
    );
    boardPlaceholder.removeChild(document.querySelector(".player-board"));
  }
  // add new board
  renderBoard(gb, computer);
}
