import { Server } from "socket.io";

import {
  createRoomHandler,
  disconnectHandler,
  joinRoomHandler,
  leaveRoomHandler,
} from "./controllers/room.js";
import { moveHandler, rematchHandler } from "./controllers/game.js";

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
    socket.on("rematch", rematchHandler(socket));
  });
};

export default runSocketIO;
