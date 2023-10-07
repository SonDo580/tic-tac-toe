import { Fragment, useContext, useState } from "react";
import { produce } from "immer";

import { MarkContext } from "@/context/MarkContext";
import { BoardContext } from "@/context/BoardContext";
import { getHighlightCells } from "@/utils/highlighter";
import Cell from "@/components/Cell";

const getUpdatedBoard = (board, rowIndex, colIndex, mark) =>
  produce(board, (draft) => {
    draft[rowIndex][colIndex] = mark;
  });

export default function Board() {
  const { board, setBoard } = useContext(BoardContext);
  const { mark, switchMark } = useContext(MarkContext);
  const [highlightCells, setHighlightCells] = useState([]);

  const updateBoard = (rowIndex, colIndex) => {
    setBoard((prevBoard) =>
      produce(prevBoard, (draft) => {
        if (draft[rowIndex][colIndex] !== "") {
          return;
        }

        draft[rowIndex][colIndex] = mark;

        const updatedBoard = getUpdatedBoard(
          prevBoard,
          rowIndex,
          colIndex,
          mark
        );

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
