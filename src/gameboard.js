import Ship from "./ship.js";

export default class Gameboard {
  constructor() {
    this.resetBoard();
    this.misses = 0;
    this.allSunk = false;
  }

  resetBoard() {
    this.board = Array(10);
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = Array(10).fill(0);
    }
  }

  placeShip(x, y, length, vertical) {
    const ship = new Ship(length);
    this.board[x][y] = 1;
    if ((vertical && y + length >= 10) || (!vertical && x + length >= 10)) {
      throw new Error("Ship length is out of bounds");
    }
    if (vertical) {
      for (let i = 1; i < length; i++) {
        this.board[++x][y] = 1;
      }
    } else {
      for (let i = 1; i < length; i++) {
        this.board[x][y] = 1;
      }
    }
  }
}

const gb = new Gameboard();
gb.placeShip(2, 1, 9, true);
