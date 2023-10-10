import { socket } from "@/utils/socket";

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
    return "Waiting...";
  }

  return `${player.playerName} - ${player.mark}`;
};

export { getPlayerRoles, getPlayerDisplay };
