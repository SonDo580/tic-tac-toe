import { Fragment, useContext } from "react";

import { GameContext } from "@/context/GameContext";
import Cell from "@/components/Cell";

export default function Board() {
  const {
    state: { board },
  } = useContext(GameContext);

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
              handleClick={() => {}}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
}
