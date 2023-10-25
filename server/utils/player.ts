import { MARK } from "../constants";
import { Player } from "../types";

const createPlayer = (
  playerId: string,
  playerName: string,
  mark: MARK
): Player => ({
  playerId,
  playerName,
  mark,
});

export { createPlayer };
