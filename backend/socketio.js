const http = require("http");
const socketIo = require("socket.io");

const CORS_ORIGIN = "http://localhost:5173";

function socketio(server) {
  const io = socketIo(server, {
    cors: {
      origin: CORS_ORIGIN,
    },
  });
  return io;
}

module.exports = socketio;
