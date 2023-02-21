const socketIO = require("socket.io");
const Room = require("../models/Room");

module.exports = (server) => {
  const io = socketIO(server, {
    path: "/socket.io",
    // cors: {
    //   origin: process.env.CLIENT_URL,
    // },
    cors: "*",
  });

  io.on("connection", (socket) => {
    console.log("새로운 유저 접속:",socket.id);

    socket.on("disconnect", () => {
      console.log("유저 접속 해제:", socket.id);
    });

    socket.on("error", (err) => {
      console.error(err);
    });

    socket.on("joinRoom", async (data) => {
      const { title, userId, nickName, profileImage, roomId, myInfo } = data;
      const authorInfo = { id: userId, nickName, profileImage };
      const user = { authorInfo, myInfo };
      const currentRoom = await Room.findById(roomId);

      currentRoom.roomInfo.participants.push(user);
      await currentRoom.save();

      socket.join(roomId);
      socket.broadcast.emit("joinRoom", user, currentRoom);
    });

    socket.on("otherPlayerReadyStatus", (otherUserReadyData) => {
      socket.broadcast.emit("otherPlayerReadyStatus", otherUserReadyData);
    });

    socket.on("gameScore", (score) => {
      socket.broadcast.emit("gameScore", score);
    });

    socket.on("otherPlayerVideo", (video) => {
      socket.broadcast.emit("otherPlayerVideo", video);
    });
  });
};