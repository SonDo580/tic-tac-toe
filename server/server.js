const express = require("express");
const http = require("node:http");
const cors = require("cors");

const runSocketIO = require("./socket");

const app = express();
const server = http.createServer(app);

// CORS Config
const allowedOrigins = ["http://localhost:5173"]; // add live url later
const corsOptions = {
  origin: allowedOrigins,
};
app.use(cors(corsOptions));

runSocketIO(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
