import { Fragment, useContext } from "react";
import PropTypes from "prop-types";

import { socket } from "../../utils/socket";
import { GameContext } from "@/context/GameContext";
import Cell from "@/components/Cell";

export default function Board({ allowMove }) {
  const {
    state: { roomId, board },
  } = useContext(GameContext);

  const selectCell = (row, col) => {
    if (!allowMove) {
      return;
    }
    socket.emit("move", { roomId, row, col });
  };

  return (
    <div className="board">
      {board.map((row, i) => (
        <Fragment key={i}>
          {row.map((mark, j) => (
            <Cell
              key={j}
              mark={mark}
              row={i}
              col={j}
              highlight={false}
              selectCell={selectCell}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
}

Board.propTypes = {
  allowMove: PropTypes.bool.isRequired,
};
