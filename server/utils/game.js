import { SIDE } from "../constants";

let moveCount = 0;
const resetMoveCount = () => {
  moveCount = 0;
};
const incrementMoveCount = () => {
  moveCount++;
};

const makeMove = ({ board, row, col, mark }) => {
  board[row][col] = mark;
  incrementMoveCount();
};

const boardFull = () => moveCount === SIDE ** 2;
const winnerFound = (highlightCells) => highlightCells.length > 1;
const gameEnded = (room) => winnerFound(room.highlightCells) || boardFull();

export { makeMove, gameEnded, resetMoveCount };
