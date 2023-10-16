import { SIDE } from "../constants.js";

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

export { createBoard, isValidCell, isEmptyCell };
