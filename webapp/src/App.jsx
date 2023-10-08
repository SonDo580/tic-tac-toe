import { GameProvider } from "@/context/GameContext";
import { MarkProvider } from "@/context/MarkContext";
import { BoardProvider } from "@/context/BoardContext";

import "./App.scss";
import Board from "@/components/Board";
import ResetButton from "@/components/ResetButton";

function App() {
  return (
    <GameProvider>
      <MarkProvider>
        <BoardProvider>
          <div>
            <Board />
            <ResetButton />
          </div>
        </BoardProvider>
      </MarkProvider>
    </GameProvider>
  );
}

export default App;
