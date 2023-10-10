import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { GameContext } from "@/context/GameContext";
import Board from "@/components/Board";

export default function Game() {
  const {
    state: { roomId },
  } = useContext(GameContext);

  if (!roomId) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Board />
    </div>
  );
}
