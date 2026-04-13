export default class Ship {
  constructor(length) {
    if (length <= 0) throw new Error("Length must be positive");
    this.length = length;
    this.sunk = false;
    this.hits = 0;
  }

  hit() {
    this.hits++;
    return this.hits;
  }

  isSunk() {
    if (this.hits === this.length) {
      this.sunk = false;
    }
    return this.sunk;
  }
}
