import { Server } from "socket.io";

import { createRoomHandler, joinRoomHandler } from "./controllers/room.js";
import { MARK } from "./constants.js";
import { rooms, searchRoom, searchRoomByPlayer } from "./utils/room.js";
import { createBoard } from "./utils/board.js";

const runSocketIO = (httpServer) => {
  const allowOrigins = ["http://localhost:5173"]; // add live client URL later
  const io = new Server(httpServer, {
    cors: { origin: allowOrigins },
  });

  io.on("connection", (socket) => {
    socket.on("createRoom", createRoomHandler(socket));
    socket.on("joinRoom", joinRoomHandler({ socket, io }));
    socket.on("leaveRoom", (roomId) => {
      const { roomIndex, room } = searchRoom(roomId);
      if (roomIndex === -1) {
        return;
      }

      // Remove player
      const playerId = socket.id;
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

      // Switch mark for first player if needed
      const otherPlayer = room.players[0];
      if (otherPlayer.mark === MARK.O) {
        otherPlayer.mark = MARK.X;
      }

      // Notice the other player
      io.to(otherPlayer.playerId).emit("opponentLeaved", room);
    });

    socket.on("disconnect", () => {
      // Find this player's room
      const playerId = socket.id;
      const { room, roomIndex } = searchRoomByPlayer(playerId);

      // Do nothing if the player hasn't joined any room
      if (!room) {
        return;
      }

      // Remove player
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
    });
  });
};

export default runSocketIO;
