import { MARK } from "@/constants";

const COLOR_CLASS = {
  [MARK.X]: "x",
  [MARK.O]: "o",
};

const getColorClass = (mark: MARK): string => COLOR_CLASS[mark] || "";

const getHighlightClass = (highlight: boolean): string =>
  highlight ? "highlight" : "";

const getCellClass = (mark: MARK, highlight: boolean): string =>
  ["cell", getColorClass(mark), getHighlightClass(highlight)].join(" ");

export { getCellClass };
