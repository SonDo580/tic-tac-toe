import { isEmptyCell, isValidCell } from "../utils/board.js";
import { gameEnded, makeMove, winnerFound } from "../utils/game.js";
import { getHighlightCells } from "../utils/highlighter.js";
import { swapMark, swapTurn } from "../utils/mark.js";
import { findPlayer, resetRoom, searchRoomById } from "../utils/room.js";

const moveHandler =
  ({ socket, io }) =>
  ({ roomId, row, col }) => {
    // Check row and col
    if (!isValidCell({ row, col })) {
      return;
    }

    // Find the room
    const room = searchRoomById(roomId);
    if (!room) {
      return;
    }

    // Don't allow moving if the game has finished
    if (room.endGame) {
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
    makeMove({ room, row, col, mark: turn });
    // Get cells to be highlighted
    room.highlightCells = getHighlightCells(board, row, col, turn);
    // Check if current player is the winner
    if (winnerFound(room.highlightCells)) {
      room.winnerId = socket.id;
    }
    // Check end game
    room.endGame = gameEnded(room);
    // Swap turn
    swapTurn(room);

    // Notice both players
    socket.emit("boardUpdated", room);
    if (otherPlayer) {
      io.to(otherPlayer.playerId).emit("boardUpdated", room);
    }
  };

const rematchHandler = (socket) => (roomId) => {
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
};

const resetRequestHandler =
  ({ socket, io }) =>
  (roomId) => {
    // Find the room
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

    // Allow reset if there's only 1 player
    if (!otherPlayer) {
      // Reset room state
      resetRoom(room);
      // Notice current player
      socket.emit("resetAccepted", room);
      return;
    }

    // Ask for the other player's acceptance
    io.to(otherPlayer.playerId).emit("resetRequest");
  };

const resetAcceptHandler =
  ({ socket, io }) =>
  (roomId) => {
    // Find the room
    const room = searchRoomById(roomId);
    if (!room) {
      return;
    }

    // Find players in the room
    const { thisPlayer, otherPlayer } = findPlayer({
      room,
      playerId: socket.id,
    });
    if (!thisPlayer || !otherPlayer) {
      return;
    }

    // Reset room state
    resetRoom(room);

    // Notify both players
    socket.emit("resetAccepted", room);
    io.to(otherPlayer.playerId).emit("resetAccepted", room);
  };

const resetRejectHandler =
  ({ socket, io }) =>
  (roomId) => {
    // Find the room
    const room = searchRoomById(roomId);
    if (!room) {
      return;
    }

    // Find players in the room
    const { thisPlayer, otherPlayer } = findPlayer({
      room,
      playerId: socket.id,
    });
    if (!thisPlayer || !otherPlayer) {
      return;
    }

    // Notify the other player
    io.to(otherPlayer.playerId).emit("resetRejected");
  };

export {
  moveHandler,
  rematchHandler,
  resetRequestHandler,
  resetAcceptHandler,
  resetRejectHandler,
};
