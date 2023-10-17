import { socket } from "@/utils/socket";

const getPlayerRoles = (players) =>
  players.reduce((acc, player) => {
    if (socket.id === player.playerId) {
      return { ...acc, thisPlayer: player };
    } else {
      return { ...acc, otherPlayer: player };
    }
  }, {});

const getGameResult = ({ winnerId, thisPlayer }) => {
  if (!winnerId) {
    return "Tie!";
  }
  if (winnerId === thisPlayer.playerId) {
    return "You won!";
  }
  return "You lost!";
};

export { getPlayerRoles, getGameResult };
