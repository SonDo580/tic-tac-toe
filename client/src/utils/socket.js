import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // add live server URL later

export { socket };
