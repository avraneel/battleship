import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import { Player } from "./player.js";

const playerBoard = new Gameboard();
const computerBoard = new Gameboard();

playerBoard.placeShip(0, 7, 3, false);
playerBoard.placeShip(1, 1, 2, false);
playerBoard.placeShip(2, 6, 1, true);
playerBoard.placeShip(3, 4, 2, true);
playerBoard.placeShip(3, 9, 3, true);
playerBoard.placeShip(4, 1, 1, true);
playerBoard.placeShip(7, 2, 4, false);
playerBoard.placeShip(7, 7, 1, false);
playerBoard.placeShip(9, 3, 1, false);
playerBoard.placeShip(9, 7, 2, false);
