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

  placeShip(row, col) {}
}
