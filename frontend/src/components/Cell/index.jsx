import PropTypes from "prop-types";
import { MARK } from "@/constants";

const COLOR_CLASS = {
  [MARK.X]: "x",
  [MARK.O]: "o",
};

const getColorClass = (mark) => COLOR_CLASS[mark] || "";

export default function Cell({ mark, row, col, handleClick }) {
  const selectCell = () => handleClick(row, col);

  return (
    <div className={`cell ${getColorClass(mark)}`} onClick={selectCell}>
      {mark}
    </div>
  );
}

Cell.defaultProps = {
  mark: "",
};

Cell.propTypes = {
  mark: PropTypes.string,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};
