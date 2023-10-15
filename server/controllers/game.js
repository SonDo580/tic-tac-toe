import {
  gameEnded,
  isEmptyCell,
  isValidCell,
  makeMove,
} from "../utils/board.js";
import { getHighlightCells } from "../utils/highlighter.js";
import { swapTurn } from "../utils/mark.js";
import { findPlayer, searchRoomById } from "../utils/room.js";

const moveHandler =
  ({ socket, io }) =>
  ({ roomId, row, col }) => {
    // Check row and col
    if (!isValidCell({ row, col })) {
      return;
    }

    // Find current room
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
    makeMove({ board, row, col, mark: turn });
    // Get cells to be highlighted
    room.highlightCells = getHighlightCells(board, row, col, turn);
    // Check end game
    room.endGame = gameEnded(room);
    // Swap turn
    swapTurn(room);

    // Notice the players
    socket.emit("boardUpdated", room);
    if (otherPlayer) {
      io.to(otherPlayer.playerId).emit("boardUpdated", room);
    }
  };

export { moveHandler };
