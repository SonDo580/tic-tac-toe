import type { Board } from "../types";
import { SIDE } from "../constants";

const createBoard = (): Board => {
  const board = [];
  for (let i = 0; i < SIDE; i++) {
    const row = Array(SIDE).fill("");
    board.push(row);
  }
  return board;
};

const isValidCell = (row: number, col: number) =>
  row >= 0 && row < SIDE && col >= 0 && col < SIDE;

const isEmptyCell = (board: Board, row: number, col: number) =>
  board[row][col] === "";

export { createBoard, isValidCell, isEmptyCell };
