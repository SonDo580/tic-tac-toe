import { MarkProvider } from "@/context/MarkContext";
import { BoardProvider } from "@/context/BoardContext";
import Board from "@/components/Board";
import "./App.scss";

function App() {
  return (
    <MarkProvider>
      <BoardProvider>
        <Board />
      </BoardProvider>
    </MarkProvider>
  );
}

export default App;
