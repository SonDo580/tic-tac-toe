import { Server } from "socket.io";

import {
  createRoomHandler,
  disconnectHandler,
  joinRoomHandler,
  leaveRoomHandler,
} from "./controllers/room.js";
import { moveHandler } from "./controllers/game.js";
import { resetRoom, searchRoomById } from "./utils/room.js";
import { swapMark } from "./utils/mark.js";

const runSocketIO = (httpServer) => {
  const allowedOrigins = ["http://localhost:5173"]; // add live client URL later
  const io = new Server(httpServer, {
    cors: { origin: allowedOrigins },
  });

  io.on("connection", (socket) => {
    socket.on("createRoom", createRoomHandler(socket));
    socket.on("joinRoom", joinRoomHandler({ socket, io }));
    socket.on("leaveRoom", leaveRoomHandler({ socket, io }));
    socket.on("disconnect", disconnectHandler({ socket, io }));

    socket.on("move", moveHandler({ socket, io }));
    socket.on("rematch", (roomId) => {
      // Find the room
      const room = searchRoomById(roomId);
      if (!room) {
        return;
      }

      // The second event will not trigger this code
      if (room.endGame) {
        // Swap the players' marks
        swapMark(room.players);
        // Reset room state
        resetRoom(room);
      }

      // Notice this player
      socket.emit("rematched", room);
    });
  });
};

export default runSocketIO;
