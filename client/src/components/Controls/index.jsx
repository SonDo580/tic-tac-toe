import PropTypes from "prop-types";
import { toast } from "react-toastify";

import { socket } from "@/utils/socket";
import { MARK } from "@/constants/index";
import { MESSAGE } from "@/constants/messages";

export default function Controls({ roomId, otherPlayer }) {
  const leaveRoom = () => {
    socket.emit("leaveRoom", roomId);
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    toast(MESSAGE.roomIdCopied);
  };

  const requestReset = () => {
    socket.emit("resetRequest", roomId);
    if (otherPlayer) {
      toast(MESSAGE.resetRequested);
    }
  };

  return (
    <div className="controls">
      <button className="button" onClick={copyRoomId}>
        Room ID
      </button>
      <button className="button" onClick={requestReset}>
        Reset
      </button>
      <button className="button" onClick={leaveRoom}>
        Leave
      </button>
    </div>
  );
}

Controls.propTypes = {
  roomId: PropTypes.string.isRequired,
  otherPlayer: PropTypes.shape({
    playerId: PropTypes.string.isRequired,
    playerName: PropTypes.string.isRequired,
    mark: PropTypes.oneOf([MARK.X, MARK.O]),
  }),
};
