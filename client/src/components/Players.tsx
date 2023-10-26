import { useEffect } from "react";
import { toast } from "react-toastify";

import type { Player } from "@/types";
import PlayerDisplay from "@/components/PlayerDisplay";
import { getTurnDisplay } from "@/utils/game";

type Props = {
  allowMove: boolean;
  thisPlayer?: Player;
  otherPlayer?: Player;
};

export default function Players({ allowMove, thisPlayer, otherPlayer }: Props) {
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
