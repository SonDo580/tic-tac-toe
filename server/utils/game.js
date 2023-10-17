import { SIDE } from "../constants.js";

const makeMove = ({ room, row, col, mark }) => {
  room.board[row][col] = mark;
  room.moveCount++;
};

const boardFull = (moveCount) => moveCount === SIDE ** 2;

const winnerFound = (highlightCells) => highlightCells.length > 1;

const gameEnded = (room) =>
  winnerFound(room.highlightCells) || boardFull(room.moveCount);

export { makeMove, winnerFound, gameEnded };
