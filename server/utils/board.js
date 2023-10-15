import { SIDE } from "../constants.js";

let moveCount = 0;

const createBoard = () => {
  const board = [];
  for (let i = 0; i < SIDE; i++) {
    const row = Array(SIDE).fill("");
    board.push(row);
  }
  return board;
};

const isValidCell = ({ row, col }) =>
  row >= 0 && row < SIDE && col >= 0 && col < SIDE;

const isEmptyCell = ({ board, row, col }) => board[row][col] === "";

const makeMove = ({ board, row, col, mark }) => {
  board[row][col] = mark;
  moveCount++;
};

const boardFull = () => moveCount === SIDE ** 2;

const winnerFound = (highlightCells) => highlightCells.length > 1;

const gameEnded = (room) => winnerFound(room.highlightCells) || boardFull();

export { createBoard, isValidCell, isEmptyCell, makeMove, gameEnded };
