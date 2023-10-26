import PropTypes from "prop-types";
import { getCellClass } from "@/utils/cell";

export default function Cell({ mark, highlight, row, col, selectCell }) {
  const handleClick = () => {
    selectCell(row, col);
  };

  return (
    <div className={getCellClass(mark, highlight)} onClick={handleClick}>
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
  selectCell: PropTypes.func.isRequired,
};
