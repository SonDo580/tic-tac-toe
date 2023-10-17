import { socket } from "@/utils/socket";
import { MESSAGE } from "@/constants/messages";

const getPlayerRoles = (players) =>
  players.reduce((acc, player) => {
    if (socket.id === player.playerId) {
      return { ...acc, thisPlayer: player };
    } else {
      return { ...acc, otherPlayer: player };
    }
  }, {});

const getPlayerDisplay = (player) => {
  if (!player) {
    return MESSAGE.waiting;
  }

  return `${player.playerName} - ${player.mark}`;
};

export { getPlayerRoles, getPlayerDisplay };
