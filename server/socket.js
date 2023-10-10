import { Server } from "socket.io";

import { MARK } from "./constants.js";
import { createRoom, rooms, searchRoom } from "./utils/room.js";

const runSocketIO = (httpServer) => {
  const allowOrigins = ["http://localhost:5173"]; // add live client URL later
  const io = new Server(httpServer, {
    cors: { origin: allowOrigins },
  });

  io.on("connection", (socket) => {
    const playerId = socket.id;

    socket.on("createRoom", (playerName) => {
      if (playerName.trim() === "") {
        socket.emit("nameError");
        return;
      }

      const firstPlayer = { playerId, playerName, mark: MARK.X };
      const room = createRoom(firstPlayer);
      rooms.push(room);
      socket.emit("roomCreated", room);
    });

    socket.on("joinRoom", ({ playerName, roomID }) => {
      if (playerName.trim() === "") {
        socket.emit("nameError");
        return;
      }

      if (roomID === "") {
        socket.emit("roomIdEmpty");
        return;
      }

      const room = searchRoom(roomID);
      if (!room) {
        socket.emit("roomNotExists");
        return;
      }

      if (room.players.length === 2) {
        socket.emit("roomFull");
        return;
      }

      const secondPlayer = { playerId, playerName, mark: MARK.O };
      room.players.push(secondPlayer);
      socket.emit("roomJoined", room);
    });
  });
};

export default runSocketIO;
