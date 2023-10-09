import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";
import Starter from "@/pages/Starter";
import Game from "@/pages/Game";
import CreateRoom from "@/pages/CreateRoom";
import JoinRoom from "@/pages/JoinRoom";
import Guide from "@/pages/Guide";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Starter />} />
        <Route path="/create" element={<CreateRoom />} />
        <Route path="/join" element={<JoinRoom />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
