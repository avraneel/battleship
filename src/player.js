import Gameboard from "./gameboard.js";

export class Player {
  constructor() {
    this.gb = new Gameboard();
    this.setPlayerBoard();
  }

  setPlayerBoard() {
    this.gb.placeShip(0, 7, 3, false);
    this.gb.placeShip(1, 1, 2, false);
    this.gb.placeShip(2, 6, 1, true);
    this.gb.placeShip(3, 4, 2, true);
    this.gb.placeShip(3, 9, 3, true);
    this.gb.placeShip(4, 1, 1, true);
    this.gb.placeShip(7, 2, 4, false);
    this.gb.placeShip(7, 7, 1, false);
    this.gb.placeShip(9, 3, 1, false);
    this.gb.placeShip(9, 7, 2, false);
  }
}

export class Computer {
  constructor() {
    this.gb = new Gameboard();
    this.setComputerBoard();
    this.pastMoves = [];
  }

  setComputerBoard() {
    this.gb.placeShip(0, 7, 2, false);
    this.gb.placeShip(0, 5, 2, true);
    this.gb.placeShip(1, 0, 1, true);
    this.gb.placeShip(3, 6, 1, true);
    this.gb.placeShip(4, 1, 3, true);
    this.gb.placeShip(4, 3, 3, true);
    this.gb.placeShip(5, 8, 2, true);
    this.gb.placeShip(6, 6, 4, true);
    this.gb.placeShip(8, 9, 1, true);
  }

  playMove() {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);

    while (this.pastMoves.some((it) => it[0] === row && it[1] === col)) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    }
    this.gb.receiveAttack(row, col);
    this.pastMoves.push([row, col]);
  }
}
