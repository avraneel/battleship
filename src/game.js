import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import Player from "./player.js";

const player = new Player("player");
const computer = new Player("computer");

player.gb.placeShip(0, 7, 3, false);
player.gb.placeShip(1, 1, 2, false);
player.gb.placeShip(2, 6, 1, true);
player.gb.placeShip(3, 4, 2, true);
player.gb.placeShip(3, 9, 3, true);
player.gb.placeShip(4, 1, 1, true);
player.gb.placeShip(7, 2, 4, false);
player.gb.placeShip(7, 7, 1, false);
player.gb.placeShip(9, 3, 1, false);
player.gb.placeShip(9, 7, 2, false);

computer.gb.placeShip(0, 7, 2, false);
computer.gb.placeShip(0, 5, 2, true);
computer.gb.placeShip(1, 0, 1, true);
computer.gb.placeShip(3, 6, 1, true);
computer.gb.placeShip(4, 1, 3, true);
computer.gb.placeShip(4, 3, 3, true);
computer.gb.placeShip(5, 8, 2, true);
computer.gb.placeShip(6, 6, 4, true);
computer.gb.placeShip(8, 9, 1, true);

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
    // set timeout to simulate computer is thinking
    setTimeout(() => {
      let isComputerHit = playComputerChoice();
      renderPlayerBoard(player.gb);
      if (player.gb.isAllSunk()) {
        alert("Computer wins!");
        return 2;
        // computer wins
      }
      setTimeout(() => {
        while (isComputerHit) {
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

export default function init() {
  renderComputerBoard(computer.gb);
  renderPlayerBoard(player.gb);
}
