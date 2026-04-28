import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import Player from "./player.js";

const player = new Player("player");
const computer = new Player("computer");

randomize(player.gb);

randomize(computer.gb);

function playComputerChoice() {
  let row = Math.floor(Math.random() * 10);
  let col = Math.floor(Math.random() * 10);

  while (player.gb.board[row][col] === 2 || player.gb.board[row][col] === 3) {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
  }
  return player.gb.receiveAttack(row, col);
}

function playRound(row, col) {
  const isPlayerHit = computer.gb.receiveAttack(row, col);
  renderComputerBoard(computer.gb);
  if (computer.gb.isAllSunk()) {
    // player wins
    alert("Player wins!");
    return 1;
  }
  // only if player misses, does the computer get allowed to play
  // if player hits, get out of function and wait for next input from player
  if (isPlayerHit === false) {
    // set timeout to simulate that computer is thinking
    setTimeout(() => {
      let isComputerHit = playComputerChoice();
      renderPlayerBoard(player.gb);
      if (player.gb.isAllSunk()) {
        alert("Computer wins!");
        return 2;
        // computer wins
      }
      // putting set timeout here for the next consecutive moves, it works..somehow?
      setTimeout(() => {
        while (isComputerHit) {
          // dont give set timeout after while because isComputerHit will always be true forever
          // so call stack will never be empty as its filled with while(isComputerHit) condition
          // so the callback inside setTimeout() code in callback queue can't be executed
          isComputerHit = playComputerChoice();
          renderPlayerBoard(player.gb);
          if (player.gb.isAllSunk()) {
            alert("Computer wins!");
            return 2;
            // computer wins
          }
        }
      }, 300);
    }, 300);
  }
  return 0;
}

function renderPlayerBoard(gb) {
  const board = document.createElement("table");
  board.classList.add("player-board");
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("tr");
    row.classList.add(`row${i}`);
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("td");
      cell.classList.add("cell");
      if (gb.board[i][j] === 0) {
        // empty cell
        cell.classList.add("empty");
      } else if (gb.board[i][j] === 1) {
        // cell with ship is shown here
        cell.textContent = "S";
        cell.classList.add("ship");
      } else if (gb.board[i][j] === 2) {
        // cell with ship is hit
        cell.textContent = "H";
        cell.classList.add("hit");
      } else {
        // cell with ship is missed
        cell.classList.add("miss");
      }
      row.appendChild(cell);
    }
    board.appendChild(row);
  }
  const boardPlaceholder = document.querySelector(
    ".computer-board-placeholder",
  );
  boardPlaceholder.replaceChildren();
  boardPlaceholder.appendChild(board);
}

function renderComputerBoard(gb) {
  const board = document.createElement("table");
  board.classList.add("computer-board");

  const handler = function (e) {
    const row = parseInt(this.parentElement.classList[0].at(-1));
    const col = parseInt(this.classList[1].at(-1));
    const roundVal = playRound(row, col);
    if (roundVal) lockBoards();
  };
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("tr");
    row.classList.add(`row${i}`);
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("td");
      cell.classList.add("cell", `col${j}`);
      if (gb.board[i][j] === 0 || gb.board[i][j] === 1) {
        // empty cell
        cell.classList.add("empty");
      } else if (gb.board[i][j] === 2) {
        // cell with ship is hit
        cell.textContent = "H";
        cell.classList.add("hit");
      } else {
        // cell with ship is missed
        cell.classList.add("miss");
      }
      cell.addEventListener("click", handler);
      row.appendChild(cell);
    }
    board.appendChild(row);
  }
  const boardPlaceholder = document.querySelector(".player-board-placeholder");
  boardPlaceholder.replaceChildren();
  boardPlaceholder.appendChild(board);
}

function lockBoards() {
  const pb = document.querySelector(".player-board");
  const cb = document.querySelector(".computer-board");
  pb.classList.add("lock");
  cb.classList.add("lock");
}

function randomize(gb) {
  /**
   * 1 ship of length 4
   * 2 ships of length 3
   * 3 ships of length 2
   * 4 ships of length 1
   */

  let done = false;
  while (!done) {
    try {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      const vertical = Math.floor(Math.random() * 2) ? true : false;
      gb.placeShip(row, col, 4, vertical);
      done = true;
    } catch (error) {}
  }
  // length 4 ship done, doing length 3 ship
  for (let i = 1; i <= 2; i++) {
    done = false;
    while (!done) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      const vertical = Math.floor(Math.random() * 2) ? true : false;
      try {
        gb.placeShip(row, col, 3, vertical);
        done = true;
      } catch (error) {}
    }
  }
  // length 3 ship done, doing length 2 ship
  for (let i = 1; i <= 3; i++) {
    done = false;
    while (!done) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      const vertical = Math.floor(Math.random() * 2) ? true : false;
      try {
        gb.placeShip(row, col, 2, vertical);
        done = true;
      } catch (error) {}
    }
  }
  // length 2 ship done, doing length 1 ship
  for (let i = 1; i <= 4; i++) {
    done = false;
    while (!done) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      const vertical = Math.floor(Math.random() * 2) ? true : false;
      try {
        gb.placeShip(row, col, 1, vertical);
        done = true;
      } catch (error) {}
    }
  }
}

export default function init() {
  renderComputerBoard(computer.gb);
  renderPlayerBoard(player.gb);
}

randomize(computer.gb);
