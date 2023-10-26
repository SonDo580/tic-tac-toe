import PropTypes from "prop-types";

export default function Confirm({
  result,
  question,
  okText,
  cancelText,
  onOk,
  onCancel,
}) {
  const fullText = result ? `${result} ${question}` : question;

  return (
    <div className="overlay">
      <div className="modal">
        <p>{fullText}</p>
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
  result: PropTypes.string,
  question: PropTypes.string.isRequired,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
