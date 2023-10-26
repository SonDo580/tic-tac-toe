import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { MESSAGE } from "@/constants/messages";
import { socket } from "@/utils/socket";

export default function JoinRoom() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const [roomId, setRoomId] = useState("");
  const [roomError, setRoomError] = useState("");
  const changeRoomId = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomId(event.target.value);
  };

  const formHasError = () => {
    let hasError = false;

    if (name.trim() === "") {
      setNameError(MESSAGE.nameError);
      hasError = true;
    } else {
      setNameError("");
    }

    if (roomId === "") {
      setRoomError(MESSAGE.roomIdEmpty);
      hasError = true;
    } else {
      setRoomError("");
    }

    return hasError;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (formHasError()) {
      return;
    }
    socket.emit("joinRoom", name, roomId);
  };

  useEffect(() => {
    socket.on("nameError", () => {
      setNameError(MESSAGE.nameError);
    });

    socket.on("roomIdEmpty", () => {
      setRoomError(MESSAGE.roomIdEmpty);
    });

    socket.on("roomNotExists", () => {
      setRoomError(MESSAGE.roomNotExists);
    });

    socket.on("roomFull", () => {
      setRoomError(MESSAGE.roomFull);
    });
  }, []);

  return (
    <form className="wrapper" onSubmit={handleSubmit}>
      <Link to="/" className="link">
        <FaArrowLeft /> Back to Home
      </Link>
      <h1>Join a Room</h1>

      <div className="formField">
        <input
          type="text"
          placeholder={MESSAGE.namePlaceholder}
          value={name}
          onChange={changeName}
        />
        <span className="error">{nameError}</span>
      </div>

      <div className="formField">
        <input
          type="text"
          placeholder={MESSAGE.roomPlaceholder}
          value={roomId}
          onChange={changeRoomId}
        />
        <span className="error">{roomError}</span>
      </div>

      <button className="button">Join</button>
    </form>
  );
}
