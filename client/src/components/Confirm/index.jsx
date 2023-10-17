import PropTypes from "prop-types";

export default function Confirm({
  result,
  question,
  okText,
  cancelText,
  onOk,
  onCancel,
}) {
  return (
    <div className="overlay">
      <div className="modal">
        <p>
          {result} {question}
        </p>
        <button onClick={onOk}>{okText}</button>
        <button onClick={onCancel}>{cancelText}</button>
      </div>
    </div>
  );
}

Confirm.defaultProps = {
  okText: "Yes",
  cancelText: "No",
};

Confirm.propTypes = {
  result: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
