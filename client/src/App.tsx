import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.scss";
import { toastConfig } from "@/utils/toast";
import Game from "@/pages/Game";
import Starter from "@/pages/Starter";
import CreateRoom from "@/pages/CreateRoom";
import JoinRoom from "@/pages/JoinRoom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Starter />} />
        <Route path="/create" element={<CreateRoom />} />
        <Route path="/join" element={<JoinRoom />} />
        <Route path="/game" element={<Game />} />
      </Routes>
      <ToastContainer {...toastConfig} />
    </>
  );
}

export default App;
