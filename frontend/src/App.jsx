import { MarkProvider } from "@/context/MarkContext";
import Board from "@/components/Board";
import "./App.scss";

function App() {
  return (
    <MarkProvider>
      <Board />
    </MarkProvider>
  );
}

export default App;
