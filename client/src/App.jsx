import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";
import Starter from "@/pages/Starter";
import Game from "@/pages/Game";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Starter />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
