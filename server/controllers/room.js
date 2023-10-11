import { MARK } from "../constants.js";
import { createBoard } from "../utils/board.js";
import {
  createRoom,
  rooms,
  searchRoom,
  searchRoomByPlayer,
} from "../utils/room.js";

const createRoomHandler = (socket) => (playerName) => {
  if (playerName.trim() === "") {
    socket.emit("nameError");
    return;
  }

  const firstPlayer = { playerId: socket.id, playerName, mark: MARK.X };
  const room = createRoom(firstPlayer);
  rooms.push(room);
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

    const { room } = searchRoom(roomID);
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
    const { roomIndex, room } = searchRoom(roomId);
    if (roomIndex === -1) {
      return;
    }

    // Remove player from room
    room.players = room.players.filter(
      (player) => player.playerId !== playerId
    );
    socket.emit("roomLeaved");

    // Remove room if there's no players left
    if (room.players.length === 0) {
      rooms.splice(roomIndex, 1);
      return;
    }

    // Reset board
    room.board = createBoard();

    // Switch mark for the other player if needed
    const otherPlayer = room.players[0];
    if (otherPlayer.mark === MARK.O) {
      otherPlayer.mark = MARK.X;
    }

    // Notice the other player
    io.to(otherPlayer.playerId).emit("opponentLeaved", room);
  };

const disconnectHandler =
  ({ socket, io }) =>
  () => {
    // Find this player's room
    const playerId = socket.id;
    const { room, roomIndex } = searchRoomByPlayer(playerId);

    // Do nothing if player hasn't joined any room
    if (!room) {
      return;
    }

    // Remove player from room
    room.players = room.players.filter(
      (player) => player.playerId !== playerId
    );

    // Remove room if there's no players left
    if (room.players.length === 0) {
      rooms.splice(roomIndex, 1);
      return;
    }

    // Reset board
    room.board = createBoard();

    // Switch mark for first player if needed
    const otherPlayer = room.players[0];
    if (otherPlayer.mark === MARK.O) {
      otherPlayer.mark = MARK.X;
    }

    // Notice the other player
    io.to(otherPlayer.playerId).emit("opponentLeaved", room);
  };

export {
  createRoomHandler,
  joinRoomHandler,
  leaveRoomHandler,
  disconnectHandler,
};
