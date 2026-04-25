export function renderBoard(gb) {
  const board = document.createElement("table");
  board.classList.add("board");
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("tr");
    row.classList.add(`row${i}`);
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("td");
      // set cell value here
      switch (gb.board[i][j]) {
        case 1:
          cell.textContent = "S";
          break;
        case 2:
          cell.textContent = "O";
          break;
        case 3:
          cell.textContent = "X";
          break;
        default:
          break;
      }
      cell.classList.add("cell", `col${j}`);
      row.appendChild(cell);
    }
    board.appendChild(row);
  }
  return board;
}
