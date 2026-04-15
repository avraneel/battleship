import Gameboard from "../src/gameboard";

describe("Ship Placement", () => {
  test("Placing a horizontal ship with length in bounds", () => {
    const gb = new Gameboard();
    gb.placeShip(3, 5, 3, false);
    expect(gb.board[3]).toStrictEqual([0, 0, 0, 0, 0, 1, 1, 1, 0, 0]);
  });

  test("Placing a vertical ship with length in bounds", () => {
    const gb = new Gameboard();
    gb.placeShip(2, 1, 6, true);
    expect(gb.board.slice(2, 8).map((x) => x[1])).toStrictEqual([
      1, 1, 1, 1, 1, 1,
    ]);
  });

  test("Placing a horizontal ship with length out of bounds", () => {
    const gb = new Gameboard();
    expect(() => gb.placeShip(3, 5, 7, false)).toThrow();
  });

  test("Placing a vertical ship with length out of bounds", () => {
    const gb = new Gameboard();
    expect(() => gb.placeShip(2, 1, 9, true)).toThrow();
  });
});
