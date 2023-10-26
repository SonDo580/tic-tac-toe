import type { Player } from "@/types";
import { MESSAGE } from "@/constants/messages";
import { socket } from "@/utils/socket";
import { showSingleToast } from "@/utils/toast";

type Props = {
  roomId: string;
  otherPlayer?: Player;
};

export default function Controls({ roomId, otherPlayer }: Props) {
  const leaveRoom = () => {
    socket.emit("leaveRoom", roomId);
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    showSingleToast("roomIdCopied", MESSAGE.roomIdCopied);
  };

  const requestReset = () => {
    socket.emit("resetRequest", roomId);
    if (otherPlayer) {
      showSingleToast("resetRequest", MESSAGE.resetRequested);
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
