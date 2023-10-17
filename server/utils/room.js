import { v4 as uuid } from "uuid";

import { MARK } from "../constants.js";
import { createBoard } from "./board.js";

const rooms = {};

const createRoom = (firstPlayer) => ({
  roomId: uuid(),
  players: [firstPlayer],
  board: createBoard(),
  turn: MARK.X,
  highlightCells: [],
  endGame: false,
  moveCount: 0,
});

const addRoom = (room) => {
  rooms[room.roomId] = room;
};

const resetRoom = (room) => {
  room.board = createBoard();
  room.highlightCells = [];
  room.turn = MARK.X;
  room.endGame = false;
  room.moveCount = 0;
};

const searchRoomById = (roomId) => rooms[roomId];

const searchRoomByPlayer = (playerId) => {
  return Object.values(rooms).find((r) =>
    r.players.some((p) => p.playerId === playerId)
  );
};

const findPlayer = ({ room, playerId }) =>
  room.players.reduce(
    (acc, p) =>
      p.playerId === playerId
        ? { ...acc, thisPlayer: p }
        : { ...acc, otherPlayer: p },
    {}
  );

const removePlayer = ({ room, playerId }) => {
  room.players = room.players.filter((p) => p.playerId !== playerId);
};

const deleteRoom = (room) => {
  delete rooms[room.roomId];
};

export {
  createRoom,
  addRoom,
  resetRoom,
  deleteRoom,
  searchRoomById,
  searchRoomByPlayer,
  findPlayer,
  removePlayer,
};
