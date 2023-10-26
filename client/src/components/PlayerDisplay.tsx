import type { Player } from "@/types";
import { MESSAGE } from "@/constants/messages";

type Props = {
  player?: Player;
};

export default function PlayerDisplay({ player }: Props) {
  if (!player) {
    return <span>{MESSAGE.waiting}</span>;
  }

  return (
    <div className="player">
      <strong className="mark">{player.mark}</strong>
      <span>{" - "}</span>
      <span>{player.playerName}</span>
    </div>
  );
}
