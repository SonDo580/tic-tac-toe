import { Server } from "socket.io";

import {
  createRoomHandler,
  disconnectHandler,
  joinRoomHandler,
  leaveRoomHandler,
} from "./controllers/room.js";

const runSocketIO = (httpServer) => {
  const allowOrigins = ["http://localhost:5173"]; // add live client URL later
  const io = new Server(httpServer, {
    cors: { origin: allowOrigins },
  });

  io.on("connection", (socket) => {
    socket.on("createRoom", createRoomHandler(socket));
    socket.on("joinRoom", joinRoomHandler({ socket, io }));
    socket.on("leaveRoom", leaveRoomHandler({ socket, io }));
    socket.on("disconnect", disconnectHandler({ socket, io }));
  });
};

export default runSocketIO;
