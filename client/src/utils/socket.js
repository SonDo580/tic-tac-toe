import { io } from "socket.io-client";

const serverURL =
  process.env.NODE_ENV === "production"
    ? "https://tictactoe-server-jvx4.onrender.com"
    : "http://localhost:5000";

const socket = io(serverURL); // add live server URL later

export { socket };
