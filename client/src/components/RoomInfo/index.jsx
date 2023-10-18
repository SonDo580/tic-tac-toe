import PropTypes from "prop-types";
import { toast } from "react-toastify";

import { socket } from "@/utils/socket";
import { getTurnDisplay } from "@/utils";
import { MARK } from "@/constants/index";
import { MESSAGE } from "@/constants/messages";
import PlayerDisplay from "@/components/PlayerDisplay";
import { useEffect } from "react";

export default function RoomInfo({
  roomId,
  allowMove,
  thisPlayer,
  otherPlayer,
}) {
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

  useEffect(() => {
    toast(getTurnDisplay(allowMove));
  }, []);

  return (
    <div className="roomInfo">
      <div className="players">
        <div>
          You: <PlayerDisplay player={thisPlayer} />
        </div>
        <div>
          Opponent: <PlayerDisplay player={otherPlayer} />
        </div>
      </div>

      <div>
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
    </div>
  );
}

RoomInfo.propTypes = {
  thisPlayer: PropTypes.shape({
    playerId: PropTypes.string.isRequired,
    playerName: PropTypes.string.isRequired,
    mark: PropTypes.oneOf([MARK.X, MARK.O]),
  }).isRequired,
  otherPlayer: PropTypes.shape({
    playerId: PropTypes.string.isRequired,
    playerName: PropTypes.string.isRequired,
    mark: PropTypes.oneOf([MARK.X, MARK.O]),
  }),
  allowMove: PropTypes.bool.isRequired,
  roomId: PropTypes.string.isRequired,
};
