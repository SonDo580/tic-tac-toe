import { Link } from "react-router-dom";

export default function Starter() {
  return (
    <div className="starter">
      <h1>Welcome to Tic-Tac-Toe</h1>
      <Link to="create" className="button">
        Create room
      </Link>
      <Link to="join" className="button">
        Join a room
      </Link>
    </div>
  );
}
