import { Server } from "socket.io";
import { createRoomHandler, joinRoomHandler } from "./controllers/room.js";

const runSocketIO = (httpServer) => {
  const allowOrigins = ["http://localhost:5173"]; // add live client URL later
  const io = new Server(httpServer, {
    cors: { origin: allowOrigins },
  });

  io.on("connection", (socket) => {
    socket.on("createRoom", createRoomHandler(socket));
    socket.on("joinRoom", joinRoomHandler({ socket, io }));
  });
};

export default runSocketIO;
