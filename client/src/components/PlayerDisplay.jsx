import PropTypes from "prop-types";

import { MARK } from "@/constants/index";
import { MESSAGE } from "@/constants/messages";

export default function PlayerDisplay({ player }) {
  if (!player) {
    return MESSAGE.waiting;
  }

  return (
    <div className="player">
      <strong className="mark">{player.mark}</strong>
      <span>{" - "}</span>
      <span>{player.playerName}</span>
    </div>
  );
}

PlayerDisplay.propTypes = {
  player: PropTypes.shape({
    playerId: PropTypes.string.isRequired,
    playerName: PropTypes.string.isRequired,
    mark: PropTypes.oneOf([MARK.X, MARK.O]),
  }),
};
