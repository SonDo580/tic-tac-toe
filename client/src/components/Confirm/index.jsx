import PropTypes from "prop-types";

export default function Confirm({
  question,
  okText,
  cancelText,
  onOk,
  onCancel,
}) {
  return (
    <div className="overlay">
      <div className="modal">
        <p>{question}</p>
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
  question: PropTypes.string.isRequired,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
