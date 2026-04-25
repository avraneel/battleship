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
    this.ships = [];
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
    const item = { obj: ship, coords: [[row, col]] };
    if (this.board[row][col] !== cell.empty) {
      throw new Error("Starting position is not empty");
    }
    this.board[row][col] = cell.ship;
    if ((vertical && row + length > 10) || (!vertical && col + length > 10)) {
      throw new Error("Ship length is out of bounds");
    }
    if (vertical) {
      for (let i = 1; i < length; i++) {
        row++;
        if (this.board[row][col] !== cell.empty) {
          throw new Error("Overlapping with another ship");
        }
        this.board[row][col] = cell.ship;
        item.coords.push([row, col]);
      }
    } else {
      for (let i = 1; i < length; i++) {
        col++;
        if (this.board[row][col] !== cell.empty) {
          throw new Error("Overlapping with another ship");
        }
        this.board[row][col] = cell.ship;
        item.coords.push([row, col]);
      }
    }
    this.ships.push(item);
  }

  findShip(row, col) {
    for (let i = 0; i < this.ships.length; i++) {
      let arr = this.ships[i].coords;
      if (arr.some((item) => item[0] === row && item[1] === col)) {
        return this.ships[i].obj;
      }
    }
    throw new Error("Ship not found!");
  }

  receiveAttack(row, col) {
    if (this.board[row][col] == cell.ship) {
      // ship is hit
      this.board[row][col] = cell.shot;
      try {
        const ship = this.findShip(row, col);
        ship.hit();
      } catch (error) {
        console.log(error);
      }
    } else {
      this.board[row][col] = cell.miss;
    }
  }

  isAllSunk() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j] == cell.ship) {
          return false;
        }
      }
    }
    return true;
  }
}

const gb = new Gameboard();
gb.placeShip(3, 5, 3, true);
