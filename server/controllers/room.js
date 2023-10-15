import { MARK } from "../constants.js";
import { createBoard } from "../utils/board.js";
import { resetMark } from "../utils/mark.js";
import {
  addRoom,
  createRoom,
  deleteRoom,
  removePlayer,
  searchRoomById,
  searchRoomByPlayer,
} from "../utils/room.js";

const createRoomHandler = (socket) => (playerName) => {
  if (playerName.trim() === "") {
    socket.emit("nameError");
    return;
  }

  const firstPlayer = { playerId: socket.id, playerName, mark: MARK.X };
  const room = createRoom(firstPlayer);
  addRoom(room);
  socket.emit("roomCreated", room);
};

const joinRoomHandler =
  ({ socket, io }) =>
  ({ playerName, roomID }) => {
    if (playerName.trim() === "") {
      socket.emit("nameError");
      return;
    }

    if (roomID === "") {
      socket.emit("roomIdEmpty");
      return;
    }

    const room = searchRoomById(roomID);
    if (!room) {
      socket.emit("roomNotExists");
      return;
    }

    if (room.players.length === 2) {
      socket.emit("roomFull");
      return;
    }

    const secondPlayer = { playerId: socket.id, playerName, mark: MARK.O };
    room.players.push(secondPlayer);
    socket.emit("roomJoined", room);

    const firstPlayerId = room.players[0].playerId;
    io.to(firstPlayerId).emit("roomJoined", room);
  };

const leaveRoomHandler =
  ({ socket, io }) =>
  (roomId) => {
    const playerId = socket.id;
    const room = searchRoomById(roomId);
    if (!room) {
      return;
    }

    // Remove player from room
    removePlayer({ room, playerId });
    socket.emit("roomLeaved");

    // Remove room if there's no players left
    if (room.players.length === 0) {
      deleteRoom(room);
      return;
    }

    // Reset board
    room.board = createBoard();

    // Assign X mark for the first player (if needed)
    const otherPlayer = room.players[0];
    resetMark(otherPlayer);

    // Notice the other player
    io.to(otherPlayer.playerId).emit("opponentLeaved", room);
  };

const disconnectHandler =
  ({ socket, io }) =>
  () => {
    // Find this player's room
    const playerId = socket.id;
    const room = searchRoomByPlayer(playerId);

    // Do nothing if player hasn't joined any room
    if (!room) {
      return;
    }

    // Remove player from room
    removePlayer({ room, playerId });

    // Remove room if there's no players left
    if (room.players.length === 0) {
      deleteRoom(room);
      return;
    }

    // Reset board
    room.board = createBoard();

    // Assign X mark for the first player (if needed)
    const otherPlayer = room.players[0];
    resetMark(otherPlayer);

    // Notice the other player
    io.to(otherPlayer.playerId).emit("opponentLeaved", room);
  };

export {
  createRoomHandler,
  joinRoomHandler,
  leaveRoomHandler,
  disconnectHandler,
};
