import Gameboard from "../src/gameboard";
import Ship from "../src/ship";

test("Calling hit() increases the number of hits in a ship", () => {
  const ship1 = new Ship(3);
  ship1.hit();
  ship1.hit();
  expect(ship1.hits).toBe(2);
});

test("Hit equals length means ship is sunk", () => {
  const ship1 = new Ship(3);
  ship1.hit();
  ship1.hit();
  ship1.hit();
  expect(ship1.isSunk()).toBe(true);
});

test("isSunk() actually updates property", () => {
  const ship1 = new Ship(3);
  ship1.hit();
  ship1.hit();
  ship1.hit();
  ship1.isSunk();
  expect(ship1.sunk).toBe(true);
});

test("Ship isn't sunk if hits are less", () => {
  const ship1 = new Ship(3);
  ship1.hit();
  expect(ship1.isSunk()).toBe(false);
});

test("Ship cannot be hit if it is sunk", () => {
  const ship1 = new Ship(2);
  ship1.hit();
  ship1.hit();
  expect(ship1.hit()).toBe(1);
});
