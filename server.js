import { createServer } from "node:http";
import { Server } from "socket.io";

import socketListen from "./sockets.js";
import { apiServer } from "./api.js";

const PORT = 3000;

const httpServer = createServer(apiServer);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

httpServer.listen(PORT);
console.log(`Listening on port: ${PORT}`);

socketListen(io)