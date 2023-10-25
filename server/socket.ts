import { Server as HttpServer } from "http";
import { Server } from "socket.io";

import {
  createRoomHandler,
  disconnectHandler,
  joinRoomHandler,
  leaveRoomHandler,
} from "./controllers/room";
import {
  moveHandler,
  rematchHandler,
  resetAcceptHandler,
  resetRejectHandler,
} from "./controllers/game";

const runSocketIO = (httpServer: HttpServer) => {
  const allowedOrigins = [
    "https://sondm-tictactoe.netlify.app",
    "http://localhost:5173",
  ];

  const io = new Server(httpServer, {
    cors: { origin: allowedOrigins },
  });

  io.on("connection", (socket) => {
    socket.on("createRoom", createRoomHandler(socket));
    socket.on("joinRoom", joinRoomHandler(socket, io));
    socket.on("leaveRoom", leaveRoomHandler(socket, io));
    socket.on("disconnect", disconnectHandler(socket, io));
    socket.on("move", moveHandler(socket, io));
    socket.on("rematch", rematchHandler(socket));
    socket.on("resetRequest", resetRejectHandler(socket, io));
    socket.on("resetAccept", resetAcceptHandler(socket, io));
    socket.on("resetReject", resetRejectHandler(socket, io));
  });
};

export default runSocketIO;
