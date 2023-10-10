import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { socket } from "@/utils/socket";

const nameErrorMessage =
  "Name is required and must contains non-space characters";

const roomIdEmptyMessage = "Room ID is required";

export default function JoinRoom() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const changeName = (event) => {
    setName(event.target.value);
  };

  const [roomID, setRoomID] = useState("");
  const [roomError, setRoomError] = useState("");
  const changeRoomID = (event) => {
    setRoomID(event.target.value);
  };

  const formHasError = () => {
    let hasError = false;

    if (name.trim() === "") {
      setNameError(nameErrorMessage);
      hasError = true;
    } else {
      setNameError("");
    }

    if (roomID === "") {
      setRoomError(roomIdEmptyMessage);
      hasError = true;
    } else {
      setRoomError("");
    }

    return hasError;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formHasError()) {
      return;
    }
    socket.emit("joinRoom", { playerName: name, roomID });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={changeName}
      />
      <span>{nameError}</span>

      <input
        type="text"
        placeholder="Enter room ID"
        value={roomID}
        onChange={changeRoomID}
      />
      <span>{roomError}</span>

      <button>Join</button>
    </form>
  );
}
