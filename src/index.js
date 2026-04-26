import "./style.css";
import Ship from "./ship.js";
import { Player } from "./player.js";
import { renderBoard } from "./render.js";
import Gameboard from "./gameboard.js";

const content = document.querySelector(".content");

export const playerBoard = new Gameboard();
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

computerBoard.placeShip(0, 7, 2, false);
computerBoard.placeShip(0, 5, 2, true);
computerBoard.placeShip(1, 0, 1, true);
computerBoard.placeShip(3, 6, 1, true);
computerBoard.placeShip(4, 1, 3, true);
computerBoard.placeShip(4, 3, 3, true);
computerBoard.placeShip(5, 8, 2, true);
computerBoard.placeShip(6, 6, 4, true);
computerBoard.placeShip(8, 9, 1, true);

function createPage() {
  const content = document.querySelector(".content");

  // Create Elements
  const header = document.createElement("header");
  const h1 = document.createElement("h1");
  h1.textContent = "Battleship";

  header.append(h1);

  // Elements in main game area
  const gameArea = document.createElement("div");
  gameArea.classList.add("game-area");
  const playerArea = document.createElement("div");
  playerArea.classList.add("player-area");
  const h2Player = document.createElement("h2");
  h2Player.textContent = "Player";
  const playerBoardPlaceholder = document.createElement("div");
  playerBoardPlaceholder.classList.add("player-board-placeholder");
  const computerArea = document.createElement("div");
  computerArea.classList.add("computer-area");
  const h2Computer = document.createElement("h2");
  h2Computer.textContent = "Computer";
  const computerBoardPlaceholder = document.createElement("div");
  computerBoardPlaceholder.classList.add("computer-board-placeholder");

  playerArea.append(h2Player, playerBoardPlaceholder);
  computerArea.append(h2Computer, computerBoardPlaceholder);

  gameArea.append(computerArea, playerArea);
  header.append(h1);

  content.append(header, gameArea);
}

createPage();
let playerTurn = true;

renderBoard(playerBoard, true, true);
renderBoard(computerBoard, false, true);

const x = document.querySelector(".board");
//x.classList.add("non");
