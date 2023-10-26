import type { CellContent } from "@/types";
import { getCellClass } from "@/utils/cell";

type Props = {
  cell: CellContent;
  highlight: boolean;
  row: number;
  col: number;
  selectCell: (row: number, col: number) => void;
};

export default function Cell({
  cell = "",
  highlight = false,
  row,
  col,
  selectCell,
}: Props) {
  const handleClick = () => {
    selectCell(row, col);
  };

  return (
    <div className={getCellClass(cell, highlight)} onClick={handleClick}>
      {cell}
    </div>
  );
}
