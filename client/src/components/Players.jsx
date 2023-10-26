import { useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import { getTurnDisplay } from "@/utils";
import { MARK } from "@/constants/index";
import PlayerDisplay from "@/components/PlayerDisplay";

export default function Players({ allowMove, thisPlayer, otherPlayer }) {
  useEffect(() => {
    toast(getTurnDisplay(allowMove));
  }, []);

  return (
    <div className="players">
      <div>
        You: <PlayerDisplay player={thisPlayer} />
      </div>
      <div>
        Opponent: <PlayerDisplay player={otherPlayer} />
      </div>
    </div>
  );
}

Players.propTypes = {
  allowMove: PropTypes.bool.isRequired,
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
};
