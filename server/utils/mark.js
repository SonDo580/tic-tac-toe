import { MARK } from "../constants.js";

const resetMark = (player) => {
  if (player.mark === MARK.O) {
    player.mark = MARK.X;
  }
};

const swapTurn = (room) => {
  if (room.turn === MARK.X) {
    room.turn = MARK.O;
  } else {
    room.turn = MARK.X;
  }
};

const resetTurn = (room) => {
  room.turn = MARK.X;
};

export { resetMark, swapTurn, resetTurn };
