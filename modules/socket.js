const socketIO = require("socket.io");
const User = require("../models/User");
const Room = require("../models/Room");

module.exports = (server) => {
  const io = socketIO(server, {
    path: "/socket.io",
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log("새로운 유저 접속:",socket.id);

    socket.on("disconnect", () => {
      console.log("유저 접속 해제:", socket.id);
    });

    socket.on("error", (err) => {
      console.error(err);
    });

    socket.on("joinRoom", (data) => {
      console.log("넘어왔나?", data)
      socket.broadcast.emit("joinRoom", data);
    });
  });
};