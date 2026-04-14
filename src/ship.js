export default class Ship {
  constructor(length) {
    if (length <= 0) throw new Error("Length must be positive");
    this.length = length;
    this.sunk = false;
    this.hits = 0;
  }

  hit() {
    if (!this.isSunk()) {
      this.hits++;
      return 0;
    } else {
      console.log("Ship is already sunk!");
      return 1;
    }
  }

  isSunk() {
    if (this.hits >= this.length) {
      this.sunk = true;
    }
    return this.sunk;
  }
}
