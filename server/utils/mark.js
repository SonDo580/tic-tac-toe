import { MARK } from "../constants.js";

const resetMark = (player) => {
  if (player.mark === MARK.O) {
    player.mark = MARK.X;
  }
};

const swapMark = (players) => {
  if (players.length !== 2) {
    return;
  }

  [players[1].mark, players[0].mark] = [players[0].mark, players[1].mark];
};

const swapTurn = (room) => {
  if (room.turn === MARK.X) {
    room.turn = MARK.O;
  } else {
    room.turn = MARK.X;
  }
};

export { resetMark, swapMark, swapTurn };
