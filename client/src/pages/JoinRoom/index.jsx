import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { socket } from "@/utils/socket";
import { GameContext } from "@/context/GameContext";

const nameErrorMessage =
  "Name is required and must contains non-space characters";
const roomIdEmptyMessage = "Room ID is required";
const roomNotExistsMessage = "Room doesn't exist";
const roomFullMessage = "Room was full";

export default function JoinRoom() {
  const navigate = useNavigate();
  const { initGame } = useContext(GameContext);

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

  useEffect(() => {
    socket.on("nameError", () => {
      setNameError(nameErrorMessage);
    });

    socket.on("roomIdEmpty", () => {
      setRoomError(roomIdEmptyMessage);
    });

    socket.on("roomNotExists", () => {
      setRoomError(roomNotExistsMessage);
    });

    socket.on("roomFull", () => {
      setRoomError(roomFullMessage);
    });

    socket.on("roomJoined", (roomInfo) => {
      initGame(roomInfo);
      navigate("/game");
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
