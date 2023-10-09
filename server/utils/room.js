import { v4 as uuid } from "uuid";
import { createBoard } from "./board.js";

const createRoom = (playerId, playerName) => {
  const roomId = uuid();
  const board = createBoard();
  const players = [{ playerId, playerName }];

  return {
    roomId,
    players,
    board,
  };
};

export { createRoom };
