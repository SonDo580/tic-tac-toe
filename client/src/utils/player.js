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

export { getPlayerRoles };
