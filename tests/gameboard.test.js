import Gameboard from "../src/gameboard.js";
import Ship from "../src/ship.js";

describe("Gameboard", () => {
  const gb = new Gameboard();
  describe("Ship Placement", () => {
    test("Placing a horizontal ship with length in bounds", () => {
      gb.placeShip(3, 5, 3, false);
      expect(gb.board[3]).toStrictEqual([0, 0, 0, 0, 0, 1, 1, 1, 0, 0]);
    });

    test("Placing a vertical ship with length in bounds", () => {
      gb.placeShip(2, 1, 6, true);
      expect(gb.board.slice(2, 8).map((x) => x[1])).toStrictEqual([
        1, 1, 1, 1, 1, 1,
      ]);
    });

    test("place a ship whose starting position is occupied", () => {
      expect(() => gb.placeShip(3, 5, 2, true)).toThrow();
    });

    test("place a ship whose non-starting position is occupied", () => {
      expect(() => gb.placeShip(3, 6, 2, true)).toThrow();
    });

    test("Placing a horizontal ship with length out of bounds", () => {
      expect(() => gb.placeShip(3, 5, 7, false)).toThrow();
    });

    test("Placing a vertical ship with length out of bounds", () => {
      expect(() => gb.placeShip(2, 1, 9, true)).toThrow();
    });

    test("If ship is placed then the ship object should be traced in the board", () => {
      gb.placeShip(0, 8, 3, true);
      expect(gb.ships[2].obj).toStrictEqual(new Ship(3));
      expect(gb.ships[2].coords).toStrictEqual([
        [0, 8],
        [1, 8],
        [2, 8],
      ]);
    });
  });

  describe("Finding a ship", () => {
    test("Throw error if ship not found", () => {
      expect(() => gb.findShip(4, 5)).toThrow();
    });

    test("Return ship if ship is found", () => {
      expect(gb.findShip(3, 6)).toEqual({
        length: 3,
        hits: 0,
        sunk: false,
      });
      expect(gb.findShip(3, 6)).toBeInstanceOf(Ship);
    });
  });

  describe("Attacking a ship", () => {
    test("If ship is attacked then update gameboard", () => {
      gb.receiveAttack(3, 6);
      expect(gb.board[3]).toStrictEqual([0, 1, 0, 0, 0, 1, 2, 1, 0, 0]);
    });

    test("If ship is attacked then update the ship's hit count", () => {
      gb.receiveAttack(3, 7);
      expect(gb.findShip(3, 5).hits).toBe(2);
    });
  });

  describe("If all is sunk", () => {
    test("return false if all is not sunk", () => {
      expect(gb.isAllSunk()).toBe(false);
    });
    test("return true if all is sunk", () => {
      gb.receiveAttack(3, 5);
      gb.receiveAttack(2, 1);
      gb.receiveAttack(3, 1);
      gb.receiveAttack(4, 1);
      gb.receiveAttack(5, 1);
      gb.receiveAttack(6, 1);
      gb.receiveAttack(7, 1);
      gb.receiveAttack(0, 8);
      gb.receiveAttack(1, 8);
      gb.receiveAttack(2, 8);
      expect(gb.isAllSunk()).toBe(true);
    });
  });
});
