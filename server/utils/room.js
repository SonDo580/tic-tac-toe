import { v4 as uuid } from "uuid";

import { MARK } from "../constants.js";
import { createBoard } from "./board.js";
import { resetMoveCount } from "./game.js";

const rooms = {};

const createRoom = (firstPlayer) => {
  const roomId = uuid();
  const board = createBoard();
  const players = [firstPlayer];
  const turn = MARK.X;
  const highlightCells = [];
  const endGame = false;

  return {
    roomId,
    players,
    board,
    turn,
    highlightCells,
    endGame,
  };
};

const addRoom = (room) => {
  rooms[room.roomId] = room;
};

const resetRoom = (room) => {
  room.board = createBoard();
  room.highlightCells = [];
  room.turn = MARK.X;
  room.endGame = false;
  resetMoveCount();
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
