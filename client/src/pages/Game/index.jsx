import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { MESSAGE } from "@/constants/messages";
import { socket } from "@/utils/socket";
import { getPlayerRoles, getPlayerDisplay } from "@/utils/player";
import { GameContext } from "@/context/GameContext";
import Board from "@/components/Board";
import Confirm from "@/components/Confirm";

export default function Game() {
  const navigate = useNavigate();
  const { roomId, players, turn, endGame } = useContext(GameContext);

  const leaveRoom = () => {
    socket.emit("leaveRoom", roomId);
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
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
      <p>You: {getPlayerDisplay(thisPlayer)}</p>
      <p>Opponent: {getPlayerDisplay(otherPlayer)}</p>
      <p>{allowMove ? "Your turn" : "Opponent's turn"}</p>

      <button onClick={copyRoomId}>Copy Room ID</button>
      <button onClick={leaveRoom}>Leave Room</button>

      <Board allowMove={allowMove} />

      {endGame && (
        <Confirm
          question={MESSAGE.playAgain}
          onOk={rematch}
          onCancel={leaveRoom}
        />
      )}
    </div>
  );
}
