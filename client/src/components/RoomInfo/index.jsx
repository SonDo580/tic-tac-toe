import PropTypes from "prop-types";

import { socket } from "@/utils/socket";
import { MARK } from "@/constants/index";
import PlayerDisplay from "@/components/PlayerDisplay";

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
  };

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
        <span className="turn">
          {allowMove ? "Your turn" : "Opponent's turn"}
        </span>
        <button className="button" onClick={copyRoomId}>
          Room ID
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
