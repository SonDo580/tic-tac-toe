import PropTypes from "prop-types";

export default function Cell({ mark, row, col, handleClick }) {
  const selectCell = () => handleClick(row, col);

  return (
    <div className="cell" onClick={selectCell}>
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
