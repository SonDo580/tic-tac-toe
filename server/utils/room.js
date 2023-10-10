import { v4 as uuid } from "uuid";
import { createBoard } from "./board.js";

const rooms = [];

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

const searchRoom = (roomID) => {
  const target = rooms.find((room) => room.roomId === roomID);
  return target;
};

export { rooms, createRoom, searchRoom };
