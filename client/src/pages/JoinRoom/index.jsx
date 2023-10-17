import { useEffect, useState } from "react";

import { MESSAGE } from "@/constants/messages";
import { socket } from "@/utils/socket";

export default function JoinRoom() {
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
      setNameError(MESSAGE.nameError);
      hasError = true;
    } else {
      setNameError("");
    }

    if (roomID === "") {
      setRoomError(MESSAGE.roomIdEmpty);
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
          value={roomID}
          onChange={changeRoomID}
        />
        <span className="error">{roomError}</span>
      </div>

      <button className="button">Join</button>
    </form>
  );
}
