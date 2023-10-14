import { Server } from "socket.io";

import {
  createRoomHandler,
  disconnectHandler,
  joinRoomHandler,
  leaveRoomHandler,
} from "./controllers/room.js";
import { findPlayer, searchRoomById } from "./utils/room.js";
import { swapTurn } from "./utils/mark.js";
import { isEmptyCell, isValidCell } from "./utils/board.js";

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

    socket.on("move", ({ roomId, row, col }) => {
      // Check row and col
      if (!isValidCell({ row, col })) {
        return;
      }

      // Find current room
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

      // Check if this is this player's turn
      const { board, turn } = room;
      if (thisPlayer.mark !== turn) {
        return;
      }

      // Check if the cell is empty
      if (!isEmptyCell({ board, row, col })) {
        return;
      }

      // Handle the move
      board[row][col] = turn;
      // highlight
      // check endgame

      // Swap turn
      swapTurn(room);

      // Notice the players
      socket.emit("boardUpdated", room);
      if (otherPlayer) {
        io.to(otherPlayer.playerId).emit("boardUpdated", room);
      }
    });
  });
};

export default runSocketIO;
