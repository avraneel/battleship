import Ship from "./ship.js";

const cell = {
  empty: 0,
  ship: 1,
  shot: 2,
  miss: 3,
};

export default class Gameboard {
  constructor() {
    this.resetBoard();
    this.misses = 0;
    this.allSunk = false;
  }

  resetBoard() {
    this.board = Array(10);
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = Array(10).fill(cell.empty);
    }
  }

  placeShip(row, col, length, vertical) {
    const ship = new Ship(length);
    this.board[row][col] = cell.ship;
    if ((vertical && row + length >= 10) || (!vertical && col + length >= 10)) {
      throw new Error("Ship length is out of bounds");
    }
    if (vertical) {
      for (let i = 1; i < length; i++) {
        this.board[++row][col] = cell.ship;
      }
    } else {
      for (let i = 1; i < length; i++) {
        this.board[row][++col] = cell.ship;
      }
    }
  }

  receiveAttack(x, y) {
    if (this.board[x][y] == cell.ship) {
      // ship is hit
      this.board[x][y] = cell.shot;
    } else {
      this.board[x][y] = cell.miss;
    }
  }
}
