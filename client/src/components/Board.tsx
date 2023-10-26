import { Fragment, useContext } from "react";

import { socket } from "@/utils/socket";
import { GameContext } from "@/context/GameContext";
import Cell from "@/components/Cell";

type Props = {
  allowMove: boolean;
};

export default function Board({ allowMove }: Props) {
  const { roomId, board, highlightCells } = useContext(GameContext);

  const shouldHighlight = (row: number, col: number) =>
    highlightCells!.includes(`${row}-${col}`);

  const selectCell = (row: number, col: number) => {
    if (!allowMove) {
      return;
    }
    socket.emit("move", roomId, row, col);
  };

  return (
    <div className="board">
      {board!.map((row, i) => (
        <Fragment key={i}>
          {row.map((cell, j) => (
            <Cell
              key={j}
              cell={cell}
              row={i}
              col={j}
              highlight={shouldHighlight(i, j)}
              selectCell={selectCell}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
}
