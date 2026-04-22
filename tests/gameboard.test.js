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
      expect(gb.findShip(3, 6)).toStrictEqual({
        length: 3,
        hits: 0,
        sunk: false,
      });
    });
  });

  describe("Attacking a ship", () => {
    test("If ship is attacked then update gameboard", () => {
      gb.receiveAttack(3, 6);
      expect(gb.board[3]).toStrictEqual([0, 1, 0, 0, 0, 1, 2, 1, 0, 0]);
    });

    // test("If ship is attacked then update the ship's hit count", () => {
    //   const gb = new Gameboard();
    //   gb.placeShip(3, 5, 3, false);
    //   gb.receiveAttack(3, 6);
    //   expect(gb.ships[0].obj.hits).toBe(1);
    // });
  });
});
