import { v4 as uuid } from "uuid";
import { createBoard } from "./board.js";

const createRoom = (firstPlayer) => {
  const roomId = uuid();
  const board = createBoard();
  const players = [firstPlayer];

  return {
    roomId,
    players,
    board,
  };
};

export { createRoom };
