import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { MESSAGE } from "@/constants/messages";
import { socket } from "@/utils/socket";
import { getPlayerRoles, getGameResult } from "@/utils";
import { GameContext } from "@/context/GameContext";
import Board from "@/components/Board";
import Confirm from "@/components/Confirm";
import RoomInfo from "@/components/RoomInfo";

export default function Game() {
  const navigate = useNavigate();
  const { roomId, players, turn, endGame, winnerId } = useContext(GameContext);

  const leaveRoom = () => {
    socket.emit("leaveRoom", roomId);
  };

  const rematch = () => {
    socket.emit("rematch", roomId);
  };

  useEffect(() => {
    if (!roomId) {
      navigate("/");
    }
  }, [roomId]);

  if (!roomId) {
    return null;
  }

  const { thisPlayer, otherPlayer } = getPlayerRoles(players);
  const allowMove = thisPlayer.mark === turn;

  return (
    <div>
      <RoomInfo
        roomId={roomId}
        thisPlayer={thisPlayer}
        otherPlayer={otherPlayer}
      />

      <Board allowMove={allowMove} />

      {endGame && (
        <Confirm
          result={getGameResult({ winnerId, thisPlayer })}
          question={MESSAGE.playAgain}
          onOk={rematch}
          onCancel={leaveRoom}
        />
      )}
    </div>
  );
}
