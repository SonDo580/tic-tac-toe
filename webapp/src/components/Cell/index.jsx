import PropTypes from "prop-types";
import { MARK } from "@/constants";

const COLOR_CLASS = {
  [MARK.X]: "x",
  [MARK.O]: "o",
};

const getColorClass = (mark) => COLOR_CLASS[mark] || "";

const getHighlightClass = (highlight) => (highlight ? "highlight" : "");

const getCellClass = (mark, highlight) =>
  `cell ${getColorClass(mark)} ${getHighlightClass(highlight)}`;

export default function Cell({ mark, highlight, row, col, handleClick }) {
  const selectCell = () => handleClick(row, col);

  return (
    <div className={getCellClass(mark, highlight)} onClick={selectCell}>
      {mark}
    </div>
  );
}

Cell.defaultProps = {
  mark: "",
  highlight: false,
};

Cell.propTypes = {
  mark: PropTypes.string,
  highlight: PropTypes.bool,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};
