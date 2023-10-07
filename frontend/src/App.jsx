import { GameProvider } from "@/context/GameContext";
import { MarkProvider } from "@/context/MarkContext";
import { BoardProvider } from "@/context/BoardContext";
import Board from "@/components/Board";
import "./App.scss";

function App() {
  return (
    <GameProvider>
      <MarkProvider>
        <BoardProvider>
          <Board />
        </BoardProvider>
      </MarkProvider>
    </GameProvider>
  );
}

export default App;
