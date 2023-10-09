const { Server } = require("socket.io");

const allowOrigins = ["http://localhost:5173"]; // add live client URL later

const runSocketIO = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: allowOrigins,
    },
  });

  io.on("connection", (socket) => {
    const playerId = socket.id;

    socket.on("createRoom", (playerName) => {
      // const roomId = playerId;
      // const players = [playerName];
      // const board = createBoard();

      console.log(playerName);
    });
  });
};

module.exports = runSocketIO;
