import { Server, Socket } from "socket.io";

import { MARK } from "../constants";
import { resetMark } from "../utils/mark";
import {
  addRoom,
  createRoom,
  deleteRoom,
  removePlayer,
  resetRoom,
  searchRoomById,
  searchRoomByPlayer,
} from "../utils/room";
import { createPlayer } from "../utils/player";

const createRoomHandler = (socket: Socket) => (playerName: string) => {
  // Validate player's name
  if (playerName.trim() === "") {
    socket.emit("nameError");
    return;
  }

  // Create a room with 1 player
  const firstPlayer = createPlayer(socket.id, playerName, MARK.X);
  const room = createRoom(firstPlayer);
  addRoom(room);

  // Notice the player
  socket.emit("roomCreated", room);
};

const joinRoomHandler =
  (socket: Socket, io: Server) => (playerName: string, roomId: string) => {
    // Validate player's name
    if (playerName.trim() === "") {
      socket.emit("nameError");
      return;
    }

    // Validate roomId
    if (roomId === "") {
      socket.emit("roomIdEmpty");
      return;
    }

    // Check if the room exists
    const room = searchRoomById(roomId);
    if (!room) {
      socket.emit("roomNotExists");
      return;
    }

    // Check if there are enough players
    if (room.players.length === 2) {
      socket.emit("roomFull");
      return;
    }

    // Add this player as second player
    const secondPlayer = createPlayer(socket.id, playerName, MARK.O);
    room.players.push(secondPlayer);

    // Notice both players
    socket.emit("roomJoined", room);
    const firstPlayerId = room.players[0].playerId;
    io.to(firstPlayerId).emit("opponentJoined", room);
  };

const leaveRoomHandler = (socket: Socket, io: Server) => (roomId: string) => {
  // Find the room
  const room = searchRoomById(roomId);
  if (!room) {
    return;
  }

  // Remove player from room and notice him/her
  const playerId = socket.id;
  removePlayer(room, playerId);
  socket.emit("roomLeaved");

  // Remove room if there's no players left
  if (room.players.length === 0) {
    deleteRoom(room);
    return;
  }

  // Reset room state
  resetRoom(room);

  // Assign X mark for the other player (if needed)
  const otherPlayer = room.players[0];
  resetMark(otherPlayer);

  // Notice the other player
  io.to(otherPlayer.playerId).emit("opponentLeaved", room);
};

const disconnectHandler = (socket: Socket, io: Server) => () => {
  // Find this player's room
  const playerId = socket.id;
  const room = searchRoomByPlayer(playerId);

  // Do nothing if player hasn't joined any room
  if (!room) {
    return;
  }

  // Remove player from room
  removePlayer(room, playerId);

  // Remove room if there's no players left
  if (room.players.length === 0) {
    deleteRoom(room);
    return;
  }

  // Reset room state
  resetRoom(room);

  // Assign X mark for the other player (if needed)
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
