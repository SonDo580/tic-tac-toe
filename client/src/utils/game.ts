import type { Player } from "@/types";
import { socket } from "@/utils/socket";

type GetPlayerRolesReturnType = {
  thisPlayer?: Player;
  otherPlayer?: Player;
};

const getPlayerRoles = (players: Player[]): GetPlayerRolesReturnType =>
  players.reduce((acc, player) => {
    if (socket.id === player.playerId) {
      return { ...acc, thisPlayer: player };
    } else {
      return { ...acc, otherPlayer: player };
    }
  }, {});

const getTurnDisplay = (allowMove: boolean) =>
  allowMove ? "Your turn" : "Opponent's turn";

const getGameResult = (thisPlayer: Player, winnerId?: string) => {
  if (!winnerId) {
    return "Tie!";
  }
  if (winnerId === thisPlayer.playerId) {
    return "You won!";
  }
  return "You lost!";
};

export { getPlayerRoles, getTurnDisplay, getGameResult };
