import { Link } from "react-router-dom";

export default function Starter() {
  return (
    <div>
      <h1>Welcome to Tic-Tac-Toe</h1>
      <Link to="create">Create room</Link>
      <Link to="join">Join a room</Link>
    </div>
  );
}
