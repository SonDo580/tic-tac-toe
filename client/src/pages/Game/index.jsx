import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { GameContext } from "@/context/GameContext";
import { getPlayerRoles, getPlayerDisplay } from "@/utils/player";
import Board from "@/components/Board";

export default function Game() {
  const {
    state: { roomId, players },
  } = useContext(GameContext);

  if (!roomId) {
    return <Navigate to="/" />;
  }

  const { thisPlayer, otherPlayer } = getPlayerRoles(players);

  return (
    <div>
      <h1>Room ID: {roomId}</h1>
      <p>You: {getPlayerDisplay(thisPlayer)}</p>
      <p>Opponent: {getPlayerDisplay(otherPlayer)}</p>
      <Board />
    </div>
  );
}
