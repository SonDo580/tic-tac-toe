import { MARK } from "../constants.js";
import { createRoom, rooms, searchRoom } from "../utils/room.js";

const createRoomHandler = (socket) => (playerName) => {
  if (playerName.trim() === "") {
    socket.emit("nameError");
    return;
  }

  const firstPlayer = { playerId: socket.id, playerName, mark: MARK.X };
  const room = createRoom(firstPlayer);
  rooms.push(room);
  socket.emit("roomCreated", room);
};

const joinRoomHandler =
  ({ socket, io }) =>
  ({ playerName, roomID }) => {
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

    const secondPlayer = { playerId: socket.id, playerName, mark: MARK.O };
    room.players.push(secondPlayer);
    socket.emit("roomJoined", room);

    const firstPlayerId = room.players[0].playerId;
    io.to(firstPlayerId).emit("roomJoined", room);
  };

export { createRoomHandler, joinRoomHandler };
