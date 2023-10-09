import { useState } from "react";
import { socket } from "@/utils/socket";

export default function CreateRoom() {
  const [name, setName] = useState("");

  const changeName = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("createRoom", name);
  };

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
