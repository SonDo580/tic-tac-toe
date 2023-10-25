import type { Room } from "../types";
import { MARK, SIDE } from "../constants";

const makeMove = (room: Room, row: number, col: number, mark: MARK) => {
  room.board[row][col] = mark;
  room.moveCount++;
};

const boardFull = (moveCount: number) => moveCount === SIDE ** 2;

const winnerFound = (highlightCells: string[]) => highlightCells.length > 1;

const gameEnded = (room: Room) =>
  winnerFound(room.highlightCells) || boardFull(room.moveCount);

export { makeMove, winnerFound, gameEnded };
