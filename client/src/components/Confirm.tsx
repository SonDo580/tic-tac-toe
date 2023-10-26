import type { GameResult } from "@/utils/game";

type Props = {
  result: GameResult;
  question: string;
  okText: string;
  cancelText: string;
  onOk: () => void;
  onCancel: () => void;
};

export default function Confirm({
  result,
  question,
  okText = "Yes",
  cancelText = "No",
  onOk,
  onCancel,
}: Props) {
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
