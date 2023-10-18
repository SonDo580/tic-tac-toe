import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const [resetPopupVisible, setResetPopupVisible] = useState(false);

  const leaveRoom = () => {
    socket.emit("leaveRoom", roomId);
  };

  const rematch = () => {
    socket.emit("rematch", roomId);
  };

  const acceptReset = () => {
    socket.emit("resetAccept", roomId);
    setResetPopupVisible(false);
  };

  const rejectReset = () => {
    socket.emit("resetReject", roomId);
    setResetPopupVisible(false);
  };

  useEffect(() => {
    socket.on("resetRequest", () => {
      setResetPopupVisible(true);
    });

    socket.on("resetRejected", () => {
      toast(MESSAGE.resetRejected);
    });
  }, []);

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
        allowMove={allowMove}
        thisPlayer={thisPlayer}
        otherPlayer={otherPlayer}
      />

      <Board allowMove={allowMove} />

      {resetPopupVisible && (
        <Confirm
          question={MESSAGE.resetQuestion}
          onOk={acceptReset}
          onCancel={rejectReset}
        />
      )}

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
