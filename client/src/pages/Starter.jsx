import { Link } from "react-router-dom";
import useScreen from "@/hooks/useScreen";

export default function Starter() {
  const { isMobile } = useScreen();
  const gameTitle = `${!isMobile ? "Welcome to" : ""} Tic-Tac-Toe`;

  return (
    <div className="wrapper">
      <h1>{gameTitle}</h1>
      <Link to="create" className="button">
        Create room
      </Link>
      <span>OR</span>
      <Link to="join" className="button">
        Join a room
      </Link>
    </div>
  );
}
