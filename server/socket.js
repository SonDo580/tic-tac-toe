import { Server } from "socket.io";

import {
  createRoomHandler,
  disconnectHandler,
  joinRoomHandler,
  leaveRoomHandler,
} from "./controllers/room.js";
import { moveHandler, rematchHandler } from "./controllers/game.js";
import { findPlayer, resetRoom, searchRoomById } from "./utils/room.js";

const runSocketIO = (httpServer) => {
  const allowedOrigins = [
    "https://sondm-tictactoe.netlify.app",
    "http://localhost:5173",
  ];

  const io = new Server(httpServer, {
    cors: { origin: allowedOrigins },
  });

  io.on("connection", (socket) => {
    socket.on("createRoom", createRoomHandler(socket));
    socket.on("joinRoom", joinRoomHandler({ socket, io }));
    socket.on("leaveRoom", leaveRoomHandler({ socket, io }));
    socket.on("disconnect", disconnectHandler({ socket, io }));

    socket.on("move", moveHandler({ socket, io }));
    socket.on("rematch", rematchHandler(socket));

    socket.on("resetRequest", (roomId) => {
      // Find the room
      const room = searchRoomById(roomId);
      if (!room) {
        return;
      }

      // Find players in the room
      const { thisPlayer, otherPlayer } = findPlayer({
        room,
        playerId: socket.id,
      });
      if (!thisPlayer) {
        return;
      }

      // Allow reset if there's only 1 player
      if (!otherPlayer) {
        // Reset room state
        resetRoom(room);
        // Notice current player
        socket.emit("resetAccepted", room);
        return;
      }

      // Ask for the other player's acceptance
      io.to(otherPlayer.playerId).emit("resetRequest");
    });

    socket.on("resetAccept", (roomId) => {
      // Find the room
      const room = searchRoomById(roomId);
      if (!room) {
        return;
      }

      // Find players in the room
      const { thisPlayer, otherPlayer } = findPlayer({
        room,
        playerId: socket.id,
      });
      if (!thisPlayer || !otherPlayer) {
        return;
      }

      // Reset room state
      resetRoom(room);

      // Notify both players
      socket.emit("resetAccepted", room);
      io.to(otherPlayer.playerId).emit("resetAccepted", room);
    });

    socket.on("resetReject", (roomId) => {
      // Find the room
      const room = searchRoomById(roomId);
      if (!room) {
        return;
      }

      // Find players in the room
      const { thisPlayer, otherPlayer } = findPlayer({
        room,
        playerId: socket.id,
      });
      if (!thisPlayer || !otherPlayer) {
        return;
      }

      // Notify the other player
      io.to(otherPlayer.playerId).emit("resetRejected");
    });
  });
};

export default runSocketIO;
