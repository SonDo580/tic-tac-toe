const express = require("express");
const http = require("node:http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// CORS Config
const allowedOrigins = ["http://localhost:5173"]; // add live url later
const corsOptions = {
  origin: allowedOrigins,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
