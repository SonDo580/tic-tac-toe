import { Fragment, useContext, useState } from "react";
import { produce } from "immer";

import { SIDE } from "@/constants";
import { MarkContext } from "@/context/MarkContext";
import { getHighlightCells } from "@/utils/highlighter";
import Cell from "@/components/Cell";

const createBoard = () => {
  const board = [];
  for (let i = 0; i < SIDE; i++) {
    const row = Array(SIDE).fill("");
    board.push(row);
  }
  return board;
};

const getUpdatedBoard = (board, rowIndex, colIndex, mark) =>
  produce(board, (draft) => {
    draft[rowIndex][colIndex] = mark;
  });

export default function Board() {
  const [board, setBoard] = useState(createBoard);
  const { mark, switchMark } = useContext(MarkContext);
  const [highlightCells, setHighlightCells] = useState([]);

  const updateBoard = (rowIndex, colIndex) => {
    setBoard((prevBoard) =>
      produce(prevBoard, (draft) => {
        if (draft[rowIndex][colIndex] !== "") {
          return;
        }

        draft[rowIndex][colIndex] = mark;

        const updatedBoard = getUpdatedBoard(board, rowIndex, colIndex, mark);
        const cells = getHighlightCells(updatedBoard, rowIndex, colIndex, mark);
        if (cells.length > 0) {
          setHighlightCells(cells);
        }
      })
    );

    switchMark();
  };

  const shouldHighlight = (rowIndex, colIndex) =>
    highlightCells.includes(`${rowIndex}-${colIndex}`);

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
              highlight={shouldHighlight(i, j)}
              handleClick={updateBoard}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
}
