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

// const header = document.createElement("header");

// const gameArea = document.createElement("div");
// gameArea.classList.add("game-area");
// const playerArea = document.createElement("div");
// playerArea.classList.add("player-area");
// const computerArea = document.createElement("div");
// computerArea.classList.add("computer-area");

// const h1 = document.createElement("h1");
// h1.textContent = "Battleship";

// header.append(h1);
// gameArea.append(playerArea, computerArea);
// playerArea.append(playerBoard);

// const board = renderBoard(playerBoard);

// content.append(header, gameArea);

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

  gameArea.append(playerArea, computerArea);
  header.append(h1);

  content.append(header, gameArea);
}

createPage();
renderBoard(playerBoard);

const x = document.querySelector(".board");
//x.classList.add("non");
