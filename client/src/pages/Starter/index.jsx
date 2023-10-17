import { Link } from "react-router-dom";

export default function Starter() {
  return (
    <div className="wrapper">
      <h1>Welcome to Tic-Tac-Toe</h1>
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
