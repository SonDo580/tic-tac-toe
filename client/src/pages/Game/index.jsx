import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { socket } from "@/utils/socket";
import { getPlayerRoles, getPlayerDisplay } from "@/utils/player";
import { GameContext } from "@/context/GameContext";
import Board from "@/components/Board";

export default function Game() {
  const navigate = useNavigate();
  const {
    state: { roomId, players },
  } = useContext(GameContext);

  const leaveRoom = () => {
    socket.emit("leaveRoom", roomId);
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
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

  return (
    <div>
      <button onClick={copyRoomId}>Copy Room ID</button>
      <p>You: {getPlayerDisplay(thisPlayer)}</p>
      <p>Opponent: {getPlayerDisplay(otherPlayer)}</p>
      <button onClick={leaveRoom}>Leave Room</button>
      <Board />
    </div>
  );
}
