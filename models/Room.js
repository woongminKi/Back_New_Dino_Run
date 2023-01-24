const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    author: {
      id: {
        type: Number,
      },
      nickName: {
        type: String,
      },
    },
    roomInfo: {
      title: {
        type: String,
      },
      participants: [
        {
          id: {
            type: Number,
          },
          nickName: {
            type: String,
          },
          score: {
            type: Number,
          },
          profileImage: {
            type: String,
          },
        },
      ],
    },
  },
);

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
