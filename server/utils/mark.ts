import { MARK } from "../constants";
import type { Player, Room } from "../types";

const resetMark = (player: Player) => {
  if (player.mark === MARK.O) {
    player.mark = MARK.X;
  }
};

const swapMark = (players: Player[]) => {
  if (players.length !== 2) {
    return;
  }

  [players[1].mark, players[0].mark] = [players[0].mark, players[1].mark];
};

const swapTurn = (room: Room) => {
  if (room.turn === MARK.X) {
    room.turn = MARK.O;
  } else {
    room.turn = MARK.X;
  }
};

export { resetMark, swapMark, swapTurn };
