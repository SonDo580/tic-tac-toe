import { produce } from "immer";
import { SIDE } from "@/constants";

const createBoard = () => {
  const board = [];
  for (let i = 0; i < SIDE; i++) {
    const row = Array(SIDE).fill("");
    board.push(row);
  }
  return board;
};

const getUpdatedBoard = (board, rowIndex, colIndex, mark) =>
  produce(board, (draft) => {
    draft[rowIndex][colIndex] = mark;
  });

export { createBoard, getUpdatedBoard };
