import { Fragment, useContext, useState } from "react";

import { MarkContext } from "@/context/MarkContext";
import { SIDE } from "@/constants";
import Cell from "@/components/Cell";

const createBoard = () => {
  const board = [];
  for (let i = 0; i < SIDE; i++) {
    const row = Array(SIDE).fill("");
    board.push(row);
  }
  return board;
};

export default function Board() {
  const [board, setBoard] = useState(createBoard);
  const { mark, switchMark } = useContext(MarkContext);

  const updateBoard = (rowIndex, colIndex) => {
    setBoard((prevBoard) =>
      prevBoard.map((row, i) => {
        if (i !== rowIndex) {
          return row;
        }

        return row.map((cell, j) => {
          if (j !== colIndex) {
            return cell;
          }
          return mark;
        });
      })
    );

    switchMark();
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
              handleClick={updateBoard}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
}
