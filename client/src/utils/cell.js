import { MARK } from "@/constants";

const COLOR_CLASS = {
  [MARK.X]: "x",
  [MARK.O]: "o",
};

const getColorClass = (mark) => COLOR_CLASS[mark] || "";

const getHighlightClass = (highlight) => (highlight ? "highlight" : "");

const getCellClass = (mark, highlight) =>
  ["cell", getColorClass(mark), getHighlightClass(highlight)].join(" ");

export { getCellClass };
