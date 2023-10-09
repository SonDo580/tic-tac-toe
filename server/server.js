const express = require("express");
const http = require("node:http");

const runSocketIO = require("./socket");

const app = express();
const server = http.createServer(app);
runSocketIO(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
