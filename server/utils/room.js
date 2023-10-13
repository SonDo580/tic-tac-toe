import { v4 as uuid } from "uuid";
import { createBoard } from "./board.js";

const rooms = [];

const createRoom = (firstPlayer) => {
  const roomId = uuid();
  const board = createBoard();
  const players = [firstPlayer];
  const turn = MARK.X;
  const endGame = false;

  return {
    roomId,
    players,
    board,
    turn,
    endGame,
  };
};

const searchRoom = (roomId) => {
  const roomIndex = rooms.findIndex((r) => r.roomId === roomId);
  const room = roomIndex !== -1 ? rooms[roomIndex] : undefined;
  return { room, roomIndex };
};

const searchRoomByPlayer = (playerId) => {
  const roomIndex = rooms.findIndex((r) =>
    r.players.some((p) => p.playerId === playerId)
  );
  const room = roomIndex !== -1 ? rooms[roomIndex] : undefined;
  return { room, roomIndex };
};

export { rooms, createRoom, searchRoom, searchRoomByPlayer };
