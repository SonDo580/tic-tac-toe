import { useEffect, useState } from "react";

import { MESSAGE } from "@/constants/messages";
import { socket } from "@/utils/socket";

export default function CreateRoom() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const changeName = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() === "") {
      setNameError(MESSAGE.nameError);
      return;
    }
    setNameError("");
    socket.emit("createRoom", name);
  };

  useEffect(() => {
    socket.on("nameError", () => {
      setNameError(MESSAGE.nameError);
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
      <span>{nameError}</span>
      <button>Create Room</button>
    </form>
  );
}
