import { useContext } from "react";

import { MARK } from "@/constants";
import { BoardContext } from "@/context/BoardContext";
import { GameContext } from "@/context/GameContext";
import { MarkContext } from "@/context/MarkContext";

export default function ResetButton() {
  const { resetBoard } = useContext(BoardContext);
  const { setEndGame } = useContext(GameContext);
  const { setMark } = useContext(MarkContext);

  const resetGame = () => {
    setEndGame(false);
    setMark(MARK.X);
    resetBoard();
  };

  return <button onClick={resetGame}>Reset</button>;
}
