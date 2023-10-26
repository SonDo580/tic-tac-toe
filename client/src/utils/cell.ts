import type { CellContent } from "@/types";
import { MARK } from "@/constants";

type ColorClass = {
  [index: string]: string;
};

const COLOR_CLASS: ColorClass = {
  [MARK.X]: "x",
  [MARK.O]: "o",
};

const getColorClass = (cell: CellContent): string => COLOR_CLASS[cell] || "";

const getHighlightClass = (highlight: boolean): string =>
  highlight ? "highlight" : "";

const getCellClass = (cell: CellContent, highlight: boolean): string =>
  ["cell", getColorClass(cell), getHighlightClass(highlight)].join(" ");

export { getCellClass };
