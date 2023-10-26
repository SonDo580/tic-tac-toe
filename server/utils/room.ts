import { v4 as uuid } from "uuid";

import type { Player, Room } from "../types";
import { MARK } from "../constants";
import { createBoard } from "./board";

type Rooms = {
  [index: string]: Room;
};

const rooms: Rooms = {};

const createRoom = (firstPlayer: Player): Room => ({
  roomId: uuid(),
  players: [firstPlayer],
  board: createBoard(),
  turn: MARK.X,
  highlightCells: [],
  endGame: false,
  resetPending: false,
  moveCount: 0,
});

const addRoom = (room: Room) => {
  rooms[room.roomId] = room;
};

const resetRoom = (room: Room) => {
  room.board = createBoard();
  room.highlightCells = [];
  room.turn = MARK.X;
  room.endGame = false;
  room.moveCount = 0;
};

const searchRoomById = (roomId: string) => rooms[roomId];

const searchRoomByPlayer = (playerId: string) => {
  return Object.values(rooms).find((r) =>
    r.players.some((p) => p.playerId === playerId)
  );
};

type FindPlayerReturnType = {
  thisPlayer?: Player;
  otherPlayer?: Player;
};

const findPlayer = (room: Room, playerId: string): FindPlayerReturnType =>
  room.players.reduce(
    (acc, p) =>
      p.playerId === playerId
        ? { ...acc, thisPlayer: p }
        : { ...acc, otherPlayer: p },
    {}
  );

const removePlayer = (room: Room, playerId: string) => {
  room.players = room.players.filter((p) => p.playerId !== playerId);
};

const deleteRoom = (room: Room) => {
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
