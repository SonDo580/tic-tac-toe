import { v4 as uuid } from "uuid";

import { createBoard } from "./board.js";
import { MARK } from "../constants.js";

const rooms = {};

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

const addRoom = (room) => {
  rooms[room.roomId] = room;
};

const searchRoomById = (roomId) => rooms[roomId];

const searchRoomByPlayer = (playerId) => {
  return Object.values(rooms).find((r) =>
    r.players.some((p) => p.playerId === playerId)
  );
};

const removePlayer = ({ room, playerId }) => {
  room.players = room.players.filter((p) => p.playerId !== playerId);
};

const deleteRoom = (room) => {
  delete rooms[room.roomId];
  console.log(rooms);
};

export {
  createRoom,
  addRoom,
  searchRoomById,
  searchRoomByPlayer,
  removePlayer,
  deleteRoom,
};
