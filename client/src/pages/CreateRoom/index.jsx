import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { socket } from "@/utils/socket";
import { GameContext } from "@/context/GameContext";

export default function CreateRoom() {
  const navigate = useNavigate();
  const { initGame } = useContext(GameContext);
  const [name, setName] = useState("");

  const changeName = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("createRoom", name);
  };

  useEffect(() => {
    socket.on("roomCreated", (roomInfo) => {
      initGame(roomInfo);
      navigate({
        pathname: "/game",
        search: `?room=${roomInfo.roomId}`,
      });
    });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={changeName}
      />
      <button>Create Room</button>
    </form>
  );
}
