import { Server } from "socket.io";
import { createRoom } from "./utils/room.js";

const rooms = [];

const allowOrigins = ["http://localhost:5173"]; // add live client URL later

const runSocketIO = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: allowOrigins },
  });

  io.on("connection", (socket) => {
    const playerId = socket.id;

    socket.on("createRoom", (playerName) => {
      const room = createRoom(playerId, playerName);
      rooms.push(room);
      socket.emit("roomCreated", room);
    });
  });
};

export default runSocketIO;
